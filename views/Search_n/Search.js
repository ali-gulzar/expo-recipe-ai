import { Entypo, Foundation } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import AnimatedLottieView from 'lottie-react-native'
import * as React from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import Toast from 'react-native-toast-message'
import { useRecoilValue } from 'recoil'

import { fetchRecipes, inferIngredient, uploadImage } from '../../api/recipe'
import { userState } from '../../atoms/atom'
import RecipeCard from '../../components/RecipeCard'
import { COLOR_PALLETE } from '../../constants'

const actions = [
    {
        key: 'camera',
        text: 'Camera',
        icon: <Entypo name="camera" color={COLOR_PALLETE.white} size={17} />,
        color: COLOR_PALLETE.yellow,
        name: 'camera'
    },
    {
        key: 'gallery',
        text: 'Gallery',
        icon: <Foundation name="photo" color={COLOR_PALLETE.white} size={17} />,
        color: COLOR_PALLETE.yellow,
        name: 'gallery'
    }
]

export default Search = () => {
    const [message, setMessage] = React.useState('')
    const [recipes, setRecipes] = React.useState({
        loading: false,
        nextPage: null,
        data: []
    })
    const userStateValue = useRecoilValue(userState)
    const [status, requestPermission] = ImagePicker.useCameraPermissions()

    const showToast = (type, text1, text2) => {
        Toast.show({ type, text1, text2 })
    }

    const pickImage = async () => {
        if (userStateValue !== null) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            })

            if (!result.canceled) {
                handleImage(result.assets[0])
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Authentication required',
                text2: 'Please login to your account to access this feature.'
            })
        }
    }

    const takePhoto = async () => {
        if (userStateValue !== null) {
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
        } else {
            Toast.show({
                type: 'error',
                text1: 'Authentication required',
                text2: 'Please login to your account to access this feature.'
            })
        }
    }

    const handleImage = async (image) => {
        // remove current recipes and update message display
        setRecipes({ nextPage: null, data: [], loading: true })
        setMessage('Detecting provided image!')

        try {
            // upload image to s3
            const uploadImageResponse = await uploadImage(image, userStateValue['access_token'])
            const s3ImageUrl = uploadImageResponse.data

            setMessage('Uploading image to create an S3 URL!')

            // infer ingredient using s3 image url
            const inferIngredientResponse = await inferIngredient(
                s3ImageUrl,
                userStateValue['access_token']
            )
            const ingredient = inferIngredientResponse.data

            setMessage(`Detected ingredient is ${ingredient}.`)

            // get recipes with this ingredient
            const recipeResponse = await fetchRecipes(ingredient, userStateValue['access_token'])
            const recipes = recipeResponse.data

            setMessage('')
            setRecipes({ nextPage: recipes['next_page'], data: recipes['recipes'], loading: false })
        } catch (e) {
            console.error(e)
            setMessage('')
            setRecipes({ nextPage: null, data: [], loading: false })
        }
    }

    const displayView = () => {
        if (recipes.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingText}>{message}</Text>
                </View>
            )
        } else if (recipes.data.length > 0) {
            return (
                <View style={styles.list}>
                    <FlatList
                        data={recipes.data}
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
                <View style={styles.animationContainer}>
                    <AnimatedLottieView
                        autoPlay
                        loop
                        source={require('../../assets/animation/women_thinking.json')}
                        style={styles.animation}
                    />
                    <Text style={styles.searchText}>
                        Click on + button to start your AI recipe search!
                    </Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search</Text>
            {displayView()}
            <FloatingAction
                actions={actions}
                color={COLOR_PALLETE.green}
                showBackground={false}
                onPressItem={(name) => {
                    if (name === 'gallery') {
                        pickImage()
                    } else if (name === 'camera') {
                        takePhoto()
                    }
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PALLETE.white
    },
    title: {
        fontFamily: 'Bruno-Ace',
        fontSize: 40,
        alignSelf: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    loadingText: {
        marginTop: 20,
        alignSelf: 'center',
        fontFamily: 'Bruno-Ace'
    },
    list: {
        flex: 1,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    animationContainer: {
        flex: 1
    },
    animation: {
        position: 'relative'
    },
    searchText: {
        alignSelf: 'center'
    }
})
