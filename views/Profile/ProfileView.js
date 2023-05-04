import { Text } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Login from './Login'
import Profile from './Profile'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../atoms/atom'

export default function ProfileView() {
    const accessToken = useRecoilValue(accessTokenState)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text variant="headlineMedium" style={styles.header}>
                    PROFILE
                </Text>
            </View>

            {accessToken ? <Profile /> : <Login />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    title: {
        marginBottom: 30
    },
    header: {
        alignSelf: 'center',
        fontFamily: 'Bruno-Ace'
    }
})
