import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Globals from '../constants/Globals';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // default select for 'Tasks'
            selected: 1
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    type="font-awesome"
                    name="user"
                    iconStyle={
                        this.state.selected == 0
                            ? styles.iconSelected
                            : styles.icon
                    }
                    size={28}
                />
                <Icon
                    type="font-awesome"
                    name="check"
                    iconStyle={
                        this.state.selected == 1
                            ? styles.iconSelected
                            : styles.icon
                    }
                    size={28}
                />
                <Icon
                    type="font-awesome"
                    name="columns"
                    iconStyle={
                        this.state.selected == 2
                            ? styles.iconSelected
                            : styles.icon
                    }
                    size={28}
                />
                <Icon
                    type="font-awesome"
                    name="cog"
                    iconStyle={
                        this.state.selected == 3
                            ? styles.iconSelected
                            : styles.icon
                    }
                    size={28}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    iconSelected: {
        color: Globals.COLOR.primaryColor
    },
    icon: {
        color: Globals.COLOR.grey
    }
});
