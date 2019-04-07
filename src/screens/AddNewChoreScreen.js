import React from 'react';
import { View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

import firebase from 'firebase';

import MyHeader from '../components/MyHeader';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class AddNewChoreScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: only name and reward is customizable now
            name: '',
            reward: '',
            num_chore_points: '1',  // default value = 1
            duration: '1',  // default duration = 1
            idToken: '', // assigned user id token
            groupID: '',
            groups: [],
            assigned_to: ''
        };
    }

    componentWillMount() {
        // get all groups and userID set
        const user = firebase.auth().currentUser;
        user.getIdToken(true)
            .then(idToken => {
                // fetch groups -- use fetched groups to have a picker menu for a group, then use the groupID to assign a chore
                // console.log("id Token", idToken);
                fetch('http://3.93.95.228/assigned-groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idToken: idToken
                    })
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        // console.log(responseJson)
                        // JSON for group info
                        const groups = Object.keys(responseJson).map(key => {
                            return {
                                groupID: key,
                                groupName: responseJson[key].name
                            };
                        });
                        // console.log(groups);
                        this.setState({ groups: groups });
                        // console.log(responseJson);
                    });
            })
            .catch(error => {
                const { code, message } = error;
                console.log(message);
            });
    }

    handleSubmit = () => {
        // console.log('will handle submit');
        // console.log(JSON.stringify(this.state));
        // console.log(user);
        const user = firebase.auth().currentUser;

        user.getIdToken(true).then(idToken => {
            fetch('http://3.93.95.228/chores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    reward: this.state.reward,
                    num_chore_points: this.state.num_chore_points,
                    duration: this.state.duration,
                    idToken: idToken,
                    groupID: this.state.groupID
                })
            })
                .then(response => {
                    console.log(response);
                    this.setState({
                        name: '',
                        reward: '',
                        num_chore_points: '',
                        duration: ''
                    });
                })
                .catch(error => {
                    // console.error(error);
                });
        });
    };

    handleGroupSelect = value => {
        // console.log(value);
        // iterate 'groups' and set groupID
        for (const group of this.state.groups) {
            console.log(value, group);
            if (group.groupName == value) {
                this.setState({ groupID: group.groupID });
                break;
            }
        }
    };

    render() {
        const groupNames = this.state.groups.map(item => {
            return { value: item.groupName };
        });

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>ADD NEW</Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        // placeholder="Chore Name (*)"
                        label="Chore Name (*)"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <Input
                        // placeholder="Reward"
                        label="Reward"
                        value={this.state.reward}
                        onChangeText={reward => this.setState({ reward })}
                    />
                    <Input
                        // placeholder="Chore Points"
                        label="Chores Points (#)"
                        value={this.state.num_chore_points}
                        onChangeText={num_chore_points =>
                            this.setState({ num_chore_points })
                        }
                        keyboardType="numeric"
                    />
                    <Input
                        // placeholder="Duration (days)"
                        label="Duration (# days)"
                        value={this.state.duration}
                        onChangeText={duration => this.setState({ duration })}
                        keyboardType="numeric"
                    />
                    <Dropdown
                        label="Select Group"
                        containerStyle={styles.dropdownContainer}
                        data={groupNames}
                        onChangeText={value => this.handleGroupSelect(value)}
                    />
                    <Button
                        style={styles.button}
                        buttonStyle={styles.buttonStyle}
                        title="ADD"
                        size={40}
                        onPress={this.handleSubmit}
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
        flex: 7,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    dropdownContainer: {
        width: 300
    },
    button: {
        minWidth: 150,
        backgroundColor: Globals.COLOR.primaryColor,
        color: Globals.COLOR.primaryColor
    },
    footerContainer: {
        flex: 1,
        maxHeight: 50
    },
    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor
    }
});
