import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';
import { registerForPushNotificationsAsync } from './src/lib/registerForPushNotificationsAsync';
import firebase from 'firebase';

import LoginScreen from './src/screens/LoginScreen';
import Globals from './src/constants/Globals';
import GroupTab from './src/containers/GroupTab';
import TaskTab from './src/containers/TaskTab';
import StatTab from './src/containers/StatTab';
import SettingTab from './src/containers/SettingTab';

// getting all Tabs and display
const TabNavigator = createBottomTabNavigator(
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

const AppContainer = createAppContainer(TabNavigator);

export default class Main extends Component {
    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
            user: null
        };
    }
    componentDidMount() {

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO: set current user to logged in user here
                this.state.user = user;
                registerForPushNotificationsAsync(user).then(response => {
                    console.log(response);
                });
            }
        })
    }

    _handleNotification = notification => {
        this.dropdown.alertWithType(
            'info',
            notification.data.title,
            notification.data.body
        );
    };

    static router = TabNavigator.router;
    render() {
        console.log(firebase.auth().currentUser)
        return (
            <View style={styles.container}>
                <AppContainer  navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} />
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
