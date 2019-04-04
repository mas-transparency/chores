import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
        }
    }

    createNewGroup = () => {
        token = null;
        name = this.state.name;
        props = this.props;
        firebase.auth().currentUser.getIdToken(true)
        .then(function(idToken) {
            fetch('http://3.93.95.228/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': name,
                    'idToken': idToken,
                })
            }).then(response => {
                console.log(response);
                // TODO: update all groups user is in
                props.navigation.navigate('AddNewGroup');
            })
            .catch(error => {
                console.log(error);
            });
        }).catch(function(error) {
          console.log(error)
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create New Group</Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        placeholder="Group Name (*)"
                        inputStyle={{ color: 'white' }}
                        labelStyle={{ color: 'white' }}
                        label="Group Name (*)"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <Button
                        title="Create New Group"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={this.createNewGroup}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Globals.COLOR.secondaryColor,
        fontSize: Globals.FONTSIZE.large
    },
    formContainer: {
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor,
    },
    buttonContainerStyle: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 20
    },
    footerContainer: {
        flex: 1,
        maxHeight: 50
    }
});
