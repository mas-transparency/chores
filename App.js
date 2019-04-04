import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';
import { registerForPushNotificationsAsync } from './src/lib/registerForPushNotificationsAsync';
import firebase from 'firebase';

// import Main from './Main';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import GroupTab from './src/containers/GroupTab';
import TaskTab from './src/containers/TaskTab';
import StatTab from './src/containers/StatTab';
import SettingTab from './src/containers/SettingTab';
import AddNewGroupScreen from './src/screens/AddNewGroupScreen';
import Globals from './src/constants/Globals';
import config from './config';

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

const MainNavigator = createBottomTabNavigator(
    {
        Group: {
            screen: GroupTab,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon
                        type="font-awesome"
                        name="users"
                        iconStyle={styles.icon}
                    />
                )
            }
        },
        Task: {
            screen: TaskTab,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon
                        type="font-awesome"
                        name="check"
                        iconStyle={styles.icon}
                    />
                )
            }
        },
        Stat: {
            screen: StatTab,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon
                        type="font-awesome"
                        name="columns"
                        iconStyle={styles.icon}
                    />
                )
            }
        },
        Setting: {
            screen: SettingTab,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon
                        type="font-awesome"
                        name="cog"
                        iconStyle={styles.icon}
                    />
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
        // FIXME: revert it back to 'Task' later
        initialRouteName: 'Group'
    }
);

const AppNavigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: MainNavigator,
        SignUp: SignUpScreen
        // AddNewGroup: AddNewGroupScreen
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(AppNavigator);

firebase.initializeApp(config);
