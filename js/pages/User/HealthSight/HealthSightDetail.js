import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import DateUtil from "../../../utils/DateUtil";
import {DOCTOR_OFFICE_MENU} from "../../../res/data/DoctorOfficeMenuData";

type Props = {};
const Dimensions = require('Dimensions');
const {width,height} = Dimensions.get('window');
export default class HealthSightDetail extends Component<Props> {

    constructor(props) {
        super(props);
        const {dscontent,dsdoctorname,dsimgurl,dskeyword,dstitle,dslastupdatetstamp} = this.props.navigation.state.params;
        this.dscontent = dscontent
        this.dsdoctorname = dsdoctorname
        this.dsimgurl = dsimgurl
        this.dskeyword = dskeyword
        this.dstitle = dstitle
        this.dslastupdatetstamp = DateUtil.getLocalTime(dslastupdatetstamp)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='详情'
                />
                <View style={[styles.container]}>
                    <Text style={styles.doc_title}>{this.dstitle}</Text>
                    <Text style={styles.doc_keywords}>{this.dskeyword}</Text>
                    <Image
                        source={{uri:'data:image/jpeg;base64,'+this.dsimgurl}}
                        style={styles.doc_img}
                    />
                    <Text style={styles.doc_content}>{this.dscontent}</Text>
                    <Text style={styles.doc_name}>作者：{this.dsdoctorname}</Text>
                    <Text style={styles.doc_timestamp}>更新时间：{this.dslastupdatetstamp}</Text>
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
    doc_title:{
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    doc_keywords:{
        fontSize:20,
        fontStyle:'italic',
        textAlign:'left',
        color:'#ff6600',
        margin:10,
    },
    doc_content:{
        fontSize:16,
        textAlign:'left',
        margin:10,
    },
    doc_img:{
        height:200,
        width:0.9*width,
    },
    doc_name:{
        fontSize:12,
        textAlign:'right',
        color:'#6F6F6F',
        margin:10,
    },
    doc_timestamp:{
        fontSize:12,
        textAlign:'right',
        color:'#6F6F6F',
        margin:10,
    },
});
