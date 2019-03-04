import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Divider } from 'react-native-elements';

import PointDashboard from '../components/PointDashboard';
import ChoresList from '../components/ChoresDashboard';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class MyChoresScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.choresContainer}>
                    <View style={styles.points}>
                        <PointDashboard />
                    </View>
                    <View style={styles.chores}>
                        <ChoresList />
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Footer />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    choresContainer: {
        flex: 3
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
    }
});
