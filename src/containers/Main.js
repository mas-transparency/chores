import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import GroupTab from './GroupTab';
import TaskTab from './TaskTab';
import StatTab from './StatTab';
import SettingTab from './SettingTab';
import Globals from '../constants/Globals';


// Main App Navigator
export default createBottomTabNavigator(
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