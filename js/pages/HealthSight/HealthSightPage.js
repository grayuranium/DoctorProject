import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {HealthSightNavContainer} from '../../navigators/HealthSightNavigator';

type Props = {};
export default class HealthSightPage extends Component<Props> {
    constructor(props){
        super(props);
    }

    render() {
        return <HealthSightNavContainer/>;
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
