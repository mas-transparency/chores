import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Header,
    Button,
    ThemeProvider,
    ButtonGroup
} from 'react-native-elements';
import GLOBALS from '../constants/Globals';

export default class MyHeader extends Component {
    render() {
        return (
            <Header
                title="All"
            />
        );
    }
}
