import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { ListItem, CheckBox } from 'react-native-elements';

import Global from '../constants/Globals';
import ChoreBox from './ChoreBox';
import Globals from '../constants/Globals';

export default class ChoresDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: [],
            refreshing: false,
            overlayVisible: false,
        };
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });

        // TODO: should we hide this later?
        fetch('http://3.93.95.228/chores?groupID=3lwsLswKyaYAaHy3VtNB')
            .then(response => response.json())
            .then(responseJson => {
                const newChores = [];
                for (const id in responseJson) {
                    const chore = responseJson[id];
                    const newChore = { ...chore, id };
                    newChores.push(newChore);
                }
                // console.log(newChores)
                this.setState({ chores: newChores });
            })
            .then(() => {
                this.setState({ refreshing: false });
            });
    };

    _onLongPressChore = id => {
        // this.setState({ overlayVisible: true });
    };

    renderChores = () => {
        const chores = this.state.chores.map((chore, index) => {
            return (
                <TouchableOpacity
                    key={chore.id}
                >
                    <ChoreBox
                        choreID={chore.id}
                        choreName={chore.name}
                        chorePoints={chore.num_chore_points}
                    />
                </TouchableOpacity>
            );
        });
        return <View>{chores}</View>;
    };

    renderOverlay = () => {
        return (
            <Overlay
                isVisible={this.state.overlayVisible}
                onBackdropPress={() => this.setState({ overlayVisible: false })}
            >
                <Text>Hello from Overlay!</Text>
            </Overlay>
        );
    };

    // TODO: use 'props.chores' to iterate over chores
    render() {
        // console.log(this.props.chores)
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                style={styles.container}
            >
                {this.renderChores()}
                
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
        marginTop: 10,
        // alignContent: 'space-between'
    },
    button: {
        width: '100%',
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        color: '#000',
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    },
});
