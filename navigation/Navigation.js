import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { getSavedRecipes } from '../api/user'
import { savedRecipesState, userState } from '../atoms/atom'
import { COLOR_PALLETE } from '../constants'
import Explore from '../views/Explore/Explore'
import Search from '../views/Search_n/Search'
import ProfileNavigation from './ProfileNavigation'

const Tab = createBottomTabNavigator()

export default Navigation = () => {
    const userStateValue = useRecoilValue(userState)
    const setSavedRecipesState = useSetRecoilState(savedRecipesState)

    React.useEffect(() => {
        if (userStateValue) {
            getSavedRecipes(userStateValue['access_token'])
                .then((response) => {
                    setSavedRecipesState(response.data)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    }, [])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'Search') {
                        iconName = focused ? 'text-box-search' : 'text-box-search-outline'
                        return <MaterialCommunityIcons name={iconName} color={color} size={size} />
                    } else if (route.name === 'Profile ') {
                        iconName = focused ? 'persons' : 'person'
                        return <Fontisto name={iconName} color={color} size={size} />
                    } else if (route.name === 'Explore') {
                        return <MaterialCommunityIcons name="forest" color={color} size={size} />
                    }
                },
                tabBarActiveTintColor: COLOR_PALLETE.green,
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="Profile " component={ProfileNavigation} />
        </Tab.Navigator>
    )
}
