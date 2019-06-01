import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {HealthSightTabWithRedux} from "../pages/User/HealthSight/HealthSightTab";

const TABS = {};
const TAB_Names = [global.department[0],global.department[1],global.department[2],global.department[3]];

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