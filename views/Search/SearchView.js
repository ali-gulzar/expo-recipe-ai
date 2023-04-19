import { useState } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { FAB, Portal } from 'react-native-paper'
import LottieView from 'lottie-react-native'

export default SearchView = () => {
    const [fabOpen, setFabOpen] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>RECIPES</Text>
            <LottieView
                autoPlay
                source={require('../../assets/animations/thinking_food.json')}
                style={styles.animation}
            />
            <Text style={styles.searchText}>Click on + icon to start searching for recipes.</Text>
            <Portal>
                <FAB.Group
                    style={styles.fab}
                    visible
                    open={fabOpen}
                    onStateChange={() => setFabOpen(!fabOpen)}
                    icon="plus"
                    actions={[
                        {
                            icon: 'camera',
                            label: 'Camera'
                        },
                        {
                            icon: 'camera-burst',
                            label: 'Gallery'
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
    fab: {
        position: 'absolute',
        paddingBottom: 120
    }
})
