import { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
            <TextInput label="Email" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        
    }
})