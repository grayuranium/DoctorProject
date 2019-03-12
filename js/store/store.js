import {navMiddleware} from "../navigators/AppNavigator";
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk';
import appReducer from "../reducers";

//自定义中间件
const logger = store => next => action =>{
    if (typeof action==='function'){
        console.log('dispatching a function');
    }else {
        console.log('dispatching',action);
    }
    const result = next(action);
    console.log('nextState',store.getState());
    return result;
};

const middlewares = [
    navMiddleware,
    logger,
    thunk,
];

export default createStore(appReducer,applyMiddleware(...middlewares));