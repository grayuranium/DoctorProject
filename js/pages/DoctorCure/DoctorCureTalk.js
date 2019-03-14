/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class DoctorCureTalk extends Component<Props> {
    constructor(props){
        super(props);
        const {doctorId} = this.props.navigation.state.params;
        this.doctorId = doctorId;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to {this.doctorId}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
