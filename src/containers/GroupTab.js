import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import GroupFeedScreen from '../screens/GroupFeedScreen';
import AllGroupsScreen from '../screens/AllGroupsScreen';
import Globals from '../constants/Globals';


export default TabNavigator = createMaterialTopTabNavigator(
    {
        'Group\ Feed': GroupFeedScreen,
        'All\ Groups':AllGroupsScreen,
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
        },
        initialRouteName: 'Group\ Feed'
    },
    {
        backgroundColor: '#f0edf6',
    }
);
