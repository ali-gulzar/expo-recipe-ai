import AnimatedLottieView from 'lottie-react-native'
import * as React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useRecoilValue } from 'recoil'

import { getRecipe } from '../../api/recipe'
import { savedRecipesState, userState } from '../../atoms/atom'
import RecipeCard from '../../components/RecipeCard'
import { COLOR_PALLETE } from '../../constants'

export default Saved = () => {
    const [recipes, setRecipes] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const savedRecipesValue = useRecoilValue(savedRecipesState)
    const userStateValue = useRecoilValue(userState)

    const fetchRecipes = async () => {
        setLoading(true)
        if (userStateValue) {
            try {
                const recipeIds = savedRecipesValue.map((recipe) => recipe.recipe_id)

                const apiCalls = recipeIds.map((recipeId) =>
                    getRecipe(recipeId, userStateValue['access_token'])
                )
                const res = await Promise.all(apiCalls)
                const data = res.map((res) => res.data)
                setRecipes(data.flat())
                setLoading(false)
            } catch (e) {
                console.error(e)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchRecipes()
    }, [])

    const showToast = (type, text1, text2) => {
        Toast.show({ type, text1, text2 })
    }

    const handleView = () => {
        if (recipes.length > 0) {
            return (
                <View style={styles.list}>
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) => (
                            <RecipeCard
                                recipe={item}
                                accessToken={userStateValue['access_token']}
                                showToast={showToast}
                                userId={userStateValue['id']}
                            />
                        )}
                        keyExtractor={(item) => item.url}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.noRecipeContainer}>
                    <AnimatedLottieView
                        autoPlay
                        loop
                        source={require('../../assets/animation/no_recipes.json')}
                        style={styles.animation}
                    />
                    <Text style={styles.noRecipeText}>
                        {loading ? 'Loading recipes! Please wait' : 'No saved recipes here!'}
                    </Text>
                    {loading && <ActivityIndicator size={24} color={COLOR_PALLETE.green} />}
                </View>
            )
        }
    }

    return <View style={styles.container}>{handleView()}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PALLETE.white
    },
    noRecipeContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    animation: {
        position: 'relative'
    },
    noRecipeText: {
        alignSelf: 'center'
    },
    list: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    }
})
