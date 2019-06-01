import React, {Component} from 'react';
import {BottomTabContainer} from '../navigators/BottomTabNavigator'
import {NavigationActions} from "react-navigation";
import BackPressComponent from "../common/Components/BackPressComponent";
import NavigationUtil from "../utils/NavigationUtil";

type Props = {};
export default class UserHomePage extends Component<Props> {
    constructor(props){
        super(props);
        const {navigation} = this.props;
        NavigationUtil.navigation = navigation;
        this.backPress = new BackPressComponent({backPress:this.onBackPress});
    }

    componentDidMount(){
        this.backPress.componentDidMount();
    }

    componentWillMount(){
        //websocket建立连接
        let cookie = global.cookies.cookie.split('=')[1];
        global.ws = new WebSocket('ws://'+global.service.local_url+':8080/EfficientDr/websocket?cookie='+cookie);
        //回调函数
        global.ws.onopen = (e) => {
            // 打开一个连接
            console.log('连接成功！WebSocket' + e.toString());
        };
        global.ws.onerror = (e) => {
            //连接发生错误
            console.log('连接错误！Error:'+ e.toString());
        };
        global.ws.onclose = (e) => {
            //连接被关闭
            console.log('连接关闭！Close:'+ e.toString());
        }
    }

    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }

    /**
     * 处理物理按键事件,返回homepage
     * @returns {boolean}
     */
    onBackPress = ()=>{
        const {nav} = this.props;
        if (nav.routes[1].index===0){
            return false;//这里有BUG
        }
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }

    render() {
        return <BottomTabContainer/>;
    }
}
