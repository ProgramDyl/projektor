import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import FavouritesScreen from '../screens/FavouritesScreen'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator>
            
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home Screen'}}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ title: 'Search Screen '}}
                />
                <Stack.Screen
                    name="Favourites"
                    component={FavouritesScreen}
                    options={{ title: 'Favourites Screen '}}
                />
            </Stack.Navigator>
        
        </NavigationContainer>

    )
}

export default MainStackNavigator