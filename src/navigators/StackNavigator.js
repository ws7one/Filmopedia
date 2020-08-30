import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Detail from '../components/Detail';
import { HOME, DETAIL, INFO } from './ScreenNames';
import Info from '../components/Info';

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
            <Stack.Screen
                name={INFO}
                component={Info}
                options={{ title: 'Credits' }}
            />
        </Stack.Navigator>
    );
}
