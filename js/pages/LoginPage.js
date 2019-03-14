/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

type Props = {};
export default class LoginPage extends Component<Props> {
    constructor(props){
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to DoctorProject!</Text>
                <Button title={'login'} onPress={()=>{
                    if (true){
                        navigation.navigate('AppUserHome');
                    } else {
                        navigation.navigate('AppDoctorHome');
                    }
                }}/>
                <Button title={'register'} onPress={()=>{
                    navigation.navigate('Register');
                }}/>
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
