import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import firebase from 'firebase';


import { registerForPushNotificationsAsync } from '../lib/registerForPushNotificationsAsync';
import MyHeader from '../components/MyHeader';
import Globals from '../constants/Globals';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@test.com',
            password: 'password'
        }
    }

    handleLogin = () => {

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                // TODO: set the user
                return registerForPushNotificationsAsync(user.user)
            }).then(response => {
                // console.log("here", response);
                this.props.navigation.navigate('Main')
            })
            .catch(error => {
                const { code, message } = error;
                console.log(message);
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Chores</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        label="Email"
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Input
                        label="Password"
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.handleLogin()}
                    />
                    <Button
                        title="Signup"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
        // flexDirection: 'column',
        // justifyContent: 'space-around'
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
        // backgroundColor: 'powderblue',
    },
    inputContainer: {
        flex: 1,
        marginBottom: 50
        // backgroundColor: 'skyblue'
    },
    buttonContainer: {
        flex: 1
        // backgroundColor: 'steelblue'
    },
    title: {
        fontSize: Globals.FONTSIZE.extraLarge,
        color: Globals.COLOR.primaryColor,
        alignItems: 'stretch',
        textAlign: 'center'
        // flex: 1
    },
    labelStyle: {
        // color: Globals.COLOR.secondaryColor,
    },
    inputStyle: {
        // color: Globals.COLOR.secondaryColor
    },
    inputContainerStyle: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 20
        // flex: 2
    },
    buttonContainerStyle: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 20
    },

    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor,
    }
});
