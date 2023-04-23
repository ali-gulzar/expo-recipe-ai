import { useState, useEffect, useRef } from 'react'
import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native'
import { FAB, Portal, ActivityIndicator } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage, inferIngredient, fetchRecipes } from '../../api/recipe'
import RecipeCard from '../../components/RecipeCard'
import { getAnimation } from '../../api/animation'

export default SearchView = () => {
    const [fabOpen, setFabOpen] = useState(false)
    const [recipes, setRecipes] = useState({
        ingredient: null,
        recipes: []
    })
    const [searching, setSearching] = useState({ searching: false, searchMessage: null })
    const [status, requestPermission] = ImagePicker.useCameraPermissions()

    const [animation, setAnimation] = useState({})

    useEffect(() => {
        getAnimation('women_thinking').then((response) => setAnimation(response.data))
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
            const uploadImageResponse = await uploadImage(image)
            const s3ImageUrl = uploadImageResponse.data

            setSearching({ searching: true, searchMessage: 'Valid image provided!' })

            // infer ingredient using s3 image url
            const inferIngredientResponse = await inferIngredient(s3ImageUrl)
            const ingredient = inferIngredientResponse.data

            setSearching({
                searching: true,
                searchMessage: `Detected main ingredient is ${ingredient}. Fetching recipes!`
            })

            // get recipes with this ingredient
            const recipeResponse = await fetchRecipes(ingredient)
            const recipes = recipeResponse.data

            setRecipes({
                recipes: recipes['recipes'],
                ingredient
            })
        } catch (e) {
            console.error(e)
        }

        setSearching({
            searching: false,
            searchMessage: null
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All
        })

        if (!result.canceled) {
            fetchResults(result.assets[0])
        }
    }

    const takePhoto = async () => {
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

    const lottieRef = useRef(null)

    useEffect(() => {
        if (lottieRef.current) {
            setTimeout(() => {
                lottieRef.current?.reset()
                lottieRef.current?.play()
            }, 100)
        }
    }, [lottieRef.current])

    const StartSearching = () => (
        <>
            {Object.keys(animation).length > 0 && (
                <LottieView
                    ref={lottieRef}
                    loop={true}
                    speed={1}
                    source={animation}
                    style={styles.animation}
                />
            )}
            <Text style={styles.searchText}>Click on + icon to start searching for recipes.</Text>
        </>
    )

    const SearchingRecipes = () => (
        <View style={styles.searchingContainer}>
            <ActivityIndicator animating size="large" color="red" style={styles.loader} />
            <Text style={styles.searchText}>{searching.searchMessage}</Text>
        </View>
    )

    const RecipeList = () => (
        <View style={styles.recipeListContainer}>
            <FlatList
                data={recipes.recipes}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item) => item.url}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>RECIPES</Text>
            {recipes.recipes.length > 0 ? (
                <RecipeList />
            ) : searching.searching ? (
                <SearchingRecipes />
            ) : (
                <StartSearching />
            )}
            <Portal>
                <FAB.Group
                    style={styles.fab}
                    visible
                    open={fabOpen}
                    onStateChange={() => setFabOpen(!fabOpen)}
                    icon="plus"
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    },
    animation: {
        position: 'relative'
    },
    searchText: {
        alignSelf: 'center'
    },
    fab: {
        position: 'absolute',
        paddingBottom: 120
    },
    searchingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    loader: {
        marginBottom: 20
    },
    recipeListContainer: {
        marginLeft: 5,
        marginRight: 5
    },
    ingredientText: {
        alignSelf: 'center',
        fontSize: 25,
        textTransform: 'uppercase'
    }
})
