import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Header,
    Button,
    ThemeProvider,
    ButtonGroup
} from 'react-native-elements';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import Globals from './src/constants/Globals';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <HomeScreen />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Globals.COLOR.backgroundColor
    }
});
