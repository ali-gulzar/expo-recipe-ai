import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@react-native-material/core'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { userState } from '../../atoms/atom'
import { COLOR_PALLETE } from '../../constants'

export default User = () => {
    const [userStateValue, setUserState] = useRecoilState(userState)

    const handleLogout = () => {
        AsyncStorage.removeItem('userState')
        setUserState(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <Text style={styles.name}>{userStateValue['name']}</Text>
                <MaterialCommunityIcons
                    name="face-man-shimmer"
                    size={40}
                    color={COLOR_PALLETE.blue}
                />
            </View>
            <Button title="logout" style={styles.logoutButton} onPress={handleLogout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    },
    profileInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'Bruno-Ace',
        fontSize: 30
    },
    logoutButton: {
        backgroundColor: COLOR_PALLETE.green,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: '100%',
        marginBottom: 20
    }
})
