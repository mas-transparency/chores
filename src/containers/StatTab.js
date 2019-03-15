import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import Globals from '../constants/Globals';

export default class StatTab extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

class HomeScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Stat-Group!</Text>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Stat-Me!</Text>
            </View>
        );
    }
}

const TabNavigator = createMaterialTopTabNavigator(
    {
        Group: HomeScreen,
        Me: SettingsScreen
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

const AppContainer = createAppContainer(TabNavigator);
