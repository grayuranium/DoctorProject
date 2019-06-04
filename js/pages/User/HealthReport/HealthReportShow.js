import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import HealthReportShowDialog,{TimeSpans} from '../../../common/Components/HealthReportShowDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {};
const THEME_COLOR = '#678';
export default class HealthReportShow extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            timeSpan:TimeSpans[0],
        };
    }

    componentDidMount(){
        this.loadData(this.state.timeSpan.searchText);
    }

    loadData(timespan){
        // fetch('http://'+global.service.local_url+':8080/EfficientDr/login',{
        //     method:'POST',
        //     credentials:'include',
        //     headers:{
        //         'Content-Type':'application/json;charset=UTF-8',
        //     },
        //     body:json_data,
        // }).then((response)=>{
        //     if (response.ok){
        //         return response.json();
        //     }
        //     throw new Error ('Network response was not ok.');
        // }).then((responseData)=>{
        //     if (responseData.status===1){
        //         global.cookies.cookie = responseData.cookie.toString();
        //         return responseData.InfoKey;
        //     }else if(responseData.status===0){
        //         throw new Error ('Password is wrong.')
        //     }else {
        //         throw new Error ('User do not exist.')
        //     }
        // }).then((info)=>{
        //     if (this.state.type==0){
        //         global.userinfo.accid = info.uaccid;
        //         global.userinfo.name = info.uname;
        //         global.userinfo.id = info.userid;
        //         global.userinfo.phonenum = info.uphonenum;
        //     } else {
        //         global.doctorinfo.accid = info.daccid;
        //         global.doctorinfo.id = info.doctorid;
        //         global.doctorinfo.phonenum = info.dphonenum;
        //         global.doctorinfo.hospital = info.dhospital;
        //         global.doctorinfo.headpho = info.dheadpho;
        //         global.doctorinfo.hospitaldepartmentid = info.dhospitaldepartmentid;
        //     }
        //     navigation.navigate(this.state.type==0?'AppUserHome':'AppDoctorHome');
        // }).catch((error)=>{
        //     this.refs.toast.show('ERROR:'+error.toString()+'请重新登录');
        // })
    }

    renderTitleView(){
        return <View>
            <TouchableOpacity
                upderlayColor = {'transparent'}
                onPress={()=>this.dialog.show()}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color:'black'}}
                    />
                    <Text style={{fontSize: 18,color:'black',fontWeight: '400'}}>{this.state.timeSpan.showText}健康评估</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }

    onSelectTimeSpan(tab){
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab,
        });
    }

    renderDialog(){
        return <HealthReportShowDialog
            ref={dialog=>this.dialog=dialog}
            onSelect={tab=>this.onSelectTimeSpan(tab)}
        />
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title={this.renderTitleView()}
                />
                <View style={[styles.container,{justifyContent: 'center',}]}>
                    <Text style={styles.welcome}>welcome to HealthReportShow!</Text>
                </View>
                {this.renderDialog()}
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
