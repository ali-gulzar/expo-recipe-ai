import { View, StyleSheet } from 'react-native'
import { Text, Avatar, Switch, Button } from 'react-native-paper'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { userState } from '../../atoms/atom'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

export default function Profile() {
    const [publicProfile, setPublicProfile] = useState(false)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [user, setUser] = useRecoilState(userState)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userState')
        } catch (e) {
            console.error(e)
        }
        setUser(null)
    }

    return (
        <>
            {/** User name */}
            <View style={styles.userInfo}>
                <Text style={styles.name} variant="headlineMedium">
                    {user['name']}
                </Text>
                <Avatar.Icon icon="face-man-profile" size={42} />
            </View>

            {/** Settings */}
            <View style={styles.settings}>
                <View style={styles.settingContainer}>
                    <View style={styles.setting}>
                        <MaterialIcons name="lock" size={24} color="black" />
                        <Text style={styles.settingText} variant="bodyLarge">
                            Public Profile
                        </Text>
                    </View>
                    <Switch
                        value={publicProfile}
                        onValueChange={() => setPublicProfile(!publicProfile)}
                    />
                </View>
                <View style={styles.settingContainer}>
                    <View style={styles.setting}>
                        <Ionicons name="ios-notifications-sharp" size={24} color="black" />
                        <Text style={styles.settingText} variant="bodyLarge">
                            Push Notifications
                        </Text>
                    </View>
                    <Switch
                        value={pushNotifications}
                        onValueChange={() => setPushNotifications(!pushNotifications)}
                    />
                </View>
            </View>

            {/** Log out */}
            <Button style={styles.logoutButton} mode="contained" onPress={handleLogout}>
                Log out
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    name: {
        fontFamily: 'Red-Hat'
    },
    settings: {
        display: 'flex',
        height: 75,
        justifyContent: 'space-between',
        marginBottom: 40
    },
    settingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    setting: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    logoutButton: {
        position: 'absolute',
        bottom: 30,
        width: '100%'
    }
})
