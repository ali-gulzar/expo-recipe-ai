import { View, Text, StyleSheet } from 'react-native'

export default function BrowseView() {
    return (
        <View style={styles.container}>
            <Text>Coming Soon!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
