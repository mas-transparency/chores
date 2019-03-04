import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Divider } from 'react-native-elements';

import MyHeader from '../components/MyHeader';
import PointDashboard from '../components/PointDashboard';
import ChoresList from '../components/ChoresDashboard';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <MyHeader />
                </View>
                <Divider style={styles.divider} />
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
        flex: 3,
        // backgroundColor: 'blue'
    },
    footerContainer: {
        flex: 1,
        maxHeight: 50,
    },
    divider: {
        backgroundColor: Globals.COLOR.grey,
        height: 1 
    }
});
