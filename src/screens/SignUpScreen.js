import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import firebase from 'firebase';

import Globals from '../constants/Globals';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        };
    }
    handleRegister = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(() => {
                const user = firebase.auth().currentUser;
                // update user info here
                user.updateProfile({ displayName: this.state.name }).then(
                    () => {
                        this.props.navigation.navigate('Login');
                    }
                );
            })
            .catch(function(error) {
                const { code, msg } = error;
                console.log(code, msg);
            });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Input
                        label="Name"
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    />
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
                    <Input
                        label="Confirm Password"
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onChangeText={confirmPassword =>
                            this.setState({ confirmPassword })
                        }
                        value={this.state.confirmPassword}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Register"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.handleRegister()}
                    />
                    <Button
                        title="Back"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        paddingTop: 100,
        paddingBottom: 50
    },
    buttonContainer: {
        flex: 1,
        marginTop: 150
    },
    inputContainerStyle: {
        paddingLeft: 50,
        paddingRight: 50,
        marginBottom: 20
    },
    labelStyle: {
        color: Globals.COLOR.secondaryColor
    },
    inputStyle: {
        color: Globals.COLOR.secondaryColor
    },
    buttonContainerStyle: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 20
    },
    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor
    }
});
