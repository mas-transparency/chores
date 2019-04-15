import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Globals from '../constants/Globals';

import { CheckBox, ListItem } from 'react-native-elements';

export default class ChoreBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    handleClick = () => {};

    _onPressChore = () => {
        // console.log('checking!');
        this.setState({ checked: !this.state.checked });
        this.props._onCompleteChore(this.props.choreID);
    };

    // TODO: use 'props.chores' to iterate over chores
    render() {
        return (
            <TouchableOpacity
                key={this.props.choreID}
                //   onPress={this._onPressChore}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        borderColor: '#000'
                    }}
                >
                    <CheckBox
                        checked={this.state.checked}
                        size={43}
                        onPress={() => this._onPressChore()}
                    />
                    <ListItem
                        title={this.props.choreName}
                        subtitle={`${this.props.chorePoints} points`}
                        style={styles.button}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userGroupsContainer: {
        flex: 3,
        marginTop: 10
    },
    button: {
        width: '100%'
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        color: '#000',
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    }
});
