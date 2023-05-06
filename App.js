import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, BottomNavigation, Portal } from 'react-native-paper'
import { RecoilRoot } from 'recoil'
import { useFonts } from 'expo-font'
import SearchView from './views/Search/SearchView.js'
import SavedView from './views/Saved/SavedView.js'
import ProfileView from './views/Profile/ProfileView.js'

const renderScene = BottomNavigation.SceneMap({
    search: () => (
        <Portal.Host>
            <SearchView />
        </Portal.Host>
    ),
    saved: SavedView,
    profile: ProfileView
})

export default function App() {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        {
            key: 'search',
            title: 'Search',
            focusedIcon: 'clipboard-search',
            unfocusedIcon: 'clipboard-search-outline'
        },
        {
            key: 'saved',
            title: 'Saved',
            focusedIcon: 'content-save-all',
            unfocusedIcon: 'content-save-all-outline'
        },
        {
            key: 'profile',
            title: 'Profile',
            focusedIcon: 'face-man-shimmer',
            unfocusedIcon: 'face-man-shimmer-outline'
        }
    ])
    const [fontsLoaded] = useFonts({
        'Bruno-Ace': require('./assets/fonts/BrunoAce.ttf'),
        'Red-Hat': require('./assets/fonts/RedHat.ttf')
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <RecoilRoot>
            <PaperProvider>
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
                <StatusBar style="dark" />
            </PaperProvider>
        </RecoilRoot>
    )
}
