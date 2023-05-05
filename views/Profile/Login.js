import { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { View, StyleSheet, Keyboard } from 'react-native'
import { loginUser } from '../../api/user'
import { accessTokenState, profileViewState } from '../../atoms/atom'
import { useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggingUser, setLoggingUser] = useState(false)
    const setAccessTokenState = useSetRecoilState(accessTokenState)
    const setProfileViewState = useSetRecoilState(profileViewState)

    const handleLoginUser = () => {
        Keyboard.dismiss()
        setLoggingUser(true)
        loginUser(email, password)
            .then((response) => {
                setAccessTokenState(response.data['access_token'])
                return response
            })
            .then((response) => {
                AsyncStorage.setItem('accessTokenState', response.data['access_token'])
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
                    disabled={loggingUser}
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
