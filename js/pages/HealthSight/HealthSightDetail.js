import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NaviBar,{InnerNaviBar} from 'react-native-pure-navigation-bar';

//修改三方导航栏的全局设置
InnerNaviBar.defaultProps.titleCenter=true;
InnerNaviBar.defaultProps.hasSeperatorLine=true;
InnerNaviBar.defaultProps.autoCloseKeyboard=true;
InnerNaviBar.defaultProps.autoHardwareBack=true;
InnerNaviBar.defaultProps.gobackText='返回';

type Props = {};
export default class HealthSightDetail extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='详情'
                />
                <View style={[styles.container,{justifyContent: 'center',}]}>
                    <Text style={styles.welcome}>Welcome to HealthSightDetail!</Text>
                </View>
            </View>
        );
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
