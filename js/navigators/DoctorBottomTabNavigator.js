import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorCurePage from "../pages/User/DoctorCure/DoctorCurePage";
import DoctorInfoPage from "../pages/Doctor/DoctorInfo/DoctorInfoPage";
import HealthSightUpdatePage from "../pages/Doctor/HealthSightUpdate/HealthSightUpdatePage";
import PatientCurePage from "../pages/Doctor/PatientCure/PatientCurePage";


const Tabs = {
    HealthSightUpdatePage:{
        screen:HealthSightUpdatePage,
        navigationOptions: {
            tabBarLabel:'健康',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'fire'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    PatientCurePage:{
        screen: PatientCurePage,
        navigationOptions: {
            tabBarLabel:'问诊',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'doctor'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    DoctorInfoPage:{
        screen:DoctorInfoPage,
        navigationOptions: {
            tabBarLabel:'我的',
            tabBarIcon:(tintColor,focused)=>(
                <MaterialCommunityIcons name={'account'} size={26} style={{color:tintColor}}/>
            )
        }
    },
};

export const DoctorBottomTabContainer = createAppContainer(createBottomTabNavigator(Tabs,{
    initialRouteName: 'HealthSightUpdatePage',
}));
