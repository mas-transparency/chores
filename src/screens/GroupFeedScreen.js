import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Bar } from 'react-native-progress';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase';

import Globals from '../constants/Globals';
import Card from '../components/Card';

export default class GroupFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            completedChores: [],
            members: [],
            groups: [],
            groupSelect: {} // selected group object
        };
    }

    componentDidMount() {
        // Fetch group's completed chores
        this._getMyGroups();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this._updateGroupFeed(this.state.groupSelect.groupName);
    };

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
                const groupSelect = groups.length > 0 ? groups[0] : '';
                this.setState({
                    groups,
                    groupSelect
                });
                this._updateGroupFeed(groupSelect.groupName);
            })
            .catch(error => {
                console.error(error);
            });
    };

    renderGroupFeeds = () => {
        // console.log(this.state.completedChores);
        const groupFeeds = this.state.completedChores.map((chore, i) => (
            <TouchableOpacity key={i}>
                <ListItem
                    title={chore.name}
                    subtitle={chore.assigned_username}
                    containerStyle={styles.feedCard}
                    // titleStyle={{ color: Globals.COLOR.primaryColor }}
                    // subtitleStyle={{ color: Globals.COLOR.primaryColor }}
                    rightTitle={`${chore.num_chore_points} pts`}
                />
            </TouchableOpacity>
        ));
        return groupFeeds;
    };

    _renderMemberStats = () => {
        var members = this.state.members;
        var maxMemberPoints = 0;
        members.sort(function(a, b) {
            return b.total_chore_points - a.total_chore_points;
        });

        for (var i = 0; i < members.length; i++) {
            memberPoints = members[i].total_chore_points;
            if (memberPoints > maxMemberPoints) {
                maxMemberPoints = memberPoints;
            }
        }
        // console.log(members);
        const displayMemberStats = members.map((memberInfo, i) => {
            var progress = memberInfo.total_chore_points / maxMemberPoints;
            // TODO: isCurUser is not hardcoded
            var isCurUser = memberInfo.displayName == 'Jessica';
            return (
                <View key={memberInfo.uid} style={styles.memberStatsContainer}>
                    <Text
                        style={isCurUser ? styles.curUser : styles.memberName}
                    >
                        {isCurUser ? 'You' : memberInfo.displayName}
                    </Text>
                    <View style={styles.progressBarContainer}>
                        <Bar
                            progress={progress}
                            width={230}
                            height={23}
                            borderRadius={12}
                            borderColor="#fff"
                            color="#07cdff"
                            unfilledColor="#dedede"
                        />
                        <Text
                            style={isCurUser ? styles.curUser : styles.progress}
                        >
                            {memberInfo.total_chore_points} points
                        </Text>
                    </View>
                </View>
            );
        });
        return displayMemberStats;
    };

    _renderGroupSelect = () => {
        const groups = this.state.groups
            ? this.state.groups.map(group => {
                  return { value: group.groupName };
              })
            : {};
        return (
            <Dropdown
                // label="Select Group"
                fontSize={20}
                dropdownOffset={{ top: 0, left: 0 }}
                itemTextStyle={{ fontWeight: 'bold' }}
                containerStyle={styles.dropdownContainer}
                data={groups}
                onChangeText={value => this._updateGroupFeed(value)}
                value={groups.length > 0 ? groups[0].value : ''}
            />
        );
    };

    _updateGroupFeed = groupName => {
        let group = this.state.groups.filter(group => {
            return group.groupName == groupName;
        });
        if (!group) {
            return;
        }
        group = group[0]; // group contains groupID, groupName, and members
        this.setState({ groupSelect: group });

        // fetch all group chores and filter completed ones
        fetch('http://3.93.95.228/group-chores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ groupID: group.groupID })
        })
            .then(res => res.json())
            .then(result => {
                const completedChores = Object.values(result).filter(chore => {
                    return chore.isDone;
                });
                this.setState({ completedChores });
            })
            .then(() => {
                // update chore with actual username
                let userFetches = group.members.map(uid => {
                    return fetch('http://3.93.95.228/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ uid })
                    }).then(res => res.json());
                });

                Promise.all(userFetches).then(response => {
                    // update members
                    this.setState({ members: response });

                    const updatedCompletedChores = [];
                    for (const chore of this.state.completedChores) {
                        for (const res of response) {
                            // iterating users
                            if (chore.assigned_to == res.uid) {
                                // inserting assigned username
                                const updatedChore = {
                                    ...chore,
                                    assigned_username: res.displayName
                                };
                                updatedCompletedChores.push(updatedChore);
                                break;
                            }
                        }
                    }
                    this.setState({
                        completedChores: updatedCompletedChores,
                        refreshing: false
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {this._renderGroupSelect()}
                </View>
                <ScrollView
                    style={styles.feedContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Overview</Text>
                    </View>
                    {this._renderMemberStats()}
                    <View style={styles.cardsContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>
                                Recent Activity
                            </Text>
                        </View>
                        {this.renderGroupFeeds()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        justifyContent: 'center',
        marginVertical: 5
        // paddingLeft: 20
    },
    feedContainer: {
        flex: 8
    },
    dropdownContainer: {
        width: 300
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    },
    subheaderText: {
        marginHorizontal: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    },
    memberStatsContainer: {
        marginHorizontal: 20,
        marginVertical: 3
    },
    progressBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    memberName: {
        marginHorizontal: 10,
        color: '#686868'
        // fontSize: Globals.FONTSIZE.small,
    },
    curUser: {
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    progressText: {
        marginHorizontal: 10,
        color: '#737373'
        // fontSize: Globals.FONTSIZE.small,
    },
    cardsContainer: {
        marginTop: 15,
        flex: 10
        // alignContent: 'space-between',
        // borderWidth: 0.5,
        // borderColor: '#adadad'
    },
    feedCard: {
        backgroundColor: Globals.COLOR.secondaryColor,
        marginBottom: 10,
        marginHorizontal: 10
    }
});
