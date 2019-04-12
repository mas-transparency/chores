import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Divider } from 'react-native-elements';

import PointDashboard from '../components/PointDashboard';
import ChoresDashboard from '../components/ChoresDashboard';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class MyChoresScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.points}>
                    <PointDashboard />
                </View>
                <View style={styles.chores}>
                    <ChoresDashboard 
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    points: {
        flex: 1
    },
    chores: {
        flex: 3
        // backgroundColor: 'blue'
    }
});
