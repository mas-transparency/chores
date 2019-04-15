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
        })
            .then(response => {
                console.log(response);
                this.setState({
                    name: '',
                    reward: '',
                    num_chore_points: '1',
                    duration: ''
                });
            })
            .then(() => {
                const { state, setParams, navigate } = this.props.navigation;
                const params = state.params || {};
                const _onRefresh = params._onRefresh;
                if (_onRefresh) {
                    // FIXME: figure out other alternative
                    _onRefresh();
                }
                this.props.navigation.navigate('My\ Chores')

            })
            .catch(error => {
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
                        title="Add"
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
        justifyContent: 'space-evenly',
        paddingLeft: 20,
        paddingRight: 20
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
