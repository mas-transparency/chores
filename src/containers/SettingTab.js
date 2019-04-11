import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

import Globals from '../constants/Globals';

import SettingGroupScreen from '../screens/SettingGroupScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import AddNewGroupScreen from '../screens/AddNewGroupScreen';

export default (TabNavigator = createMaterialTopTabNavigator(
    {
        Setting: {
            screen: createStackNavigator({
                SettingGroupScreen: {
                    screen: SettingGroupScreen,
                    navigationOptions: {
                        header: null
                    }
                },
                AddNewGroupScreen: {
                    screen: AddNewGroupScreen,
                    navigationOptions: {
                        header: null
                    }
                },
                JoinGroupScreen: {
                    screen: JoinGroupScreen,
                    navigationOptions: {
                        header: null
                    }
                }
            }),
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Setting',
        tabBarOptions: {
            // activeTintColor: '#000',
            // inactiveTintColor: '#000',
            style: {
                // backgroundColor: '#fbfbfb',
                backgroundColor: Globals.COLOR.backgroundColor,
                color: Globals.COLOR.primaryColor
            },
            tabStyle: {
                height: 80,
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }
        }
    }
));
