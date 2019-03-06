import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Divider } from "react-native-elements";

import MyChoresScreen from "./MyChoresScreen";
import AddNewChoreScreen from "./AddNewChoreScreen";

import MyHeader from "../components/MyHeader";
import Globals from "../constants/Globals";

// This Screen refers to the 'Tasks' screen
// it contains 'All Chores' , ' My Chores' and 'Add New'

export default class TaskScreen extends React.Component {
  render() {
    return <TopTabContainer />;
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    MyChores: {
      screen: MyChoresScreen
    },
    AddNew: {
      screen: AddNewChoreScreen
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: Globals.COLOR.backgroundColor
      },
      tabStyle: {
        height: 80,
        flexDirection: "column",
        justifyContent: "flex-end"
      }
    }
  },
  {
    backgroundColor: "#f0edf6"
  }
);

const TopTabContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1
  },
  choresContainer: {
    flex: 4
  },
  points: {
    flex: 1
  },
  chores: {
    flex: 3
    // backgroundColor: 'blue'
  },
  footerContainer: {
    flex: 1,
    maxHeight: 50
  },
  divider: {
    backgroundColor: Globals.COLOR.grey,
    height: 1
  }
});
