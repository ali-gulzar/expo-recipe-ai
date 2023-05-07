import LottieView from 'lottie-react-native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getRecipe } from '../../api/recipe'
import { getSavedRecipes } from '../../api/user'
import { savedRecipesState, userState } from '../../atoms/atom'
import RecipeCard from '../../components/RecipeCard'

export default function SavedView() {
    const user = useRecoilValue(userState)
    const [searching, setSearching] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [savedRecipes, setSavedRecipes] = useRecoilState(savedRecipesState)

    const lottieRef = useRef(null)
    useEffect(() => {
        lottieRef.current?.reset()
        setTimeout(() => {
            lottieRef.current?.play()
        }, 100)
    }, [])

    const fetchRecipes = async (refreshControl) => {
        if (user) {
            if (refreshControl) {
                setRefreshing(true)
            } else {
                setSearching(true)
            }
            try {
                const response = await getSavedRecipes(user['access_token'])
                const recipeIds = response.data.map((recipe) => recipe.recipe_id)

                const apiCalls = recipeIds.map((recipeId) =>
                    getRecipe(recipeId, user['access_token'])
                )
                const res = await Promise.all(apiCalls)
                const data = res.map((res) => res.data)
                setSavedRecipes(data.flat())
                if (refreshControl) {
                    setRefreshing(false)
                } else {
                    setSearching(false)
                }
            } catch (e) {
                if (refreshControl) {
                    setRefreshing(false)
                } else {
                    setSearching(false)
                }
                console.error(e.response.data)
            }
        }
    }

    useEffect(() => {
        fetchRecipes(false)
    }, [])

    const SearchingForSavedRecipes = () => {
        return (
            <View style={styles.searchingContainer}>
                <Text style={styles.searchingText}>Searching for your saved Recipes!</Text>
                <ActivityIndicator animating={true} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} variant="headlineMedium">
                Saved Recipes
            </Text>
            {searching ? (
                <SearchingForSavedRecipes />
            ) : savedRecipes.length === 0 || user === null ? (
                <View style={styles.animationContainer}>
                    <LottieView
                        style={styles.animation}
                        source={require('../../assets/animation/no_recipes.json')}
                        ref={lottieRef}
                        speed={0.9}
                    />
                    <Text style={styles.animationText}>
                        {user
                            ? 'See your favourite saved recipes here'
                            : 'Create a free account to save awesome recipes!'}
                    </Text>
                    {user && <Button onPress={() => fetchRecipes(false)}>Refresh</Button>}
                </View>
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => fetchRecipes(true)}
                            refreshing={refreshing}
                        />
                    }
                    data={savedRecipes}
                    renderItem={({ item }) => (
                        <RecipeCard recipe={item} accessToken={user['access_token']} />
                    )}
                    keyExtractor={(item) => item.uri.split('#recipe_')[1]}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    title: {
        fontFamily: 'Bruno-Ace',
        alignSelf: 'center',
        marginBottom: 10
    },
    searchingContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchingText: {
        marginBottom: 20
    },
    animationContainer: {
        paddingTop: 50
    },
    animation: {
        position: 'relative'
    },
    animationText: {
        alignSelf: 'center',
        marginBottom: 5
    }
})
