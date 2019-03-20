import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import HealthReportShowDialog,{TimeSpans} from '../../common/HealthReportShowDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {};
const THEME_COLOR = '#678';
export default class HealthReportShow extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            timeSpan:TimeSpans[0],
        };
    }

    renderTitleView(){
        return <View>
            <TouchableOpacity
                upderlayColor = {'transparent'}
                onPress={()=>this.dialog.show()}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color:'black'}}
                    />
                    <Text style={{fontSize: 18,color:'black',fontWeight: '400'}}>{this.state.timeSpan.showText}健康评估</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }

    onSelectTimeSpan(tab){
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab,
        });
    }

    renderDialog(){
        return <HealthReportShowDialog
            ref={dialog=>this.dialog=dialog}
            onSelect={tab=>this.onSelectTimeSpan(tab)}
        />
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title={this.renderTitleView()}
                />
                <View style={styles.container}>
                    <Text style={styles.welcome}>welcome to HealthReportShow!</Text>
                </View>
                {this.renderDialog()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
