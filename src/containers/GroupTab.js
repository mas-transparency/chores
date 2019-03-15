import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import Globals from '../constants/Globals';

export default class GroupTab extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Globals.COLOR.backgroundColor,
        justifyContent: 'center'
    }
});

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
                <Text>Group-Home!</Text>
            </View>
        );
    }
}

const TabNavigator = createMaterialTopTabNavigator(
    {
        'Group\ Feed': HomeScreen,
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
