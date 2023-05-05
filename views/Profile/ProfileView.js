import { Text } from 'react-native-paper'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Login from './Login'
import Profile from './Profile'
import Signup from './Signup'
import { useRecoilValue } from 'recoil'
import { userState, profileViewState } from '../../atoms/atom'

export default function ProfileView() {
    const user = useRecoilValue(userState)
    const profileView = useRecoilValue(profileViewState)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text variant="headlineMedium" style={styles.header}>
                    PROFILE
                </Text>
            </View>

            {user ? <Profile /> : profileView === 'login' ? <Login /> : <Signup />}
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
