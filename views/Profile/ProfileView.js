import { Avatar, Text, Switch, Button } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Login from './Login.js'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '../../atoms/atom'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileView() {
    const [pushNotifications, setPushNotifications] = useState(false)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessTokenState')
        } catch (e) {
            console.error(e)
        }
        setAccessToken(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>
                PROFILE
            </Text>
            {accessToken ? (
                <>
                    <View style={styles.userInfo}>
                        <Text variant="headlineMedium">Muhammad Ali Gulzar</Text>
                        <Avatar.Icon icon="face-man-profile" size={42} />
                    </View>

                    <View style={styles.switch}>
                        <Text variant="bodyLarge">Dark Mode</Text>
                        <Switch
                            value={pushNotifications}
                            onValueChange={() => setPushNotifications(!pushNotifications)}
                        />
                    </View>
                    <Button mode="contained" onPress={handleLogout}>
                        Log out
                    </Button>
                </>
            ) : (
                <Login />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    header: {
        alignSelf: 'center'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    switch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30
    }
})
