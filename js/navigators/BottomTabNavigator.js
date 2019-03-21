import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import HealthSightPage from "../pages/HealthSight/HealthSightPage";
import HealthReportPage from "../pages/HealthReport/HealthReportPage";
import UserInfoPage from "../pages/UserInfo/UserInfoPage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorCurePage from "../pages/DoctorCure/DoctorCurePage";


const Tabs = {
    HealthSightPage:{
        screen:HealthSightPage,
        navigationOptions: {
            tabBarLabel:'健康',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'fire'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    DoctorCurePage:{
        screen: DoctorCurePage,
        navigationOptions: {
            tabBarLabel:'问诊',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'doctor'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    HealthReportPage:{
        screen:HealthReportPage,
        navigationOptions: {
            tabBarLabel:'报表',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'card-text-outline'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    MyInfoPage:{
        screen:UserInfoPage,
        navigationOptions: {
            tabBarLabel:'我的',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'account'} size={26} style={{color:tintColor}}/>
            )
        }
    },
};

export const BottomTabContainer = createAppContainer(createBottomTabNavigator(Tabs,{
    initialRouteName: 'DoctorCurePage',
}));
