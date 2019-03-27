import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

export default class AddNewGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "test-group-name",
            idToken: 'test-id-token'
        }
    }
    handleClick = () => {
        // get the current token
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            console.log(idToken);
            fetch('http://3.93.95.228/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': 'test-group-name',
                    'idToken': idToken,
                })
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }).catch(function(error) {

        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Add New Group Screen</Text>
                <Button title="Create" onPress={() => this.handleClick()}/>
            </View>
        );
    }
}
