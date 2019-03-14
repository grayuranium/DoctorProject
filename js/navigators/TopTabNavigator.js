import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {HealthSightTabWithRedux} from "../pages/HealthSight/HealthSightTab";

const TABS = {};
const TAB_Names = ['java','python','android','django','妇科','外科'];

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