import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

import Globals from '../constants/Globals';

export default class PointDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: change this to dynamic
            points: 25
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.dashboardText}>Your Chore Points</Text>
                <Text style={styles.dashboardNumber}>{this.state.points}</Text>
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
        color: Globals.COLOR.secondaryColor,
        fontSize: Globals.FONTSIZE.large
    },
    dashboardNumber: {
        color: Globals.COLOR.primaryColor,
        fontSize: Globals.FONTSIZE.extraLarge
    }
});
