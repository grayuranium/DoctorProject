import React, {Component} from 'react';
import {TopTabContainer} from "../../navigators/TopTabNavigator";

type Props = {};
export default class HealthSightPage extends Component<Props> {
    constructor(props){
        super(props);
    }

    render() {
        return <TopTabContainer/>;
    }
}
