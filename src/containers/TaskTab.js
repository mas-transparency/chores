import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';
import { Divider } from 'react-native-elements';

import MyChoresScreen from '../screens/MyChoresScreen';
import AddNewChoreScreen from '../screens/AddNewChoreScreen';

import MyHeader from '../components/MyHeader';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
// it contains 'All Chores' , ' My Chores' and 'Add New'

export default TabNavigator = createMaterialTopTabNavigator(
    {
        'My\ Chores': {
            screen: MyChoresScreen
        },
        'Add\ New': {
            screen: AddNewChoreScreen
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: Globals.COLOR.backgroundColor
            },
            tabStyle: {
                height: 80,
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }
        }
    },
    {
        backgroundColor: '#f0edf6'
    }
);
