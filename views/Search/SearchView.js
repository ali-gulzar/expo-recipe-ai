import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native'
import { FAB, Portal, ActivityIndicator } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage, inferIngredient, fetchRecipes } from '../../api/recipe'
import RecipeCard from '../../components/RecipeCard'
import { getAnimation } from '../../api/animation'
import { ANIMATIONS } from '../../constants'

export default SearchView = () => {
    const [fabOpen, setFabOpen] = useState(false)
    const [recipes, setRecipes] = useState({
        ingredient: null,
        recipes: [
            {
                label: 'Chicken Biryani Recipe and Nutritional Information',
                source: 'Food52',
                image: 'https://edamam-product-images.s3.amazonaws.com/web-img/6bf/6bf81e81a9d2e911dcac54783956baf5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDtjzYu7mfoDJuBk%2FtLPrjzKarzCK4BZQ2isPEzbB7ohwIgGHmKw7GIlHV7QKoUAXWkN69l41y0vb4h8uItDfPFKAUqwgUI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDH6mOMUymOtgx2sASiqWBWkFBMKAYNmwjraciuZIVBLutbalZqggPllU4xGDhRbeu8TcBAuZE1Wr72ZBNVizL6QsWOFcFFtmEBqwPe5ibphWQHH9VmcjVw85bex1uf3lSqSAsyRUsLT3fDKPP7Pr4GnXgjVMk3s%2BJpsUn%2FBM%2FuD4K2kWXBTtQhxy%2FPw%2F1mStYgX1mbcAbtJmhO445hMobalf%2FOeQigWynfjZYW2tr%2BHfUtFbkQShpAyK3fw2LSLJafmGCpf%2BKrMG5%2B1RczFizYeUBfJD2ciI78RuSy3IrWgHkOVcE63EhkHNNr2ToDTe0q9GW%2FS%2F3%2B0FgdyRlTqVehyeXaAIwXAiB2uuvTZ%2Fb1xXYGqGJTH%2F9wK0gBaAzBFAQTWEpRdGcMHt7CJwY8afbcxQX8dKYZFb9r9GBTekzpL8CIDuZGPDus1Xp5zV7W2y3YHGg8T7Unp%2FycOgfss6fNHeHwlFFUjJSbqXn5Ok%2FmRNjyVTHJU8%2BSBMxuxRvr6OwNkN4lIXJIvVDVjcpk6X%2FHNBAiVInprwp7A%2BFxD8668gYQJ2XcN8Rrjt3BJ31IeQrKXN7kiBOxg3GZFdspg%2FTH5EithJfEvsaUyxPUAIvf48m4sJ9n0Qmyp8Lt5hGVqdInMH42rTik8jU9y78V35ZvK90sncTGUojcThnOQpCFknQc3VqnlmXrEaVLGNgAe6uugANFNUvZlvlkVN%2BhIe84yUWM8XCekTQGZD1U1ZsY4hZe%2FGhhB91ahUOE0fbnmWedP46MHR4tvBANP%2BtFC3FWOJzpOJJrugZ%2B1Hyp6U507cFXOejP3WWeWLSRf5O8MGuttgO8KrLqH4vc79GAjSXVzxPLBH%2B%2FaeMeed8Z17ivKI06GZWW%2BSF%2FWW%2BrW8USyK1F2Yw10MMPPQy6IGOrEBvbnYMKGwErcco%2BIoSrhpiXYxbGIDhqDDdzF6XVIK6vjo4ihyiPoviB0e8UIMxe%2BCg2biQOtQh03xUrmmvaNhfSYwoMv25zxVTbm%2FVfLemYproTMrmE3dR3aG3iUb7ZVyDE%2B134ry6BdWtFafJALe0Dspox8nUQOHVl%2BAuL%2FFOqA1QCmhE%2FJ7ZYylcrI7KJyr%2BIHjrTqSfWa2bmcSpy1JNCzSYMEPyHcr3pE8OgKRt9t1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230503T233753Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFGO74TALR%2F20230503%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c252422a40941c93e1b71c0d9a8d45cadcbf4a7b01536c819261d52f6b5c6c61',
                ingredientLines: [
                    '2.5 pounds chicken',
                    '1.5 pounds White boiled rice',
                    '1 cup water',
                    '1 cup cooking oil',
                    '1 teaspoon garlic and ginger paste',
                    '1/2 teaspoon salt',
                    '2 teaspoons Red pepper',
                    '4 teaspoons Biryani masala',
                    '2 bay leafs',
                    '2 chopped red onions'
                ],
                ingredients: [
                    {
                        text: '2.5 pounds chicken',
                        quantity: 2.5,
                        measure: 'pound',
                        food: 'chicken',
                        weight: 1133.980925,
                        image: 'https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg'
                    },
                    {
                        text: '1.5 pounds White boiled rice',
                        quantity: 1.5,
                        measure: 'pound',
                        food: 'boiled rice',
                        weight: 680.388555,
                        image: 'https://www.edamam.com/food-img/43e/43e669c6de11504972da1ae1898ac19e.jpg'
                    },
                    {
                        text: '1 cup water',
                        quantity: 1,
                        measure: 'cup',
                        food: 'water',
                        weight: 237,
                        image: 'https://www.edamam.com/food-img/5dd/5dd9d1361847b2ca53c4b19a8f92627e.jpg'
                    },
                    {
                        text: '1 cup cooking oil',
                        quantity: 1,
                        measure: 'cup',
                        food: 'cooking oil',
                        weight: 218,
                        image: 'https://www.edamam.com/food-img/07e/07e106ab3536d57428e5c46d009038f8.jpg'
                    },
                    {
                        text: '1 teaspoon garlic and ginger paste',
                        quantity: 1,
                        measure: 'teaspoon',
                        food: 'garlic',
                        weight: 2.8,
                        image: 'https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg'
                    },
                    {
                        text: '1 teaspoon garlic and ginger paste',
                        quantity: 1,
                        measure: 'teaspoon',
                        food: 'ginger',
                        weight: 2,
                        image: 'https://www.edamam.com/food-img/b9c/b9c06ef451ef29513880af0a53ebbaa6.jpg'
                    },
                    {
                        text: '1/2 teaspoon salt',
                        quantity: 0.5,
                        measure: 'teaspoon',
                        food: 'salt',
                        weight: 3,
                        image: 'https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg'
                    },
                    {
                        text: '2 teaspoons Red pepper',
                        quantity: 2,
                        measure: 'teaspoon',
                        food: 'Red pepper',
                        weight: 6.208333333648226,
                        image: 'https://www.edamam.com/food-img/4dc/4dc48b1a506d334b4ab6671b9d56a18f.jpeg'
                    },
                    {
                        text: '4 teaspoons Biryani masala',
                        quantity: 4,
                        measure: 'teaspoon',
                        food: 'masala',
                        weight: 7.6,
                        image: 'https://www.edamam.com/food-img/c3f/c3f96d47d334b92f0120ff0b3a512ec3.jpg'
                    },
                    {
                        text: '2 bay leafs',
                        quantity: 2,
                        measure: '<unit>',
                        food: 'bay leafs',
                        weight: 1.2,
                        image: 'https://www.edamam.com/food-img/0f9/0f9f5f95df173e9ffaaff2977bef88f3.jpg'
                    },
                    {
                        text: '2 chopped red onions',
                        quantity: 2,
                        measure: '<unit>',
                        food: 'red onions',
                        weight: 250,
                        image: 'https://www.edamam.com/food-img/205/205e6bf2399b85d34741892ef91cc603.jpg'
                    }
                ],
                calories: 5381.1246935834315,
                cuisineType: ['indian'],
                url: 'https://food52.com/recipes/67857-chicken-biryani-recipe-and-nutritional-information',
                totalTime: 90,
                uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_9f7601d8128273e4612af5accde1ddac'
            }
        ]
    })
    const [searching, setSearching] = useState({ searching: false, searchMessage: null })
    const [status, requestPermission] = ImagePicker.useCameraPermissions()

    const [animation, setAnimation] = useState({})

    useEffect(() => {
        getAnimation(ANIMATIONS.women_thinking)
            .then((response) => setAnimation(response.data))
            .catch((e) => console.error(e.response.data))
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

    const StartSearching = () => (
        <View>
            {Object.keys(animation).length > 0 && (
                <LottieView autoPlay loop={true} source={animation} style={styles.animation} />
            )}
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
