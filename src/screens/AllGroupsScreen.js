import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
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
            groups: [
                {
                    id: 0,
                    name: '2019 Crecine roommates',
                    roommates: ['mj', 'michael', 'kevin', 'jessica']
                },
            ]
        };
    }

    _displayGroupInfo = () => {
        // this.props.navigation.navigate('')
    }

    renderGroups = () => {
        const groups = this.state.groups.map((group, index) => (
            <TouchableOpacity>
                <ListItem
                    key={index}
                    onPress={() => this._displayGroupInfo}
                    title={group.name}
                    subtitle={`${group.roommates.length} members`}
                    rightTitle='>'
                    containerStyle={styles.feedCard}
                />
            </TouchableOpacity>
        ));
        return groups;
    };

    createNewGroup = () => {
        token = null
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
          // Send token to your backend via HTTPS
          token = idToken
        }).catch(function(error) {
          // Handle error
        });
        
        return fetch('http://3.93.95.228/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: "test-group-name",
                idToken: token
            }
        })
            .then(response => {
                console.log(response);

                // TODO: update all groups user is in
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userGroupsContainer}>
                    {this.renderGroups()}
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Create New Group"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={this.createNewGroup}
                    />
                    <Button
                        title="Join Existing Group"
                        containerStyle={styles.buttonContainerStyle}
                        buttonStyle={styles.buttonStyle}
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
        flex: 10,
        marginTop: 10,
        alignContent: 'space-between'
    },
    buttonContainer: {
        flex: 1
    },
    buttonContainerStyle: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 20
    },
    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor,
        color: Globals.COLOR.fontDark
    },
    feedCard: {
        backgroundColor: Globals.COLOR.primaryColor,
        marginBottom: 10,
        // marginHorizontal: 10,
    }
});
