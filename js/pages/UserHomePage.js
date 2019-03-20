import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {BottomTabContainer} from '../navigators/BottomTabNavigator'
import NavigationUtil from "../utils/NavigationUtil";

type Props = {};
export default class UserHomePage extends Component<Props> {
    constructor(props){
        super(props);
        console.disableYellowBox = true;
        const {navigation} = this.props;
        NavigationUtil.navigation = navigation;
    }

    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
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
