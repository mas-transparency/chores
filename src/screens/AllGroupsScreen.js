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

export default class AllGroupsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy groups for now
            groups: [
                {
                    id: 0,
                    name: 'test group name',
                    roommates: ['mj', 'michael', 'kevin', 'jessica']
                }
            ]
        };
    }
    renderGroups = () => {
        const groups = this.state.groups.map((group, index) => {
            return <TouchableOpacity onPress={() => this._onPressGroup} />;
        });
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>All Group Screen</Text>
            </View>
        );
    }
}
