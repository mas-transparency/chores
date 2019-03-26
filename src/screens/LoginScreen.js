import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import firebase from 'firebase';


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
        console.log(this.state)
        console.log('handle Login!');
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
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
                        placeholder="Email"
                        containerStyle={styles.inputStyle}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Input
                        placeholder="Password"
                        containerStyle={styles.inputStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStlye}
                        onPress={() => this.handleLogin()}
                    />
                    <Button
                        title="Signup"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStlye}
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
        flex: 1
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
    inputStyle: {
        color: Globals.COLOR.primaryColor,
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

    buttonStlye: {
        backgroundColor: Globals.COLOR.primaryColor,
        color: Globals.COLOR.fontDark
    }
});
