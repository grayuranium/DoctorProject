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
import NavigationUtil from "../utils/NavigationUtil";
import BackPressComponent from "../common/Components/BackPressComponent";

type Props = {};
export default class DoctorHomePage extends Component<Props> {
    constructor(props){
        super(props);
        const {navigation} = this.props;
        NavigationUtil.navigation = navigation;
    }

    componentWillMount(){
        //websocket建立连接
        let cookie = global.cookies.cookie.split('=')[1];
        global.ws = new WebSocket('ws://'+global.service.local_url+':8080/EfficientDr/websocket?cookie='+cookie);
        //回调函数
        global.ws.onopen = () => {
            // 打开一个连接
            console.log('连接成功！');
        };
        global.ws.onerror = (e) => {
            //连接发生错误
            console.log('连接错误！Error:'+ e.toString());
        };
        global.ws.onclose = () => {
            //连接被关闭
            console.log('连接关闭！');
        }
    }

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
