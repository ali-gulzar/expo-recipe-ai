import { Feather, FontAwesome } from '@expo/vector-icons'
import { Button } from '@react-native-material/core'
import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { saveRecipe, unsaveRecipe } from '../api/user'
import { savedRecipesState } from '../atoms/atom'
import { COLOR_PALLETE } from '../constants'

export default function RecipeCard({ recipe, accessToken, showToast, userId }) {
    const recipeId = recipe.uri.split('#recipe_')[1]

    const [savedRecipesStateValue, setSavedRecipesState] = useRecoilState(savedRecipesState)
    const [saved, setSaved] = React.useState(
        savedRecipesStateValue.map((recipe) => recipe['recipe_id']).includes(recipeId)
    )
    const [updating, setUpdating] = React.useState(false)

    const handleUpdate = (isSaved) => {
        setUpdating(true)

        if (!accessToken) {
            showToast(
                'error',
                'Authentication required!',
                'Please login to your account to save/remove recipes!'
            )
            setUpdating(false)
        } else {
            if (isSaved === true) {
                unsaveRecipe(recipeId, accessToken)
                    .then((response) => {
                        if (response.data) {
                            setSaved(false)
                            setUpdating(false)
                            showToast(
                                'success',
                                'Congratulations',
                                'You successfully removed recipe from your collection!'
                            )
                            setSavedRecipesState(
                                savedRecipesStateValue.filter((recipe) => {
                                    if (recipe['recipe_id'] === recipeId) {
                                        return false
                                    }
                                    return true
                                })
                            )
                        } else {
                            setUpdating(false)
                            showToast(
                                'error',
                                'Failed',
                                'Failed to remove recipe. Please try again later.'
                            )
                        }
                    })
                    .catch((e) => {
                        console.error(e)
                        setUpdating(false)
                        showToast(
                            'error',
                            'Failed',
                            'Failed to remove recipe. Please try again later.'
                        )
                    })
            } else {
                saveRecipe(recipeId, accessToken)
                    .then((response) => {
                        if (response.data) {
                            setSaved(true)
                            setUpdating(false)
                            showToast(
                                'success',
                                'Congratulations',
                                'You successfully saved recipe in your collection!'
                            )
                            setSavedRecipesState([
                                ...savedRecipesStateValue,
                                { user_id: userId, recipe_id: recipeId }
                            ])
                        } else {
                            setUpdating(false)
                            showToast(
                                'error',
                                'Failed',
                                'Failed to save recipe. Please try again later.'
                            )
                        }
                    })
                    .catch((e) => {
                        console.error(e)
                        setUpdating(false)
                        showToast(
                            'error',
                            'Failed',
                            'Failed to save recipe. Please try again later.'
                        )
                    })
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.label}>{recipe.label}</Text>
            <Text style={styles.ingredients}>{recipe.ingredientLines.join('\n')}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    trailing={<FontAwesome name="save" size={20} color={COLOR_PALLETE.white} />}
                    style={styles.button}
                    title={saved ? 'Remove' : 'Save'}
                    disabled={updating}
                    loadingIndicator={<ActivityIndicator color={COLOR_PALLETE.white} />}
                    loading={updating}
                    loadingIndicatorPosition="overlay"
                    onPress={() => handleUpdate(saved)}
                />
                <Button
                    trailing={<Feather name="link" size={20} color={COLOR_PALLETE.green} />}
                    variant="outlined"
                    color={COLOR_PALLETE.green}
                    title="Open"
                    onPress={() => WebBrowser.openBrowserAsync(recipe.url)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#D4FADC',
        gap: 15,
        marginBottom: 10,
        zIndex: 0
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    label: {
        marginLeft: 10,
        fontFamily: 'Bruno-Ace'
    },
    ingredients: {
        marginLeft: 10
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginBottom: 10,
        marginRight: 10
    },
    button: {
        backgroundColor: COLOR_PALLETE.green
    }
})
