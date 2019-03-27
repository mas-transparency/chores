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
                {
                    id: 1,
                    name: 'Best Roommates',
                    roommates: ['mj', 'michael', 'kevin', 'jessica']
                },
                {
                    id: 2,
                    name: 'THE THE THE BEST ',
                    roommates: ['mj', 'michael', 'kevin', 'jessica']
                }
            ],
            selected: -1
        };
    }
    componentDidMount() {
        
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
                console.log('fetching')
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

    _displayGroupInfo = id => {
        // update selected item, may need to remove later
        this.setState({ selected: id });

        // this.props.navigation.navigate('')
    };

    renderGroups = () => {
        const groups = this.state.groups.map((group, index) => (
            <TouchableOpacity key={index}>
                <ListItem
                    onPress={() => this._displayGroupInfo(group.id)}
                    title={group.name}
                    subtitle={`${group["members"] ? group.members.length : 0 } members`}
                    rightTitle=">"
                    containerStyle={
                        this.state.selected == group.id
                            ? styles.feedCardSelected
                            : styles.feedCard
                    }
                />
            </TouchableOpacity>
        ));
        return groups;
    };

    createNewGroup = () => {
        // TODO: removed for now, will need to recover.
    };

    render() {
        console.log(this.state.selected);
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
        flex: 3,
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
        backgroundColor: Globals.COLOR.primaryColor
    },
    feedCard: {
        backgroundColor: Globals.COLOR.secondaryColor,
        marginBottom: 10
        // marginHorizontal: 10,
    },
    feedCardSelected: {
        backgroundColor: Globals.COLOR.primaryColor,
        marginBottom: 10
    }
});
