import { Avatar, Text, Switch } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import { useState } from 'react'

export default function ProfileView() {
    const [pushNotifications, setPushNotifications] = useState(true)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfo}>
                <Text variant="headlineMedium">Muhammad Ali Gulzar</Text>
                <Avatar.Icon icon="face-man-profile" size={42} />
            </View>

            <View style={styles.switch}>
                <Text variant="bodyLarge">Enable Push Notifications</Text>
                <Switch
                    value={pushNotifications}
                    onValueChange={() => setPushNotifications(!pushNotifications)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
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
        paddingBottom: 10
    }
})
