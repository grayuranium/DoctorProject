import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import HealthSightTab from "../pages/HealthSightTab";

const TABS = {};
const TAB_Names = ['儿科','内科','骨科','耳鼻喉科','妇科','外科'];

TAB_Names.forEach((item,index)=>{
    TABS[`tab${index}`] = {
        screen: HealthSightTab,
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