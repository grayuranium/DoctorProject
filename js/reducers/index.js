import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux'
import {AppNav} from "../navigators/AppNavigator";

//自动创建navigation的reducer
const navReducer = createNavigationReducer(AppNav);

const appReducer = combineReducers({
    nav:navReducer,
})

export default appReducer;
