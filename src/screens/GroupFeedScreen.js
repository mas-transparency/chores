import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Globals from '../constants/Globals';
import Card from '../components/Card'


export default class GroupFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy data for now -- change later
            members: {
                first: {
                    name: 'Jessica Pan',
                    chores: 80,
                    points: 1000,
                    likes: 100
                },
                second: {
                    name: 'MJ Park',
                    chores: 100,
                    points: 2000,
                    likes: 30
                },
                third: {
                    name: 'Kevin',
                    chores: 2,
                    points: 10,
                    likes: 0
                },
                fourth: {
                    name: 'Jessica',
                    chores: 80,
                    points: 1000,
                    likes: 100
                },
                fifth: {
                    name: 'Jessica',
                    chores: 80,
                    points: 1000,
                    likes: 100
                }
            }
        };
    }
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text>HEADER</Text>
              </View>
              <View style={styles.cardsContainer}>
                <Card user={this.state.members.first}/>
              </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Globals.COLOR.backgroundColor,
        // justifyContent: 'center'
    },
    headerContainer: {
      flex: 1
    },
    cardsContainer: {
      flex: 10
    }
});
