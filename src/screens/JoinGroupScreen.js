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

export default class JoinGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selected: -1
        };
    }
    componentWillMount() {
        this._getAllGroups();
    }

    _getAllGroups = () => {
        // get all the groups
        fetch('http://3.93.95.228/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                // console.log(responseJson);
                const groups = Object.keys(responseJson).map(key => {
                    return {
                        groupID: key,
                        groupName: responseJson[key].name,
                        members: responseJson[key].members
                    };
                });
                this.setState({ groups });
            })
            .catch(error => {});
    };

    _renderGroups = () => {
        const groups = this.state.groups.map((group, index) => (
            <ListItem
                key={group.groupID}
                containerStyle={
                    this.state.selected == group.groupID
                        ? { backgroundColor: Globals.COLOR.primaryColor }
                        : { backgroundColor: Globals.COLOR.secondaryColor }
                }
                onPress={() =>
                    this.state.selected == group.groupID
                        ? this.setState({ selected: -1 })
                        : this.setState({ selected: group.groupID })
                }
                title={group.groupName}
                subtitle={`${
                    group['members'] ? group.members.length : 0
                } members`}
                rightTitle=""
            />
        ));
        return groups;
    };

    _handleJoin = () => {
        const uid = firebase.auth().currentUser.uid;
        // handles join to a group
        fetch('http://3.93.95.228/group/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupID: this.state.selected,
                uid: uid
            })
        })
            .then(response => {
                this.props.navigation.navigate('SettingGroupScreen');
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>All Groups</Text>
                <View style={styles.userGroupsContainer}>
                    <ScrollView style={styles.container}>
                        {this._renderGroups()}
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Join"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this._handleJoin()}
                        disabled={this.state.selected == -1 ? true : false}
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
    userGroupsContainer: {
        flex: 3,
        marginTop: 10
        // alignContent: 'space-between'
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        width: '100%',
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#000',
        borderTopColor: '#fff'
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        color: '#000',
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
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
