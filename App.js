import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications} from 'expo';
import {registerForPushNotificationsAsync} from './src/lib/registerForPushNotificationsAsync';

import Globals from './src/constants/Globals';
import GroupTab from './src/containers/GroupTab';
import TaskTab from './src/containers/TaskTab';
import StatTab from './src/containers/StatTab';
import SettingTab from './src/containers/SettingTab';

export default class App extends Component {
    componentDidMount() {
        registerForPushNotificationsAsync()
        .then(response => {
            console.log(response);
        });

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

  _handleNotification = (notification) => {
    this.dropdown.alertWithType('info', notification.data.title, notification.data.body);
  };
    render() {
        return (
            <View style={styles.container}>
                <AppContainer />
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
        // FIXME: revert it back to 'Task' later
        initialRouteName: 'Group'
    }
);

const AppContainer = createAppContainer(TabNavigator);
