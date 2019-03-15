import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import Global from "../constants/Globals";
import ChoreBox from "./ChoreBox";
import Globals from "../constants/Globals";

export default class ChoresDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    // TODO: should we hide this later?
    fetch("http://3.93.95.228/chores")
      .then(response => response.json())
      .then(responseJson => {
        const newChores = [];
        for (const id in responseJson) {
          const chore = responseJson[id];
          const newChore = { ...chore, id };
          newChores.push(newChore);
        }
        // console.log(newChores)
        this.setState({ chores: newChores });
      })
      .then(() => {
        this.setState({ refreshing: false });
      });
  };

  _onPressChore(id) {
    // const chores = this.state.chores.filter(chore => chore.id != id);
    // this.setState({ chores });
  }

  renderChores = () => {
    // console.log(this.props.chores)
    // console.log(this.props.chores.length)
    const chores = this.state.chores.map((chore, index) => {
      return (
        <TouchableOpacity
          key={chore.id}
          onPress={() => this._onPressChore(chore.id)}
          // underlayColor={Globals.COLOR.grey}
        >
          <ChoreBox
            choreName={chore.name}
            chorePoints={chore.num_chore_points}
          />
        </TouchableOpacity>
      );
    });
    return <View style={styles.choreContainer}>{chores}</View>;
  };

  // TODO: use 'props.chores' to iterate over chores
  render() {
    // console.log(this.props.chores)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}
      >
        {this.renderChores()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  choreContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});
