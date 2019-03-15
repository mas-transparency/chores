import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Header,
    Button,
    ThemeProvider,
    ButtonGroup
} from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Globals from './src/constants/Globals';
import GroupTab from './src/containers/GroupTab';
import TaskTab from './src/containers/TaskTab';
import StatTab from './src/containers/StatTab';
import SettingTab from './src/containers/SettingTab';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppContainer />
            </View>
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

// getting all Tabs and display
const TabNavigator = createBottomTabNavigator(
    {
        Group: GroupTab,
        Task: TaskTab,
        Stat: StatTab,
        Setting: SettingTab
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: Globals.COLOR.backgroundColor
            },
            activeTintColor: Globals.COLOR.primaryColor,
            inactiveTintColor: Globals.COLOR.secondaryColor
        }
    }
);

const AppContainer = createAppContainer(TabNavigator);
