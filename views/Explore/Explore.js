import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { COLOR_PALLETE } from '../../constants'

export default Explore = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Coming soon</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_PALLETE.white
    },
    text: {
        fontFamily: 'Bruno-Ace',
        fontSize: 20
    }
})
