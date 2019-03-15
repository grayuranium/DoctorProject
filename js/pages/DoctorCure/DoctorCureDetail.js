/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import NavigationUtil from "../../utils/NavigationUtil";

type Props = {};
class DoctorCureDetail extends Component<Props> {
    constructor(props){
        super(props);
        const {doctorId,officeName} = this.props.navigation.state.params;
        this.doctorId = doctorId;
        this.officeName = officeName;
    }

    loadData(){
        const {doctorcure} = this.props;
        let dataStore = doctorcure[this.officeName];
        if(!dataStore){
            dataStore = {
                items:[],
                isLoading:false,
                projectModes:[],//要显示的数据
                hideLoadingMore:true,
            }
        }
        let dataItems = dataStore.items;
        let dataItem = null;
        dataItems.forEach((item,index)=>{
            if (item.id===this.doctorId){
                dataItem = item;
            }
        });
        return dataItem;
    }

    render() {
        let doctorData = this.loadData();
        const {navigation} = this.props;
        let doctorDetail = doctorData.description;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{doctorDetail}</Text>
                <Text style={styles.welcome} onPress={()=>{
                    NavigationUtil.GoPage({doctorData:doctorData},'DoctorCureTalk');
                }}>开始问诊</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    doctorcure: state.doctorcure,
});

export const DoctorCureDetailWithRedux = connect(mapStateToProps)(DoctorCureDetail);

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
