import { atom } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getValuefromAsyncStorage = async (value) => {
    try {
        const response = await AsyncStorage.getItem(value)
        return response
    } catch (e) {
        console.error(e)
    }
}

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: getValuefromAsyncStorage('accessTokenState')
})

export const profileViewState = atom({
    key: 'profileViewState',
    default: 'login'
})
