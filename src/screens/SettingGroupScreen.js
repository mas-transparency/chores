import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    RefreshControl
} from 'react-native';
import firebase from 'firebase';
import { Button, ListItem, Divider } from 'react-native-elements';
import Globals from '../constants/Globals';

export default class SettingGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            refreshing: false
        };
    }
    componentDidMount() {
        this._getMyGroups();
    }

    _getMyGroups = () => {
        const user = firebase.auth().currentUser;
        // console.log(user)
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
                const groups = Object.values(responseJson).filter(group => {
                    // only includes the groups that the user is in
                    return group.members.includes(uid);
                });
                this.setState({ groups });
            })
            .catch(error => {
                console.error(error);
            });
    };

    _renderGroups = () => {
        const groups = this.state.groups.map((group, index) => (
            <ListItem
                key={group.name}
                // TODO: display group info on press?
                // onPress={() => this._displayGroupInfo(group.id)}
                title={group.name}
                subtitle={`${
                    group['members'] ? group.members.length : 0
                } members`}
                // rightTitle=">"
            />
        ));
        return groups;
    };

    render() {
        // console.log(this.state.selected);
        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._getMyGroups}
                    />
                }
            >
                <View style={styles.buttonContainer}>
                    <ListItem
                        onPress={() =>
                            this.props.navigation.navigate('AddNewGroupScreen')
                        }
                        title="Start group"
                        style={styles.button}
                        rightTitle=">"
                    />
                    <ListItem
                        onPress={() =>
                            this.props.navigation.navigate('JoinGroupScreen')
                        }
                        title="Join Group"
                        style={styles.button}
                        rightTitle=">"
                    />
                </View>
                <Divider/>            
                <Text style={styles.title}>Your Groups</Text>
                <View style={styles.userGroupsContainer}>
                    <ScrollView style={styles.container}>
                        {this._renderGroups()}
                    </ScrollView>
                </View>
            </ScrollView>
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
        width: '100%'
        // flex: 1,
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
    }
});
