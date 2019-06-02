/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import NaviBar from 'react-native-pure-navigation-bar';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import ViewUtil from "../../../utils/ViewUtil";
import NavigationUtil from "../../../utils/NavigationUtil";

type Props = {};
export default class PatientCurePage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            data:[{
                senderaccid:'测试用户',
                sendertoken:'用户token',
                content:'内容',
            },],
        };
        global.ws.onmessage = (e)=>{
            let msg = e.data;
        }
    }

    renderItem(item){
        return ViewUtil.getUserListItem(()=>this.onClick(item),item);
    }

    onClick(item){
        // NavigationUtil.GoPage(item,'DoctorCureDetail');
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NaviBar
                    title='用户消息'
                />
                <View style={[styles.container,{justifyContent: 'center',}]}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={item=>item.id+""}
                    />
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
