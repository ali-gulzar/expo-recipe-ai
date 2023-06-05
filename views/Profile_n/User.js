import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, ListItem } from '@react-native-material/core'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useRecoilState } from 'recoil'

import { deleteUser } from '../../api/user'
import { userState } from '../../atoms/atom'
import { COLOR_PALLETE } from '../../constants'

export default User = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false)
    const [userStateValue, setUserState] = useRecoilState(userState)

    const handleLogout = () => {
        AsyncStorage.removeItem('userState')
        setUserState(null)
    }

    const handleDelete = () => {
        setLoading(true)
        // delete account
        deleteUser(userStateValue['access_token'])
            .then((response) => {
                if (response) {
                    AsyncStorage.removeItem('userState')
                    setUserState(null)
                    Toast.show({
                        type: 'success',
                        text1: 'Success!',
                        text2: 'Successfully deleted your account and data from our servers!'
                    })
                }
            })
            .catch((e) => {
                Toast.show({
                    type: 'error',
                    text1: 'Failed!',
                    text2: 'Failed to delete the user.'
                })
                console.log(e)
            })
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
                <Button
                    title="delete account"
                    style={styles.deleteButton}
                    onPress={handleDelete}
                    disabled={loading}
                    loading={loading}
                />
                <Button
                    title="logout"
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    disabled={loading}
                />
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
    deleteButton: {
        backgroundColor: COLOR_PALLETE.blue,
        alignSelf: 'center',
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
