import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Globals from "../constants/Globals";

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let chore = () => (
      <View style={styles.choresContainer}>
        <Text>{this.props.user.chores}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text>{this.props.user.name}</Text>
        </View>
        
        <View style={styles.choresContainer}>
          <Text>{this.props.user.chores}</Text>
        </View>
        
        <View style={styles.awardContainer}>
          <View style={styles.pointsContainer}>

          </View>
          <View style={styles.likesContainer}>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    color: Globals.COLOR.primaryColor,
    maxHeight: 90,
  },
  nameContainer: {
    flex: 5,
    backgroundColor: 'red',
  },
  choresContainer: {
    flex: 2,
    backgroundColor: 'blue',
  },
  awardContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  pointsContainer: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  likesContainer: {
    flex: 1,
    backgroundColor: 'purple'
  }
})