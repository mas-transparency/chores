import React from 'react';
import { View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Alert } from "react-native";

import firebase from 'firebase';

import MyHeader from '../components/MyHeader';
import Footer from '../components/Footer';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class AddNewChoreScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fields required for creating a new chore
            name: '',
            reward: '',
            num_chore_points: '1', // default value = 1
            assigned_to: '',
            groupID: '',

            // fields not required
            groups: [],
            users: [],
            groupSelect: '',
            userSelect: ''
        };
    }

    componentDidMount() {
        // get all group info
        this._getMyGroups();
    }

    _getMyGroups = () => {
        const user = firebase.auth().currentUser;

        // fetches my groups
        fetch('http://3.93.95.228/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                const uid = firebase.auth().currentUser.uid;
                // only includes the groups that the user is in
                // groups = [ { groupName, groupID, members } ]

                const groups = Object.keys(responseJson).map(key => {
                    const group = responseJson[key];
                    return {
                        groupName: group.name,
                        members: group.members,
                        groupID: key
                    };
                }).filter(group => {
                    return group.members.includes(uid);
                });

                // const groups = Object.values(responseJson).filter(group => {
                //     return group.members.includes(uid);
                // });
                this.setState({ groups });
            })
            .catch(error => {
                console.error(error);
            });
    };


    handleSubmit = () => {
        const user = firebase.auth().currentUser;

        // first validate the forms
        if (this.state.name == '') {
            Alert.alert(
              'Invalid input',"Please enter a name for the chore",[
                {text: 'OK'},
              ],
              {cancelable: false},
          )
          return
        }
        if (this.state.groupID == '') {
            Alert.alert(
              'Invalid input',"Please select a group for this chore",[
                {text: 'OK'},
              ],
              {cancelable: false},
          )
          return
        }
        if (this.state.assigned_to == '') {
            Alert.alert(
              'Invalid input',"Please select a Person on Duty for this chore",[
                {text: 'OK'},
              ],
              {cancelable: false},
          )
          return
        }
        fetch('http://3.93.95.228/chores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    reward: this.state.reward,
                    num_chore_points: parseInt(this.state.num_chore_points),
                    assigned_to: this.state.assigned_to,
                    groupID: this.state.groupID
                })
        }).then(response => {
            console.log(response);
            this.setState({
                name: '',
                reward: '',
                num_chore_points: '1',
            });
        }).then(() => {
            const { state, setParams, navigate } = this.props.navigation;
            const params = state.params || {};
            const _onRefresh = params._onRefresh;
            if (_onRefresh) {
                // FIXME: figure out other alternative
                _onRefresh();
            }
            this.props.navigation.navigate('My\ Chores')

        }).catch(error => {
            console.log(error);
        });
    };

    handleChoreRoulette = () => {
        // first validate the forms
        if (this.state.name == '') {
            Alert.alert(
              'Invalid input',"Please enter a name for the chore",[
                {text: 'OK'},
              ],
              {cancelable: false},
          )
          return
        }
        if (this.state.groupID == '') {
            Alert.alert(
              'Invalid input',"Please select a group for this chore",[
                {text: 'OK'},
              ],
              {cancelable: false},
          )
          return
        }

        const user = firebase.auth().currentUser;
        var selectedDisplayName;
        // first, obtain a user from the roulette endpoint
        fetch('http://3.93.95.228/roulette', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupID: this.state.groupID
            })
        }).then(response => response.json())
        .then(response => {
            this.state.assigned_to = response.uid;
            // Now we retrieve the displayName of the selectedUser for our
            // modal
            return fetch('http://3.93.95.228/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'uid': this.state.assigned_to
                })
            })
        }).then(response => response.json())
        .then(response => {
                selectedDisplayName = response.displayName;
        }).then(_ => {
            return fetch('http://3.93.95.228/chores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    reward: this.state.reward,
                    num_chore_points: parseInt(this.state.num_chore_points),
                    assigned_to: this.state.assigned_to,
                    groupID: this.state.groupID
                })
            })
        }).then(response => {
            this.setState({
                name: '',
                reward: '',
                num_chore_points: '1',
                duration: ''
            });
        }).then(() => {
            const { state, setParams, navigate } = this.props.navigation;
            const params = state.params || {};
            const _onRefresh = params._onRefresh;
            if (_onRefresh) {
                // FIXME: figure out other alternative
                _onRefresh();
            }
            this.props.navigation.navigate('My\ Chores')
            // show alert
            Alert.alert(
              'User Chosen!',
              selectedDisplayName + ' has been chosen for the new chore.',
              [
                {text: 'OK'},
              ],
              {cancelable: false},
          )
        }).catch(error => {
            console.error(error);
        });
    };

    handleUserSelect = username => {
        // TODO:
        let user = this.state.users.filter(user => {
            return user.displayName == username;
        });
        if (!user) {
            return;
        }
        user = user[0];

        // set selected user info
        this.setState({
            userSelect: username,
            assigned_to: user.uid
        });
    };

    handleGroupSelect = groupName => {
        // find the group with the 'value' and update 'users'
        let group = this.state.groups.filter(group => {
            return group.groupName == groupName;
        });
        if (!group) {
            return;
        }
        group = group[0];

        // set groupID
        this.setState({
            groupID: group.groupID,
            users: [],
            userSelect: '',
            assigned_to: ''
        });

        let userFetches = group.members.map(uid => {
            return fetch('http://3.93.95.228/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid })
            }).then(res => res.json());
        });

        Promise.all(userFetches).then(responses => {
            // console.log(responses);
            for (const res of responses) {
                this.setState({ users: [...this.state.users, res] });
            }
        });
    };

    render() {
        const groups = this.state.groups
            ? this.state.groups.map(group => {
                  return { value: group.groupName };
              })
            : {};

        const users = this.state.users.map(user => {
            return { value: user.displayName };
        });

        return (
            <View style={styles.container}>
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
                        keyboardType={"numeric"}
                    />
                    <Dropdown
                        label="Select Group"
                        containerStyle={styles.dropdownContainer}
                        data={groups}
                        onChangeText={value => this.handleGroupSelect(value)}
                    />
                    <Dropdown
                        label="Select Person On Duty"
                        containerStyle={styles.dropdownContainer}
                        data={users}
                        onChangeText={value => this.handleUserSelect(value)}
                        value={this.state.userSelect}
                    />
                    <Button
                        style={styles.button}
                        buttonStyle={styles.buttonStyle}
                        title="Add New"
                        size={40}
                        onPress={this.handleSubmit}
                        width={100}
                    />
                    <Button
                        style={styles.button}
                        buttonStyle={styles.rouletteStyle}
                        title="Chore Roulette!"
                        size={40}
                        onPress={this.handleChoreRoulette}
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
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingLeft: 20,
        paddingRight: 20
    },
    formContainer2: {
        flex: 1,
        marginBottom: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingLeft: 20,
        paddingRight: 20,
    },
    dropdownContainer: {
        width: 300
    },
    addButton: {
        width: '100%',
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#000',
        borderTopColor: '#fff'
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
        backgroundColor: Globals.COLOR.primaryColor,
        width: 300,
    },
    rouletteStyle: {
        backgroundColor: Globals.COLOR.thirdColor,
        width: 300,
    },
    marginInput: {
        margin: 10,
    }
});
