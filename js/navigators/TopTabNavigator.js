import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {HealthSightTabWithRedux} from "../pages/HealthSight/HealthSightTab";

const TABS = {};
const TAB_Names = ['儿科','男科','内科','外科','妇科','产科'];

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