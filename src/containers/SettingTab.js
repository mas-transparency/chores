import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';

import Globals from '../constants/Globals';

import AllGroupsScreen from '../screens/AllGroupsScreen';
import AddNewGroupScreen from '../screens/AddNewGroupScreen';

export default class SettingTab extends Component {
    render() {
        return <AppContainer />;
    }
}

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // FIXME: dummy groups for now
            selected: -1
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.cardsContainer}>
                    <ListItem
                        onPress={() => this.props.navigation.navigate('AllGroupsScreen')}
                        title='Groups'
                        rightTitle='>'
                        // onPress={() => {this._changeView()}
                    />
                    <ListItem
                        title='Notifications'
                        rightTitle='>'
                    />
                </View>
            </ScrollView>
        );
    }
}

const TabNavigator = createMaterialTopTabNavigator(
    {
        Setting: {
            screen: createStackNavigator({
                HomeScreen: {
                    screen: HomeScreen,
                    navigationOptions: {
                        header: null 
                    }
                },
                AllGroupsScreen: {
                    screen: createStackNavigator({
                        AllGroupsScreen: {
                            screen: AllGroupsScreen,
                            navigationOptions: {
                                header: null 
                            }
                        },
                        AddNewGroupScreen: {
                            screen: AddNewGroupScreen,
                            navigationOptions: {
                                header: null 
                            }
                        },
                    }), 
                    navigationOptions: {
                        header: null 
                    }
                }
            })
        }
    },
    {
        initialRouteName: 'Setting',
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#000',
            style: {
                backgroundColor: '#fbfbfb',
            },
            tabStyle: {
                height: 80,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }
        }
    },
);

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // marginVertical: 20,
        // paddingLeft: 20
    },
    headerText: {
        // color: Globals.COLOR.secondaryColor,
        // fontWeight: 'bold',
        // fontSize: Globals.FONTSIZE.medium
    },
    cardsContainer: {
        flex: 10,
        alignContent: 'space-between'
    },
    feedCard: {
        backgroundColor: '#fff',
        marginBottom: 10,
    },
});
