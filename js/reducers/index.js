import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import healthSightReducer from './healthsight';
import healthSightUpdateReducer from './healthsightupdate'
import doctorCureReducer from './doctorcure';
import {AppNav} from "../navigators/AppNavigator";

//自动创建navigation的reducer
const navReducer = createNavigationReducer(AppNav);

const appReducer = combineReducers({
    nav:navReducer,
    healthsight:healthSightReducer,
    healthsightupdate:healthSightUpdateReducer,
    doctorcure:doctorCureReducer,
})

export default appReducer;
