/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {DoctorBottomTabContainer} from '../navigators/DoctorBottomTabNavigator'
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class DoctorHomePage extends Component<Props> {
    render() {
        return <DoctorBottomTabContainer/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
