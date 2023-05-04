import { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { loginUser } from '../../api/user'
import { accessTokenState } from '../../atoms/atom'
import { useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState('')
    const setAccessTokenState = useSetRecoilState(accessTokenState)

    const handleLoginUser = () => {
        loginUser(email, password)
            .then((response) => {
                setAccessTokenState(response.data['access_token'])
                return response
            })
            .then((response) =>
                AsyncStorage.setItem('accessTokenState', response.data['access_token'])
            )
            .catch((error) => console.error(error.response.data))
    }

    return (
        <View style={styles.container}>
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
            <Button mode="contained" onPress={handleLoginUser}>
                Log In
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 10
    }
})
