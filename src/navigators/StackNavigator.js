import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Detail from '../components/Detail';
import { HOME, DETAIL } from './ScreenNames';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={HOME}
                component={Home}
                options={{ title: 'Filmopedia' }}
            />
            <Stack.Screen
                name={DETAIL}
                component={Detail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
