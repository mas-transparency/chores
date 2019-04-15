import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import firebase from 'firebase';
import Globals from '../constants/Globals';

export default class PointDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', // name of the user
            total_chore_points: 0
        };
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;

        fetch('http://3.93.95.228/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.uid
            })
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    total_chore_points: result.total_chore_points,
                    username: result.displayName
                });
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.dashboardText}>{this.state.username}'s Chore Points</Text>
                <Text style={styles.dashboardNumber}>{this.state.total_chore_points}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    dashboardText: {
        // color: Globals.COLOR.secondaryColor,
        fontSize: Globals.FONTSIZE.large
    },
    dashboardNumber: {
        color: Globals.COLOR.primaryColor,
        fontSize: Globals.FONTSIZE.extraLarge
    }
});
