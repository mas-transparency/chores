import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
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
    },
    icon: {
        color: Globals.COLOR.grey
    }
});

// getting all Tabs and display
const TabNavigator = createBottomTabNavigator(
    {
        Group: {
            screen: GroupTab,
            navigationOptions: {
                tabBarIcon: () => <Icon type="font-awesome" name="users" iconStyle={styles.icon}/>
            }
        },
        Task: {
            screen: TaskTab,
            navigationOptions: {
                tabBarIcon: () => <Icon type="font-awesome" name="check" iconStyle={styles.icon}/>
            }
        },
        Stat: {
            screen: StatTab,
            navigationOptions: {
                tabBarIcon: () => <Icon type="font-awesome" name="columns" iconStyle={styles.icon}/>
            }
        },
        Setting: {
            screen: SettingTab,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon type="font-awesome" name="cog" iconStyle={styles.icon} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: Globals.COLOR.backgroundColor
            },
            activeTintColor: Globals.COLOR.primaryColor,
            inactiveTintColor: Globals.COLOR.secondaryColor
        },
        initialRouteName: 'Task'
    }
);

const AppContainer = createAppContainer(TabNavigator);
