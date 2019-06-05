import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import {Echarts, echarts} from 'react-native-secharts';
import HealthReportShowDialog,{TimeSpans} from '../../../common/Components/HealthReportShowDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {};
const THEME_COLOR = '#678';
const Dimensions = require('Dimensions');
const {width,height} = Dimensions.get('window');
const OPTION = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['个人数据（Individual）', '平均数据（Average）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '饮水（water）', max: 10},
            { name: '睡眠（sleep）', max: 10},
            { name: '运动（activity）', max: 10},
            { name: '精力（energy）', max: 10},
            { name: '心情（mood）', max: 10},
            { name: '排泄（excretion）', max: 10}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4.3, 10, 2.8, 6, 7, 3.5],
                name : '个人数据（Individual）'
            },
            {
                value : [5, 9, 5, 5, 7, 4],
                name : '平均数据（Average）'
            }
        ]
    }]
};
export default class HealthReportShow extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            timeSpan:TimeSpans[0],
            isshow:false,
        };
    }

    componentDidMount(){
        setTimeout(()=>this.setState({
            isshow:true,
        }),2000);
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
                {this.state.isshow?<View style={styles.container}>
                    <View style={{marginBottom:10}}>
                        <Text style={styles.title}>您属于({global.userhealthtype})类型人群</Text>
                        <Text style={styles.sub_title}>此类型人群的平均体质与您的体质数据如下</Text>
                    </View>
                    <View style={{marginBottom:10}}>
                        <Text style={styles.content}>平均身高：{global.grouphealthdata.height}cm</Text>
                        <Text style={styles.content}>平均体重：{global.grouphealthdata.weight}kg</Text>
                    </View>
                    <Echarts option={OPTION} height={400} width={width}/>
                </View>:null}
                {this.renderDialog()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
    },
    sub_title:{
        fontSize:18,
        fontWeight:'normal',
        fontStyle:'italic',
    },
    content:{
        fontSize:18,
        fontWeight:'normal',
    },
});
