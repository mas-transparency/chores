import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';
import { registerForPushNotificationsAsync } from './src/lib/registerForPushNotificationsAsync';
import firebase from 'firebase';

import Main from './Main';
import LoginScreen from './src/screens/LoginScreen';
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

const AppNavigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: Main
    },
    {
        initialRouteName: 'Login'
    }
);

firebase.initializeApp(config);
const AppContainer = createAppContainer(AppNavigator);