import { useState } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { FAB, Portal } from 'react-native-paper'

export default SearchView = () => {
    const [fabOpen, setFabOpen] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>RECIPES</Text>
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
    fab: {
        position: 'absolute',
        paddingBottom: 120
    }
})
