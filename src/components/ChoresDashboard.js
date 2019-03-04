import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Global from '../constants/Globals';
import ChoreBox from './ChoreBox';
import Globals from '../constants/Globals';


export default class ChoresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: [
                { id: 0, name: 'trash', points: 100 },
                { id: 1, name: 'trash2', points: 25 },
                { id: 3, name: 'laundry', points: 7 },
                { id: 4, name: 'trash', points: 100 },
                { id: 5, name: 'trash2', points: 25 },
                { id: 6, name: 'laundry', points: 7 },
                { id: 7, name: 'trash', points: 100 },
                { id: 8, name: 'trash2', points: 25 },
                { id: 9, name: 'laundry', points: 7 },
                { id: 10, name: 'laundry', points: 7 },
                { id: 11, name: 'trash', points: 100 },
                { id: 12, name: 'trash2', points: 25 },
                { id: 13, name: 'laundry', points: 7 }
            ]
        };
    }
    _onPressChore(id) {
        const chores = this.state.chores.filter(chore => chore.id != id);
        this.setState({ chores });
    }

    renderChores = () => {
        // console.log(this.props.chores)
        // console.log(this.props.chores.length)
        const chores = this.state.chores.map((chore, index) => {
            return (
                <TouchableOpacity key={chore.id}
                    onPress={() => this._onPressChore(chore.id)}
                    // underlayColor={Globals.COLOR.grey}
                >
                    <ChoreBox
                        choreName={chore.name}
                        chorePoints={chore.points}
                    />
                </TouchableOpacity>
            );
        });
        return <View style={styles.choreContainer}>{chores}</View>;
    };

    // TODO: use 'props.chores' to iterate over chores
    render() {
        // console.log(this.props.chores)
        return (
            <ScrollView style={styles.container}>
                {this.renderChores()}
            </ScrollView>
        );
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
