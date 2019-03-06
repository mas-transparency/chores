import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Globals from "../constants/Globals";

export default class ChoreBox extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {};

  // TODO: use 'props.chores' to iterate over chores
  render() {
    const color = Globals.COLOR.secondaryColor;
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{this.props.choreName}</Text>
        </View>
        <View
          style={{
            ...styles.pointsContainer,
            backgroundColor: color
          }}
        >
          <Text style={styles.point}>{this.props.chorePoints}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    marginBottom: 20,
    marginHorizontal: 10
  },
  nameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  pointsContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  name: {
    fontSize: Globals.FONTSIZE.medium,
    color: Globals.COLOR.secondaryColor
  },
  point: {
    fontSize: Globals.FONTSIZE.large,
    color: Globals.COLOR.backgroundColor
  }
});
