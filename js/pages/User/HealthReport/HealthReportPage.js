import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import NavigationUtil from "../../../utils/NavigationUtil";
import ViewUtil from "../../../utils/ViewUtil";
import {HEALTH_REPORT} from "../../../res/data/HealthReportItemData";

type Props = {};
const {width,height} = Dimensions.get('window');
export default class HealthReportPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            firstComein: false,
        };
        this.dataSource = HEALTH_REPORT;
    }

    renderItem(items){
        if (!items) return null;
        let views = [];
        for (let i in items){
            views.push(
                <View key={i}>
                    {ViewUtil.getIntroductionItem(()=>this.onClick(items[i]),items[i])}
                </View>
            );
        }
        return views;
    }

    onClick(item){
        NavigationUtil.GoPage(null,item.des);
    }

    render() {
        return (
            <View style={[styles.container,{}]}>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>健康体检</Text>
                    <View style={styles.title_area}>
                        <Text style={styles.title_area_title}>实时监控 最新算法</Text>
                        <Text style={styles.title_area_content}>记录您每天的健康数据 使用最新的图像理解和语义分析模型</Text>
                    </View>
                </View>
                {this.renderItem(this.dataSource)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title_container:{
        width:0.9*width,
        height:170,
        marginTop:5,
        marginBottom:5,
        backgroundColor:'#F5FCFF',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    title_text:{
        flex:1,
        paddingTop:30,
        fontSize:30,
        fontWeight: '700',
        color:'black',
    },
    title_area:{
        flex:2,
        marginTop:15,
        marginBottom:5,
        alignSelf:'stretch',
        backgroundColor:'#D8D9D9',
        justifyContent:'center',
        padding:10,
        borderRadius:10,
    },
    title_area_title:{
        fontSize:16,
        fontWeight: '300',
        color: 'black',
    },
    title_area_content:{
        fontSize:13,
    },
});
