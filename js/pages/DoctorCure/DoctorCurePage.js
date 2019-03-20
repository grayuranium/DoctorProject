import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import DoctorCureItem from '../../common/DoctorCureItem'
import Toast from 'react-native-easy-toast';
import NavigationUtil from "../../utils/NavigationUtil";
import DoctorCureListItem from "../../common/DoctorCureListItem";

type Props = {};
const OFFICE_NAME = ['Java','儿科','皮肤性病科','内科','男科','产科','外科','中医科','骨伤科','精神心理科','口腔颌面科','眼科','耳鼻咽喉科','肿瘤及防治科','整形美容科','营养科'];

export default class DoctorCurePage extends Component<Props> {
    constructor(props){
        super(props);
        this.officeName = OFFICE_NAME;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.page_title}>
                    <Text style={styles.page_title_font}>请选择您想咨询的科室！</Text>
                </View>
                <View style={styles.grade_container}>
                    <View style={styles.row_container}>
                        <DoctorCureItem officeName={this.officeName[0]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[0],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[1]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[1],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[2]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[2],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[3]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[3],},'DoctorCureList')
                        }}/>
                    </View>
                    <View style={styles.row_container}>
                        <DoctorCureItem officeName={this.officeName[4]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[4],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[5]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[5],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[6]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[6],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[7]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[7],},'DoctorCureList')
                        }}/>
                    </View>
                    <View style={styles.row_container}>
                        <DoctorCureItem officeName={this.officeName[8]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[8],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[9]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[9],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[10]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[10],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[11]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[11],},'DoctorCureList')
                        }}/>
                    </View>
                    <View style={styles.row_container}>
                        <DoctorCureItem officeName={this.officeName[12]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[12],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[13]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[13],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[14]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[14],},'DoctorCureList')
                        }}/>
                        <DoctorCureItem officeName={this.officeName[15]} onSelect={()=>{
                            NavigationUtil.GoPage({officeName:this.officeName[15],},'DoctorCureList')
                        }}/>
                    </View>
                </View>
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    page_title:{
        flex:1,
        backgroundColor: '#678',
    },
    page_title_font:{
        fontSize:20,
        marginTop:6,
        marginBottom:6,
    },
    grade_container:{
        flex:8,
        backgroundColor: '#F5FCFF',
        padding:10,
    },
    row_container:{
        flex:0.25,
        flexDirection:'row',
        backgroundColor: '#F5FCFF',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:5,
        paddingTop:5,
    },
});
