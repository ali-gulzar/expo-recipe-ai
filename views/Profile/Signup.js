import { useState } from 'react'
import { TextInput, Button, Text, Snackbar } from 'react-native-paper'
import { View, StyleSheet, Keyboard } from 'react-native'
import { profileViewState } from '../../atoms/atom'
import { useSetRecoilState } from 'recoil'
import { signupUser } from '../../api/user'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const setProfileViewState = useSetRecoilState(profileViewState)

    const handleSignup = () => {
        Keyboard.dismiss()
        setCreatingUser(true)
        signupUser(email, password, name)
            .then((response) => {
                setCreatingUser(false)
                setProfileViewState('login')
            })
            .catch((error) => {
                const errorMessage = error.response.data['detail'].split('=')[1].trim()
                setErrorMessage(errorMessage)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
                setCreatingUser(false)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Create a free account to get access to AI camera</Text>
            <TextInput
                label="Full Name"
                value={name}
                onChangeText={(value) => setName(value)}
                style={styles.input}
                mode="outlined"
            />
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
                    disabled={creatingUser}
                    loading={creatingUser}
                    mode="contained"
                    onPress={handleSignup}
                >
                    Sign Up
                </Button>
                <Button disabled={creatingUser} onPress={() => setProfileViewState('login')}>
                    Login
                </Button>
            </View>
            <Snackbar visible={errorMessage ? true : false} elevation={5}>
                {errorMessage}
            </Snackbar>
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
