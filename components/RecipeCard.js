import { Card, Button } from 'react-native-paper'
import { StyleSheet, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { saveRecipe, unsaveRecipe } from '../api/user'
import { savedRecipeIdsState, savedRecipesState } from '../atoms/atom'
import { useRecoilValue, useRecoilState } from 'recoil'

export default function RecipeCard({ recipe, accessToken }) {
    const recipeId = recipe.uri.split('#recipe_')[1]

    const [savedRecipes, setSavedRecipes] = useRecoilState(savedRecipesState)
    const savedRecipeIds = useRecoilValue(savedRecipeIdsState)

    const handleSave = (isSaved) => {
        if (isSaved) {
            unsaveRecipe(recipeId, accessToken)
                .then((response) => {
                    if (response.data === true) {
                        const updatedRecipes = savedRecipes.filter((recipe) => {
                            const id = recipe.uri.split('#recipe_')[1]
                            return id !== recipeId
                        })
                        setSavedRecipes(updatedRecipes)
                    }
                })
                .catch((error) => console.error(error.response.data))
        } else {
            saveRecipe(recipeId, accessToken)
                .then((response) => console.log(response.data))
                .catch((error) => console.error(error.response.data))
        }
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Title title={recipe.label} titleVariant="titleLarge" />
            <Card.Content>
                <Text>{recipe.ingredientLines.join('\n')}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => handleSave(savedRecipeIds.includes(recipeId))} icon="heart">
                    {savedRecipeIds.includes(recipeId) ? 'Remove' : 'Save'}
                </Button>
                <Button onPress={() => WebBrowser.openBrowserAsync(recipe.url)} icon="link">
                    Open
                </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
})
