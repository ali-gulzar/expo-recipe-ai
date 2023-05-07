import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom, selector } from 'recoil'

const getValuefromAsyncStorage = async (value, isJson) => {
    try {
        const response = await AsyncStorage.getItem(value)
        return isJson ? JSON.parse(response) : response
    } catch (e) {
        console.error(e)
    }
}

export const userState = atom({
    key: 'userState',
    default: getValuefromAsyncStorage('userState', true)
})

export const profileViewState = atom({
    key: 'profileViewState',
    default: 'login'
})

export const savedRecipesState = atom({
    key: 'savedRecipesState',
    default: []
})

export const savedRecipeIdsState = selector({
    key: 'savedRecipeIdsState',
    get: ({ get }) => {
        const recipes = get(savedRecipesState)
        return recipes.map((recipe) => recipe.uri.split('#recipe_')[1])
    }
})
