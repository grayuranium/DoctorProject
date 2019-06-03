import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from "react-redux";
import NavigationUtil from "../../../utils/NavigationUtil";
import {DOCTOR_OFFICE_MENU} from "../../../res/data/DoctorOfficeMenuData";
import NaviBar from 'react-native-pure-navigation-bar';

type Props = {};
const Dimensions = require('Dimensions');
const {width,height} = Dimensions.get('window');
export default class DoctorCureDetail extends Component<Props> {
    constructor(props){
        super(props);
        const {onlineTocken,doctorid,dheadpho,dhospital,dhospitaldepartmentid,dname,dtitle,dphonenum} = this.props.navigation.state.params;
        this.onlineTocken = onlineTocken;
        this.doctorid = doctorid;
        this.dheadpho = dheadpho;//医生头像
        this.dhospital = dhospital;
        this.dhospitaldepartment = DOCTOR_OFFICE_MENU[dhospitaldepartmentid-1].name;
        this.dname = dname;
        this.dtitle = dtitle;
        this.dphonenum = dphonenum;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='医生信息'
                />
                <View style={styles.container}>
                    <Text style={styles.doc_name}>姓名：{this.dname}</Text>
                    <Text style={styles.doc_dtitle}>职称：{this.dtitle}</Text>
                    <Text style={styles.doc_hospital}>所属医院：{this.dhospital}</Text>
                    <Text style={styles.doc_dhospitaldepartment}>所属科室：{this.dhospitaldepartment}</Text>
                    <Text style={styles.doc_dphonenum}>联系电话：{this.dphonenum}</Text>
                    <Button
                        title={'开始问诊'}
                        type={'solid'}
                        onPress={()=>{
                            NavigationUtil.GoPage({onlineTocken:this.onlineTocken,dname:this.dname},'DoctorCureTalk');
                        }}
                        buttonStyle={{width:0.8*width, marginLeft:0.1*width}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    doc_name:{
        fontSize: 20,
        margin:10,
    },
    doc_hospital:{
        fontSize: 20,
        margin:10,
    },
    doc_dhospitaldepartment:{
        fontSize: 20,
        margin:10,
    },
    doc_dtitle:{
        fontSize: 20,
        margin:10,
    },
    doc_dphonenum:{
        fontSize: 20,
        margin:10,
    },
});
