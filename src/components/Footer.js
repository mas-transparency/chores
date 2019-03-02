import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Global from '../constants/Globals';

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon type='font-awesome' name='user' iconStyle={styles.icon} size={28}/>
                <Icon type='font-awesome' name='check' iconStyle={styles.icon} size={28}/>
                <Icon type='font-awesome' name='columns' iconStyle={styles.icon} size={28}/>
                <Icon type='font-awesome' name='cog' iconStyle={styles.icon} size={28}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icon: {
        color: Global.COLOR.grey 
    }
});