import { FAB } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

export default function Initial() {
    return (
        <View style={styles.container}>
            <FAB icon="camera" style={styles.fab} onPress={() => console.log('fab')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})
