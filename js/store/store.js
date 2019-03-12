import {navMiddleware} from "../navigators/AppNavigator";
import {applyMiddleware,createStore} from 'redux'
// import thunk from 'redux-thunk';
import appReducer from "../reducers";

//自定义中间件（我的debug调试有点问题，慎用）
// const logger = store => next => action =>{
//     if (typeof action==='function'){
//         console.log('dispatching a function');
//     }else {
//         console.log('dispatching',action);
//     }
//     console.log('nextState',store.getState());
// };

const middlewares = [
    navMiddleware,
    // logger,
    //thunk,
];

export default createStore(appReducer,applyMiddleware(...middlewares));