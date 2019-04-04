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
import Main from './src/containers/Main';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
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
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    icon: {
        color: Globals.COLOR.grey
    }
});


// App Navigator containing Login, Main, and SignUp
const AppNavigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: Main,
        SignUp: SignUpScreen
        // AddNewGroup: AddNewGroupScreen
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(AppNavigator);

firebase.initializeApp(config);
