import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import GroupFeedScreen from '../screens/GroupFeedScreen';
import AddNewGroupScreen from '../screens/AddNewGroupScreen';
import AllGroupsScreen from '../screens/AllGroupsScreen';
import Globals from '../constants/Globals';

export default class GroupTab extends Component {
    render() {
        return <AppContainer />;
    }
}

const TabNavigator = createMaterialTopTabNavigator(
    {
        'Group\ Feed': GroupFeedScreen,
        'All\ Groups':AllGroupsScreen, 
        'New': AddNewGroupScreen
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

const AppContainer = createAppContainer(TabNavigator);
