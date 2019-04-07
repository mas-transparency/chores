import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';
import firebase from 'firebase';
import { Button, ListItem } from 'react-native-elements';
import Globals from '../constants/Globals';

export default class AllGroupsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy groups for now
            groups: [],
            selected: -1
        };
    }
    componentDidMount() {
        this.getAllGroups();
    }
    getAllGroups = () => {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
                // console.log('fetching');
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
                        const groups = Object.values(responseJson);
                        this.setState({ groups });
                    })
                    .catch(error => {
                        // console.error(error);
                    });
            });
    };

    _displayGroupInfo = id => {
        // update selected item, may need to remove later
        this.setState({ selected: id });

        // this.props.navigation.navigate('')
    };

    _renderGroups = () => {
        const groups = this.state.groups.map((group, index) => (
            <ListItem
                onPress={() => this._displayGroupInfo(group.id)}
                title={group.name}
                subtitle={`${
                    group['members'] ? group.members.length : 0
                } members`}
                rightTitle=">"
                containerStyle={
                    this.state.selected == group.id
                        ? styles.feedCardSelected
                        : styles.feedCard
                }
            />
        ));
        return groups;
    };

    createNewGroup = () => {
        token = null;
        name = this.state.name;
        props = this.props;
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function(idToken) {
                // console.log(idToken);
                fetch('http://3.93.95.228/group', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'test-group-name',
                        name: name,
                        idToken: idToken
                    })
                })
                    .then(response => {
                        // console.log(response);
                    })
                    .catch(error => {
                        // TODO: update all groups user is in
                        props.navigation.navigate('AddNewGroup');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .then(() => {
                firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                    console.log('fetching');
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
                            const groups = Object.values(responseJson);
                            this.setState({ groups });
                        })
                        .catch(error => {
                            // console.error(error);
                        });
                });
            }

            )
            .catch(function(error) {
                console.log(error);
            });

       
    };

    render() {
        console.log(this.state.selected);
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <ListItem
                        title='Refresh'
                        style={styles.button}>
                    </ListItem>
                    <ListItem onPress={() => this.props.navigation.navigate('AddNewGroupScreen')}
                        title='Start group'
                        style={styles.button}>
                    </ListItem>
                </View>

                
                <Text style={styles.title}>Your Groups</Text>
                <View style={styles.userGroupsContainer}>
                    <ScrollView style={styles.container}>
                        {this._renderGroups()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userGroupsContainer: {
        flex: 3,
        marginTop: 10,
        // alignContent: 'space-between'
    },
    buttonContainer: {
        width: '100%',
        // flex: 1,
    },
    button: {
        width: '100%',
        textAlign: 'left',
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#000',
        borderTopColor: '#fff',
    },
    feedCard: {
        // backgroundColor: Globals.COLOR.secondaryColor,
        // marginBottom: 10
    },
    feedCardSelected: {
        // backgroundColor: Globals.COLOR.primaryColor,
        // marginBottom: 10
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        color: '#000',
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    },
});
