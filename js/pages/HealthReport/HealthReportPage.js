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
import NavigationUtil from "../../utils/NavigationUtil";

type Props = {};
export default class HealthReportPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            firstComein:false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={'填写健康报表'} onPress={()=>{
                    NavigationUtil.GoPage(null,'HealthReportForm')
                }}/>
                <Button disabled={this.state.firstComin} title={'查看健康评估'} onPress={()=>{
                    NavigationUtil.GoPage(null,'HealthReportShow')
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
