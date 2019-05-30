import React, {Component} from 'react';
import {StyleSheet, Text, View,FlatList,Dimensions,Image} from 'react-native';
import Toast from 'react-native-easy-toast';
import Swiper from 'react-native-swiper';
import NavigationUtil from "../../../utils/NavigationUtil";
import {DOCTOR_OFFICE_MENU} from "../../../res/data/DoctorOfficeMenuData";
import ViewUtil from "../../../utils/ViewUtil";

type Props = {};
const {width,height} = Dimensions.get('window');
export default class DoctorCurePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.dataSource = DOCTOR_OFFICE_MENU;
    }

    onClick(data){
        NavigationUtil.GoPage({officeName:data.name},'DoctorCureList');
    }

    renderItem(item){
        return ViewUtil.getDoctorOfficeMenuItem(()=>this.onClick(item),item);
    }

    render() {
        return (
            <View style={styles.doctorCureContainer}>
                <Swiper
                    height={0.3*height}
                    style={styles.wrapper}
                    showsButtons={true}
                    autoplay={true}
                >
                    <View style={styles.slide}>
                        <Image resizeMode={'stretch'} style={styles.swiper_img} source={require('../../../res/bitmap/swiper1.jpg')}/>
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode={'stretch'} style={styles.swiper_img} source={require('../../../res/bitmap/swiper2.jpg')}/>
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode={'stretch'} style={styles.swiper_img} source={require('../../../res/bitmap/swiper3.jpg')}/>
                    </View>
                </Swiper>
                <View style={{backgroundColor:'#DEEDED',height:30,alignItems: 'center',justifyContent: 'center',borderRadius:20, margin:5}}>
                    <Text style={{color:'black',}}>请选择您要问诊的科室</Text>
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
    doctorCureContainer: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF',
    },
    grade_container:{
        backgroundColor: '#F5FCFF',
        padding:10,
    },
    wrapper: {
    },
    slide:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    swiper_img:{
        flex: 1,
        width:width,
    },
});
