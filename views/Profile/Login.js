import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useSetRecoilState } from 'recoil'

import { loginUser } from '../../api/user'
import { profileViewState, userState } from '../../atoms/atom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggingUser, setLoggingUser] = useState(false)
    const setProfileViewState = useSetRecoilState(profileViewState)
    const setUser = useSetRecoilState(userState)

    const handleLoginUser = () => {
        Keyboard.dismiss()
        setLoggingUser(true)
        loginUser(email, password)
            .then((response) => {
                setUser(response.data)
                AsyncStorage.setItem('userState', JSON.stringify(response.data))
                setLoggingUser(false)
            })
            .catch((error) => {
                console.error(error.response.data)
                setLoggingUser(false)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Login with your account to access recipes</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                style={styles.input}
                mode="outlined"
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <View style={styles.buttonsContainer}>
                <Button
                    disabled={loggingUser || email === '' || password === ''}
                    loading={loggingUser}
                    mode="contained"
                    onPress={handleLoginUser}
                >
                    Log In
                </Button>
                <Button disabled={loggingUser} onPress={() => setProfileViewState('signup')}>
                    Sign Up
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    subtitle: {
        alignSelf: 'center'
    },
    input: {
        marginBottom: 10
    },
    buttonsContainer: {
        marginTop: 20,
        gap: 20
    }
})
