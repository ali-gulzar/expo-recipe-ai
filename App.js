import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper'

const SearchRoute = () => <Text>Search</Text>

const BrowseRoute = () => <Text>Browse</Text>

const ProfileRoute = () => <Text>Profile</Text>

const renderScene = BottomNavigation.SceneMap({
  search: SearchRoute,
  browse: BrowseRoute,
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
    { key: 'browse', title: 'Browse', focusedIcon: 'archive', unfocusedIcon: 'archive-outline' },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'face-man-shimmer',
      unfocusedIcon: 'face-man-shimmer-outline'
    }
  ])
  return (
    <PaperProvider>
      <View style={styles.container}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
