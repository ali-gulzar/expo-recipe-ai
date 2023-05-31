import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, ListItem } from '@react-native-material/core'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { userState } from '../../atoms/atom'
import { COLOR_PALLETE } from '../../constants'

export default User = ({ navigation }) => {
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
            <View style={styles.settings}>
                <ListItem
                    title="Saved Recipes"
                    leading={<FontAwesome name="save" size={24} color={COLOR_PALLETE.blue} />}
                    trailing={<MaterialCommunityIcons name="chevron-right" size={24} />}
                    onPress={() => navigation.navigate('Saved')}
                />
            </View>
            <View style={styles.footer}>
                <Button title="logout" style={styles.logoutButton} onPress={handleLogout} />
                <Text style={styles.appVersion}>App Version: 1.0.0</Text>
            </View>
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
    settings: {
        marginTop: 20
    },
    savedButton: {
        display: 'flex',
        backgroundColor: 'pink',
        justifyContent: 'space-around'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: 20
    },
    logoutButton: {
        backgroundColor: COLOR_PALLETE.green,
        alignSelf: 'center',
        width: '100%',
        marginBottom: 5
    },
    appVersion: {
        alignSelf: 'center',
        fontFamily: 'Bruno-Ace'
    }
})
