import React, {Component} from 'react';
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
    /**
     * 左侧返回按钮
     * @param callBack
     * @returns {*}
     */
    static getLeftBackButton(callBack){
        return <TouchableOpacity
            style={{padding:8,paddingLeft:12}}
            onPress={callBack}
        >
            <Feather
                name={'arrow-left'}
                size={26}
                style={{color:'white'}}
            />
        </TouchableOpacity>;
    }

    /**
     * 分享按钮
     * @param callBack
     * @returns {*}
     */
    static getShareButton(callBack){
        return <TouchableOpacity
            style={{padding:8,paddingLeft:12}}
            onPress={callBack}
        >
            <AntDesign
                name={'sharealt'}
                size={26}
                style={{opacity:0.9,marginRight:10,color: 'white'}}
            />
        </TouchableOpacity>;
    }

    /**
     * 用户信息栏的Item
     * @param callBack
     * @param text
     * @param color
     * @param Icons
     * @param icon
     * @param expandableIcon
     * @returns {*}
     */
    static getSettingItem(callBack,text,color,Icons,icon,expandableIcon){
        return <TouchableOpacity
            onPress={callBack}
            style={styles.setting_item_container}
        >
            <View style={{alignItems:'center',flexDirection:'row'}}>
                {Icons&&icon?<Icons name={icon} size={16} style={{color:'blue',marginRight: 30,}}/>:<View style={{opacity: 1,width:16,height:16,marginRight:30,}}/>}
                <Text>{text}</Text>
            </View>
            <Ionicons
                name={expandableIcon?expandableIcon:'ios-arrow-forward'}
                size={16}
                style={{
                    marginRight:10,
                    alignSelf:'center',
                    color: color||'black',
                }}
            />
        </TouchableOpacity>
    }

    /**
     * 封装menu对象的用户信息栏的Item
     * @param callBack
     * @param menu
     * @param color
     * @param expandableIcon
     */
    static getUserMenuItem(callBack,menu,color,expandableIcon){
        return ViewUtil.getSettingItem(callBack,menu.name,color,menu.Icons,menu.icon,expandableIcon);
    }
}

const styles = StyleSheet.create({
    setting_item_container:{
        backgroundColor:'white',
        padding:10,
        height: 60,
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection: 'row',
    },
})