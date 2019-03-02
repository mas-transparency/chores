import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import ChoreBox from './ChoreBox';

export default class ChoresDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: [
                { name: 'trash', points: 100 },
                { name: 'trash2', points: 25 },
                { name: 'laundry', points: 7 },
                { name: 'trash', points: 100 },
                { name: 'trash2', points: 25 },
                { name: 'laundry', points: 7 },
                { name: 'trash', points: 100 },
                { name: 'trash2', points: 25 },
                { name: 'laundry', points: 7 },
                { name: 'laundry', points: 7 },
                { name: 'trash', points: 100 },
                { name: 'trash2', points: 25 },
                { name: 'laundry', points: 7 }
            ]
        };
    }

    renderChores = () => {
        // console.log(this.props.chores)
        // console.log(this.props.chores.length)
        const chores = this.state.chores.map((chore, index) => {
            return (
                <ChoreBox
                    key={index}
                    choreName={chore.name}
                    chorePoints={chore.points}
                />
            );
        });
        return <View style={styles.choreContainer}>{chores}</View>;
    };

    // TODO: use 'props.chores' to iterate over chores
    render() {
        // console.log(this.props.chores)
        return <ScrollView style={styles.container}>{this.renderChores()}</ScrollView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    choreContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    }
});
