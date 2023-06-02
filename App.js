import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import Toast from 'react-native-toast-message'
import { RecoilRoot } from 'recoil'

import Navigation from './navigation/Navigation'

export default function App() {
    const [fontsLoaded] = useFonts({
        'Bruno-Ace': require('./assets/fonts/BrunoAce.ttf'),
        'Red-Hat': require('./assets/fonts/RedHat.ttf')
    })
    if (!fontsLoaded) {
        return null
    }

    return (
        <RecoilRoot>
            <NavigationContainer>
                <Navigation />
                <StatusBar style="dark" />
                <Toast position="top" topOffset={60} />
            </NavigationContainer>
        </RecoilRoot>
    )
}
