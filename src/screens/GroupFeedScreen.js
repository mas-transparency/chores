import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Bar } from 'react-native-progress';

import Globals from '../constants/Globals';
import Card from '../components/Card';

export default class GroupFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy data for now -- change later
            groupName: '2019 Crecine roommates',
            members: [
                {
                    name: 'Jessica Pan',
                    chore: 'Clean it!',
                    points: 100,
                    likes: 100
                },
                {
                    name: 'MJ Park',
                    chore: 'get the trash out',
                    points: 200,
                    likes: 30
                },
                {
                    name: 'Kevin',
                    chore: 'buy grocery',
                    points: 10,
                    likes: 0
                },
                {
                    name: 'Michael',
                    chore: 'clean the room',
                    points: 100,
                    likes: 100
                },
                {
                    name: 'MJ Park',
                    chore: 'get milk',
                    points: 100,
                    likes: 100
                }
            ],
            feed: [
                {
                    name: 'Jessica',
                    totalPoints: 24,
                },
                {
                    name: 'MJ Park',
                    totalPoints: 29,
                },
                {
                    name: 'Kevin',
                    totalPoints: 19,
                },
                {
                    name: 'Michael',
                    totalPoints: 30,
                },
            ]
        };
    }

    componentDidMount() {
        // Fetch group's completed chores
        

    }

    renderGroupFeeds = () => {
        const groupFeeds = this.state.members.map((item, i) => (
            <TouchableOpacity key={i}>
                <ListItem
                    title={item.chore}
                    subtitle={item.name}
                    containerStyle={styles.feedCard}
                    // titleStyle={{ color: Globals.COLOR.primaryColor }}
                    // subtitleStyle={{ color: Globals.COLOR.primaryColor }}
                    rightTitle={`${item.points} pts`}
                />
            </TouchableOpacity>
        ));
        return groupFeeds;
    };

    _renderMemberStats = () => {
        var feed = this.state.feed;
        var maxMemberPoints = 0;
        feed.sort(function(a, b){return b.totalPoints - a.totalPoints});

        for (var i = 0; i < feed.length; i++) {
            memberPoints = feed[i].totalPoints;
            if (memberPoints > maxMemberPoints) {
                maxMemberPoints = memberPoints;    
            }
        }

        const displayMemberStats = feed.map((memberInfo, i) => {
            var progress = memberInfo.totalPoints / maxMemberPoints;
            // TODO: isCurUser is not hardcoded
            var isCurUser = memberInfo.name == 'Jessica'
            return (
                <View key={memberInfo.name} style={styles.memberStatsContainer}>
                    <Text style={isCurUser ? styles.curUser : styles.memberName}>{isCurUser ? 'You' : memberInfo.name}</Text>
                    <View style={styles.progressBarContainer}>
                        <Bar progress={progress} width={230} height={23} borderRadius={12} borderColor='#fff' color='#07cdff' unfilledColor='#dedede'/>
                        <Text style={isCurUser ? styles.curUser : styles.progressText}>{memberInfo.totalPoints} points</Text>
                    </View>    
                </View>
            )
        });
        return displayMemberStats;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{this.state.groupName}</Text>
                </View>
                <Text style={styles.subheaderText}>Overview</Text>
                {this._renderMemberStats()}
                <View style={styles.cardsContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Recent Activity</Text>
                    </View>
                    {this.renderGroupFeeds()}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 20,
        paddingLeft: 20
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium,
    },
    subheaderText: {
        marginHorizontal: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium,
    },
    memberStatsContainer: {
        marginHorizontal: 20,
        marginVertical: 3,
    },
    progressBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    memberName: {
        marginHorizontal: 10,
        color: '#686868',
        // fontSize: Globals.FONTSIZE.small,
    },
    curUser: {
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    progressText: {
        marginHorizontal: 10,
        color: '#737373',
        // fontSize: Globals.FONTSIZE.small,
    },
    cardsContainer: {
        marginTop: 15,
        flex: 10,
        // alignContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#adadad',
    },
    feedCard: {
        backgroundColor: Globals.COLOR.secondaryColor,
        marginBottom: 10,
        marginHorizontal: 10,
    }
});
