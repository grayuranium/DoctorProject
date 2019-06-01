import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import NaviBar,{InnerNaviBar} from 'react-native-pure-navigation-bar';
import DateUtil from "../../../utils/DateUtil";
import {DOCTOR_OFFICE_MENU} from "../../../res/data/DoctorOfficeMenuData";

//修改三方导航栏的全局设置
InnerNaviBar.defaultProps.titleCenter=true;
InnerNaviBar.defaultProps.hasSeperatorLine=true;
InnerNaviBar.defaultProps.autoCloseKeyboard=true;
InnerNaviBar.defaultProps.autoHardwareBack=true;
InnerNaviBar.defaultProps.gobackText='返回';

type Props = {};
export default class HealthSightDetail extends Component<Props> {
    constructor(props) {
        super(props);
        const {dscontent,dsdoctorname,dsimgurl,dskeyword,dstitle,dslastupdatetstamp} = this.props.navigation.state.params;
        this.dscontent = dscontent
        this.dsdoctorname = dsdoctorname
        this.dsimgurl = dsimgurl
        this.dskeyword = dskeyword
        this.dstitle = dstitle
        this.dslastupdatetstamp = dslastupdatetstamp.toString()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='详情'
                />
                <View style={[styles.container]}>
                    <Text>{this.dstitle}</Text>
                    <Text>{this.dscontent}</Text>
                    <Text>{this.dskeyword}</Text>
                    <Image
                        source={{uri:this.dsimgurl}}
                        style={{height:100,width:100}}
                    />
                    <Text>{this.dsdoctorname}</Text>
                    <Text>{this.dslastupdatetstamp}</Text>
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
