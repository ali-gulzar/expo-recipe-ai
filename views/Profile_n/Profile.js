import * as React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { useRecoilValue } from 'recoil'

import { userState } from '../../atoms/atom'
import { COLOR_PALLETE } from '../../constants'
import Login from './Login'
import Signup from './Signup'
import User from './User'

export default Profile = ({ navigation }) => {
    const [view, setView] = React.useState('login')
    const userStateValue = useRecoilValue(userState)

    const showView = () => {
        if (userStateValue !== null) {
            return <User navigation={navigation} />
        } else if (view === 'login') {
            return <Login handleView={(view) => setView(view)} />
        } else if (view === 'signup') {
            return <Signup handleView={(view) => setView(view)} />
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {showView()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PALLETE.white
    },
    title: {
        fontFamily: 'Bruno-Ace',
        fontSize: 40,
        alignSelf: 'center'
    }
})
