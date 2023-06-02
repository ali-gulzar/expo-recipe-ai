import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, Button, TextInput } from '@react-native-material/core'
import * as React from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSetRecoilState } from 'recoil'

import { loginUser } from '../../api/user'
import { userState } from '../../atoms/atom'
import { COLOR_PALLETE } from '../../constants'

export default Login = ({ handleView }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const setUserState = useSetRecoilState(userState)

    const handleLogin = () => {
        if (email === '' || !email.includes('@')) {
            Toast.show({
                type: 'error',
                text1: 'Incorrect Email!',
                text2: 'Please provide a valid email address.'
            })
        } else if (password === '') {
            Toast.show({
                type: 'error',
                text1: 'Incorrect Password',
                text2: 'Please provide a valid password.'
            })
        } else {
            // handle login
            Keyboard.dismiss()
            setLoading(true)

            loginUser(email, password)
                .then((response) => {
                    // save token in async storage and user state
                    AsyncStorage.setItem('userState', JSON.stringify(response.data))
                    setUserState(response.data)

                    // update views
                    setLoading(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Congratulations!',
                        text2: 'You are now logged in!'
                    })
                })
                .catch((e) => {
                    console.error(e)
                    setLoading(false)
                    Toast.show({
                        type: 'error',
                        text1: 'Failure!',
                        text2: 'Incorrect email or password. Please try again!'
                    })
                })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                variant="outlined"
                label="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                color={COLOR_PALLETE.green}
                autoCapitalize="none"
            />
            <TextInput
                variant="outlined"
                label="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                color={COLOR_PALLETE.green}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    style={styles.button}
                    disabled={loading}
                    loadingIndicator={<ActivityIndicator color="on-primary" />}
                    loading={loading}
                    loadingIndicatorPosition="overlay"
                    onPress={handleLogin}
                />
                <Button
                    variant="text"
                    title="Signup"
                    color={COLOR_PALLETE.green}
                    disabled={loading}
                    onPress={() => handleView('signup')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        gap: 10
    },
    buttonContainer: {
        gap: 15,
        marginTop: 20
    },
    button: {
        backgroundColor: COLOR_PALLETE.green
    }
})
