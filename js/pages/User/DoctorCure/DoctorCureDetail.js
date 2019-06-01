import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from "react-redux";
import NavigationUtil from "../../../utils/NavigationUtil";
import {DOCTOR_OFFICE_MENU} from "../../../res/data/DoctorOfficeMenuData";
import NaviBar from 'react-native-pure-navigation-bar';

type Props = {};
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
                    <Text>{this.dname}</Text>
                    <Text>{this.dhospital}</Text>
                    <Text>{this.dhospitaldepartment}</Text>
                    <Text>{this.dtitle}</Text>
                    <Text>{this.dphonenum}</Text>
                    <Button
                        title={'开始问诊'}
                        type={'solid'}
                        onPress={()=>{
                            NavigationUtil.GoPage({doctorid:this.doctorid,onlineTocken:this.onlineTocken},'DoctorCureTalk');
                        }}
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
