import {createAppContainer,createStackNavigator} from 'react-navigation';
import DoctorCureGradeshow from "../pages/DoctorCure/DoctorCureGradeshow";
import DoctorCureDetail from "../pages/DoctorCure/DoctorCureDetail";
import DoctorCureTalk from "../pages/DoctorCure/DoctorCureTalk";
import {DoctorCureListWithRedux} from "../pages/DoctorCure/DoctorCureList";

export const DoctorCureNavContainer = createAppContainer(createStackNavigator({
    DoctorCureHome:{
        screen:DoctorCureGradeshow,
        navigationOptions: {
            header: null,
        },
    },
    DoctorCureList:{
        screen: DoctorCureListWithRedux,
    },
    DoctorCureDetail:{
        screen:DoctorCureDetail,
    },
    DoctorCureTalk:{
        screen:DoctorCureTalk,
    },
},{
    initialRouteName:'DoctorCureHome',
}));