import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';

import Globals from '../constants/Globals';
import Card from '../components/Card';

export default class GroupFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy data for now -- change later
            groupName: 'Georgia Tech Chores',
            members: [
                {
                    id: 1,
                    name: 'Jessica Pan',
                    chore: 'Clean it!',
                    points: 100,
                    likes: 100
                },
                {
                    id:2,
                    name: 'MJ Park',
                    chore: 'do something',
                    points: 200,
                    likes: 30
                },
                {
                    id: 3,
                    name: 'Kevin',
                    chore: 'buy grocery',
                    points: 10,
                    likes: 0
                },
                {
                    id: 4,
                    name: 'Michael',
                    chore: 'clean the room',
                    points: 100,
                    likes: 100
                },
                {
                    id: 5,
                    name: 'MJ',
                    chore: 'get some sleep',
                    points: 100,
                    likes: 100
                }
            ]
        };
    }

    renderGroupFeeds = () => {
        const groupFeeds = this.state.members.map((item, i) => (
            <TouchableOpacity key={item.id}>
                <ListItem
                    title={item.name}
                    subtitle={item.chore}
                    containerStyle={styles.feedCard}
                    // titleStyle={{ color: Globals.COLOR.primaryColor }}
                    // subtitleStyle={{ color: Globals.COLOR.primaryColor }}
                    rightTitle={`${item.points} pts`}
                />
            </TouchableOpacity>
        ));
        return groupFeeds;
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{this.state.groupName}</Text>
                </View>
                <View style={styles.cardsContainer}>
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
        color: Globals.COLOR.primaryColor,
        fontSize: Globals.FONTSIZE.medium
    },
    cardsContainer: {
        flex: 10,
        alignContent: 'space-between'
    },
    feedCard: {
        backgroundColor: Globals.COLOR.primaryColor,
        marginBottom: 10,
        marginHorizontal: 10,
    }
});
