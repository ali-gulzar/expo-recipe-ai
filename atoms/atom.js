import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'recoil'

const getValuefromAsyncStorage = async (value, parseJson) => {
    try {
        const response = await AsyncStorage.getItem(value)
        return parseJson ? JSON.parse(response) : response
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
