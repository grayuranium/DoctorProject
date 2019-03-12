import {createSwitchNavigator,createStackNavigator,createAppContainer} from 'react-navigation';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DoctorHomePage from "../pages/DoctorHomePage";
import UserHomePage from "../pages/UserHomePage";
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";

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

const AppHomeNav = createStackNavigator({
    DoctorHome:{
        screen:DoctorHomePage,
        navigationOptions: {
            header: null,
        },
    },
    UserHome:{
        screen:UserHomePage,
        navigationOptions: {
            header: null,
        },
    },
},{
    initialRouteName: 'UserHome',
})

export const AppNav = createSwitchNavigator({
    AppWelcome:{
        screen:AppWelcomeNav,
    },
    AppHome:{
        screen:AppHomeNav,
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