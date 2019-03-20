import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

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
                style={{color:'black'}}
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
                style={{opacity:0.9,marginRight:10,color: 'black'}}
            />
        </TouchableOpacity>;
    }
}