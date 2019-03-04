import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import GLOBALS from '../constants/Globals';

export default class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 'All Chores' = 0, 'My Chores' = 1, and 'Add New' = 2
            selected: 1
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.groupContainer}>
                    <Text style={styles.groupText}>My Family</Text>
                    <Icon
                        type="font-awesome"
                        name="chevron-down"
                        color={GLOBALS.COLOR.grey}
                        containerStyle={{ paddingLeft: 10 }}
                        size={15}
                    />
                </View>
                <View style={styles.groupSelectContainer}>
                    <View style={styles.groupItem}>
                        <Icon
                            type="font-awesome"
                            name="users"
                            color={
                                this.state.selected == 0
                                    ? GLOBALS.COLOR.primaryColor
                                    : GLOBALS.COLOR.secondaryColor
                            }
                        />
                        <Text style={styles.groupItemText}>All Chores</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Icon
                            type="font-awesome"
                            name="user"
                            color={
                                this.state.selected == 1
                                    ? GLOBALS.COLOR.primaryColor
                                    : GLOBALS.COLOR.secondaryColor
                            }
                        />
                        <Text style={styles.groupItemText}>My Chores</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Icon
                            type="font-awesome"
                            name="plus"
                            color={
                                this.state.selected == 2
                                    ? GLOBALS.COLOR.primaryColor
                                    : GLOBALS.COLOR.secondaryColor
                            }
                        />
                        <Text style={styles.groupItemText}>Add New</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    groupContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
    },
    groupSelectContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    groupText: {
        color: GLOBALS.COLOR.grey,
        fontSize: GLOBALS.FONTSIZE.medium,
        paddingTop: 5,
        paddingLeft: 20
    },
    groupItemText: {
        color: GLOBALS.COLOR.grey,
        fontSize: GLOBALS.FONTSIZE.small,
        paddingTop: 5
    },
    groupItem: {
        // TODO: WHAT TO PUT HERE?
    }
});
