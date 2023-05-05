import { atom } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
