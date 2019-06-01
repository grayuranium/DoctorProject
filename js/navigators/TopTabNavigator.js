import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {DOCTOR_OFFICE_MENU} from '../res/data/DoctorOfficeMenuData'
import {HealthSightTabWithRedux} from "../pages/User/HealthSight/HealthSightTab";

const TABS = {};
const TAB_Names = [DOCTOR_OFFICE_MENU[0].name,DOCTOR_OFFICE_MENU[1].name,DOCTOR_OFFICE_MENU[2].name,DOCTOR_OFFICE_MENU[3].name];

TAB_Names.forEach((item,index)=>{
    TABS[`tab${index}`] = {
        screen: props=><HealthSightTabWithRedux {...props} tabLabel={item}/>,
        navigationOptions:{
            title:item,
        },
    }
});

export const TopTabContainer = createAppContainer(createMaterialTopTabNavigator(TABS,{
    initialRouteName:'tab1',
    tabBarOptions :{
        upperCaseLabel:false,
        scrollEnabled:true,
        style:{
            backgroundColor: '#678',
        },
        indicatorStyle:{
            height:2,
            backgroundColor:'white',
        },
        labelStyle:{
            fontSize:13,
            marginTop:6,
            marginBottom:6,
        },
    },
}));