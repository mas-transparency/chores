import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';

import MyHeader from '../components/MyHeader';
import PointDashboard from '../components/PointDashboard';
import ChoresList from '../components/ChoresDashboard';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class AddNewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: only name and reward is customizable now
            name: '',
            assigned_user: 'Sangyun',
            num_chore_points: 100,
            priority: 1,
            reward: ''
        };
    }
    handleSubmit = () => {
        // console.log('will handle submit')
        // console.log(this.state);

        return fetch('http://3.93.95.228/chores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => {
                // console.log(response);
                this.setState({ name: '', reward: '' });
            })
            .catch(error => {
                // console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>ADD NEW</Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        placeholder="Chore Name (*)"
                        inputStyle={{ color: 'white' }}
                        labelStyle={{ color: 'white' }}
                        label="Chore Name (*)"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <Input
                        placeholder="Reward"
                        inputStyle={{ color: 'white' }}
                        labelStyle={{ color: 'white' }}
                        label="Reward"
                        value={this.state.reward}
                        onChangeText={reward => this.setState({ reward })}
                    />
                    <Button
                        title="ADD"
                        size={40}
                        onPress={this.handleSubmit}
                        buttonStyle={styles.button}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <Footer />
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
    button: {
        minWidth: 150,
        backgroundColor: Globals.COLOR.primaryColor,
        color: Globals.COLOR.fontDark
    },
    footerContainer: {
        flex: 1,
        maxHeight: 50
    }
});