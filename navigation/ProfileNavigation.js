import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { COLOR_PALLETE } from '../constants'
import Profile from '../views/Profile_n/Profile'
import Saved from '../views/Saved_n/Saved'

const Stack = createNativeStackNavigator()

export default ProfileNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen
                name="Saved"
                component={Saved}
                options={{
                    headerTitle: 'Saved Recipes',
                    headerTitleStyle: { fontFamily: 'Bruno-Ace' }
                }}
            />
        </Stack.Navigator>
    )
}
