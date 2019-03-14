import {createSwitchNavigator,createStackNavigator} from 'react-navigation';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DoctorHomePage from "../pages/DoctorHomePage";
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {DoctorCureNavContainer} from "./DoctorCureNavigator";
import {HealthSightNavContainer} from "./HealthSightNavigator";
import UserHomePage from "../pages/UserHomePage";

const AppWelcomeNav = createStackNavigator({
    Login:{
        screen:LoginPage,
        navigationOptions:{
            header:null,
        },
    },
    Register:{
        screen: RegisterPage,
        navigationOptions: {
            header: null,
        },
    },
})

const AppUserHomeNav = createStackNavigator({
    UserHome:{
        screen:UserHomePage,
        navigationOptions: {
            header: null,
        },
    },
    HealthSight:{
        screen:HealthSightNavContainer,
    },
    DoctorCure:{
        screen:DoctorCureNavContainer,
    },
},{
    initialRouteName: 'UserHome',
})

const AppDoctorHomeNav = createStackNavigator({
    DoctorHome:{
        screen:DoctorHomePage,
        navigationOptions: {
            header: null,
        },
    },
},{
    initialRouteName: 'DoctorHome',
})

export const AppNav = createSwitchNavigator({
    AppWelcome:{
        screen:AppWelcomeNav,
    },
    AppUserHome:{
        screen:AppUserHomeNav,
    },
    AppDoctorHome:{
        screen:AppDoctorHomeNav,
    },
},{
    initialRouteName:'AppWelcome',
})

//中间件，用于让react-navigation识别state中的导航的action的，注意，Middleware的创建一定要在包装前
export const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const AppReduxContainer = createReduxContainer(AppNav);

//将导航的action放入全局state中
const mapStateToProps = (state) => ({
    state: state.nav,
});

export const AppReduxWithNavigation = connect(mapStateToProps)(AppReduxContainer);