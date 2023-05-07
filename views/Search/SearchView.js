import * as ImagePicker from 'expo-image-picker'
import LottieView from 'lottie-react-native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, FAB, Portal, Snackbar } from 'react-native-paper'
import { useRecoilValue } from 'recoil'

import { fetchRecipes, inferIngredient, uploadImage } from '../../api/recipe'
import { userState } from '../../atoms/atom'
import RecipeCard from '../../components/RecipeCard'

export default SearchView = () => {
    const [fabOpen, setFabOpen] = useState(false)
    const [recipes, setRecipes] = useState({
        ingredient: null,
        recipes: []
    })
    const [searching, setSearching] = useState({ searching: false, searchMessage: null })
    const [status, requestPermission] = ImagePicker.useCameraPermissions()
    const [message, setMessage] = useState('')
    const user = useRecoilValue(userState)

    const lottieRef = useRef(null)
    useEffect(() => {
        lottieRef.current?.reset()
        setTimeout(() => {
            lottieRef.current?.play()
        }, 0)
    }, [])

    const fetchResults = async (image) => {
        // remove current recipes
        setRecipes({ recipes: [], ingredient: null })

        setSearching({
            searching: true,
            searchMessage: 'Detecting provided image!'
        })

        try {
            // upload image to s3
            const uploadImageResponse = await uploadImage(image, user['access_token'])
            const s3ImageUrl = uploadImageResponse.data

            setSearching({ searching: true, searchMessage: 'Valid image provided!' })

            // infer ingredient using s3 image url
            const inferIngredientResponse = await inferIngredient(s3ImageUrl, user['access_token'])
            const ingredient = inferIngredientResponse.data

            setSearching({
                searching: true,
                searchMessage: `Detected main ingredient is ${ingredient}. Fetching recipes!`
            })

            // get recipes with this ingredient
            const recipeResponse = await fetchRecipes(ingredient, user['access_token'])
            const recipes = recipeResponse.data

            setRecipes({
                recipes: recipes['recipes'],
                ingredient
            })
        } catch (e) {
            console.error(e.response.data)
        }

        setSearching({
            searching: false,
            searchMessage: null
        })
    }

    const pickImage = async () => {
        if (!user) {
            setMessage('Please login to your account to access this feature.')
            setTimeout(() => setMessage(''), 3000)
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            })

            if (!result.canceled) {
                fetchResults(result.assets[0])
            }
        }
    }

    const takePhoto = async () => {
        if (!user) {
            setMessage('Please login to your account to access this feature.')
            setTimeout(() => setMessage(''), 3000)
        } else {
            if (status.granted) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: 'Images'
                })

                if (!result.canceled) {
                    fetchResults(result.assets[0])
                }
            } else {
                requestPermission()
            }
        }
    }

    const StartSearching = () => (
        <View>
            <LottieView
                ref={lottieRef}
                source={require('../../assets/animation/women_thinking.json')}
                style={styles.animation}
            />
            <Text style={styles.searchText}>Click on + icon to start searching for recipes.</Text>
        </View>
    )

    const SearchingRecipes = () => (
        <View style={styles.searchingContainer}>
            <ActivityIndicator animating size="large" color="red" style={styles.loader} />
            <Text style={styles.searchText}>{searching.searchMessage}</Text>
        </View>
    )

    const RecipeList = () => (
        <FlatList
            data={recipes.recipes}
            renderItem={({ item }) => (
                <RecipeCard recipe={item} accessToken={user['access_token']} />
            )}
            keyExtractor={(item) => item.url}
            showsVerticalScrollIndicator={false}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>RECIPES</Text>
            {recipes.recipes.length > 0 && user !== null ? (
                <RecipeList />
            ) : searching.searching ? (
                <SearchingRecipes />
            ) : (
                <StartSearching />
            )}
            <Portal>
                <FAB.Group
                    style={styles.fab}
                    open={fabOpen}
                    onStateChange={() => setFabOpen(!fabOpen)}
                    icon={fabOpen ? 'close' : 'plus'}
                    actions={[
                        {
                            icon: 'camera',
                            label: 'Camera',
                            onPress: takePhoto
                        },
                        {
                            icon: 'camera-burst',
                            label: 'Gallery',
                            onPress: pickImage
                        }
                    ]}
                />
            </Portal>
            <Snackbar wrapperStyle={{ top: 60 }} visible={message} elevation={5}>
                {message}
            </Snackbar>
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
        alignSelf: 'center',
        fontSize: 50,
        fontFamily: 'Bruno-Ace'
    },
    animation: {
        position: 'relative'
    },
    searchText: {
        alignSelf: 'center'
    },
    searchingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    loader: {
        marginBottom: 20
    },
    ingredientText: {
        alignSelf: 'center',
        fontSize: 25,
        textTransform: 'uppercase'
    }
})
