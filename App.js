import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper'
import SearchView from './views/Search/SearchView.js'
import BrowseView from './views/Browse/BrowseView.js'

const ProfileRoute = () => <Text>Profile</Text>

const renderScene = BottomNavigation.SceneMap({
    search: SearchView,
    browse: BrowseView,
    profile: ProfileRoute
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
            key: 'browse',
            title: 'Browse',
            focusedIcon: 'archive',
            unfocusedIcon: 'archive-outline'
        },
        {
            key: 'profile',
            title: 'Profile',
            focusedIcon: 'face-man-shimmer',
            unfocusedIcon: 'face-man-shimmer-outline'
        }
    ])
    return (
        <PaperProvider>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
            <StatusBar style="dark" />
        </PaperProvider>
    )
}
