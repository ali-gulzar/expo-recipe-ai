import { ActivityIndicator, Button, TextInput } from '@react-native-material/core'
import * as React from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'

import { signupUser } from '../../api/user'
import { COLOR_PALLETE } from '../../constants'

export default Signup = ({ handleShowToast, handleView }) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSignup = () => {
        if (name === '') {
            handleShowToast('error', 'Invalid Name!', 'Please provide a valid name.')
        } else if (email === '' || !email.includes('@')) {
            handleShowToast('error', 'Invalid Email!', 'Please provide a valid email address.')
        } else if (password === '') {
            handleShowToast('error', 'Invalid password', 'Please provide a valid password.')
        } else {
            setLoading(true)
            // handle login
            Keyboard.dismiss()

            signupUser(email, password, name)
                .then((response) => {
                    const data = response.data
                    setLoading(false)
                    handleView('login')
                    handleShowToast(
                        'success',
                        'Congratulation!',
                        `Your profile is created with email address ${data['email']}`
                    )
                })
                .catch((e) => {
                    console.error(e)
                    setLoading(false)
                    handleShowToast(
                        'error',
                        'Failed',
                        'For some reason it failed. Please try again later.'
                    )
                })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                variant="outlined"
                label="Name"
                value={name}
                onChangeText={(value) => setName(value)}
                color={COLOR_PALLETE.green}
            />
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
                    title="Signup"
                    style={styles.button}
                    disabled={loading}
                    loadingIndicator={<ActivityIndicator color="on-primary" />}
                    loading={loading}
                    loadingIndicatorPosition="overlay"
                    onPress={handleSignup}
                />
                <Button
                    variant="text"
                    title="Login"
                    color={COLOR_PALLETE.green}
                    disabled={loading}
                    onPress={() => handleView('login')}
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
