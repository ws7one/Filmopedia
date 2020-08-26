import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
// import { HOME } from './ScreenNames';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HOME"
                component={Home}
            />
        </Stack.Navigator>
    );
}
