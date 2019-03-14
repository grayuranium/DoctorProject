import {createStackNavigator,createAppContainer} from 'react-navigation';
import {TopTabContainer} from "./TopTabNavigator";
import HealthSightDetail from '../pages/HealthSight/HealthSightDetail'

export const HealthSightNavContainer = createAppContainer(createStackNavigator({
    HealthSightHome:{
        screen:TopTabContainer,
        navigationOptions: {
            header: null,
        },
    },
    HealthSightDetail:{
        screen:HealthSightDetail,
    },
},{
    initialRouteName:'HealthSightHome',
}))