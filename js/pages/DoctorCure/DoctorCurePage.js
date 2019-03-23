import React, {Component} from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import Toast from 'react-native-easy-toast';
import NavigationUtil from "../../utils/NavigationUtil";
import {DOCTOR_OFFICE_MENU} from "../../res/data/DoctorOfficeMenuData";
import ViewUtil from "../../utils/ViewUtil";

type Props = {};

export default class DoctorCurePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.dataSource = DOCTOR_OFFICE_MENU;
    }

    onClick(data){
        NavigationUtil.GoPage({officeName:data.name},'DoctorCureList');
    }

    renderItem(item){
        return ViewUtil.getDoctorOfficeMenuItem(()=>this.onClick(item),item,null);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.page_title}>
                    <Text style={styles.page_title_font}>请选择您想咨询的科室！</Text>
                </View>
                <View style={styles.grade_container}>
                    <FlatList
                        data={this.dataSource}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={item=>item.id+""}
                        horizontal={false}
                        numColumns={4}
                    />
                </View>
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    page_title:{
        flex:1,
        backgroundColor: '#678',
    },
    page_title_font:{
        fontSize:20,
        marginTop:6,
        marginBottom:6,
    },
    grade_container:{
        flex:8,
        backgroundColor: '#F5FCFF',
        padding:10,
    },
    row_container:{
        flex:0.25,
        flexDirection:'row',
        backgroundColor: '#F5FCFF',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:5,
        paddingTop:5,
    },
});
