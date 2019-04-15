import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import firebase from 'firebase';

import ChoreBox from '../components/ChoreBox';
import Globals from '../constants/Globals';

// This Screen refers to the 'Tasks' screen
export default class MyChoresScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', // name of the user
            total_chore_points: 0,

            chores: [],
            refreshing: false,
            overlayVisible: false
        };
    }

    componentDidMount() {
        this._getUserProfile();
        this._onRefresh();
    }

    _getUserProfile = () => {
        const user = firebase.auth().currentUser;
        fetch('http://3.93.95.228/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.uid
            })
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    total_chore_points: result.total_chore_points,
                    username: result.displayName
                });
            });
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });

        const user = firebase.auth().currentUser;

        fetch('http://3.93.95.228/assigned-chores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.uid
            })
        })
            .then(res => res.json())
            .then(result => {
                let chores = Object.keys(result).map(key => {
                    return {
                        choreID: key,
                        choreInfo: result[key]
                    };
                });

                this.setState({ chores });
            })
            .then(() => {
                this.setState({ refreshing: false });
            });
    };

    _onLongPressChore = id => {
        // TODO: long press possibly show overlay display
        // this.setState({ overlayVisible: true });
    };

    _onCompleteChore = checkedChoreID => {
        console.log('called', checkedChoreID);
        const updatedChores = this.state.chores.filter(chore => {
            return chore.choreID != checkedChoreID;
        });

        fetch('http://3.93.95.228/chores/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choreID: checkedChoreID
            })
        })
            .then(() => {
                this._onRefresh();
                this._getUserProfile();
            })
            .catch(err => {
                console.log(err);
            });
    };

    renderChores = () => {
        // console.log(this.state.chores);
        // only render incomplete chores
        const incompleteChores = this.state.chores.filter(chore => {
            return !chore.choreInfo.isDone;
        });
        if (incompleteChores.length < 1) {
            return null;
        }

        const chores = incompleteChores.map((chore, index) => {
            return (
                <TouchableOpacity key={chore.choreID}>
                    <ChoreBox
                        choreID={chore.choreID}
                        choreName={chore.choreInfo.name}
                        chorePoints={chore.choreInfo.num_chore_points}
                        _onCompleteChore={this._onCompleteChore}
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.points}>
                    <Text style={styles.dashboardText}>
                        {this.state.username}'s Chore Points
                    </Text>
                    <Text style={styles.dashboardNumber}>
                        {this.state.total_chore_points}
                    </Text>
                </View>
                <View style={styles.chores}>
                <View style={styles.choreContainer}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {this.renderChores()}
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Add New"
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('Add\ New', {
                        _onRefresh: this._onRefresh
                    })}
                />
            </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    points: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dashboardText: {
        // color: Globals.COLOR.secondaryColor,
        fontSize: Globals.FONTSIZE.large
    },
    dashboardNumber: {
        color: Globals.COLOR.primaryColor,
        fontSize: Globals.FONTSIZE.extraLarge
    },
    chores: {
        flex: 3
        // backgroundColor: 'blue'
    },
    choreContainer: {
        flex: 4,
    },
    buttonContainer: {
        flex: 1,
    },
    buttonContainerStyle: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 20
    },
    buttonStyle: {
        backgroundColor: Globals.COLOR.primaryColor
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        color: '#000',
        fontWeight: 'bold',
        fontSize: Globals.FONTSIZE.medium
    }

});
