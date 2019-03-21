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
