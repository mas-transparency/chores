import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import Globals from '../constants/Globals';

import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

export default class AddNewGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            idToken: ''
        };
    }

    _createNewGroup = () => {
        token = null;
        name = this.state.name;
        props = this.props;
        const uid = firebase.auth().currentUser.uid;

        fetch('http://3.93.95.228/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                uid: uid
            })
        })
            .then(response => {
                // console.log(response);
                // TODO: update all groups user is in
                props.navigation.navigate('AddNewGroup');
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>New Group</Text>
                    <View style={styles.nextButton}>
                        <Button
                            onPress={this._createNewGroup}
                            title="Next"
                            type="clear"
                            disabled={!this.state.name}
                        />
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        placeholder="Name your new group"
                        placeholderTextColor="#748494"
                        textAlign="center"
                        inputStyle={{ color: 'black' }}
                        style={styles.input}
                        autoFocus
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#f9f9f9'
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 30
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Globals.FONTSIZE.small
    },
    formContainer: {
        alignItems: 'center'
    },
    nextButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 25,
        marginTop: -30
    },
    input: {
        width: '100%',
        paddingVertical: 9,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#eeeeee',
        fontSize: Globals.FONTSIZE.small
    }
});
