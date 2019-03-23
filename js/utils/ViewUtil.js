import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
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
     * 条形设置的Item
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

    /**
     * 网格布局的Item
     * @param callBack
     * @param text
     * @param color
     * @param Icons
     * @param icon
     * @returns {*}
     */
    static getGridItem(callBack,text,color,Icons,icon){
        return <View style={{flex:1}}>
            <TouchableOpacity onPress={callBack}>
                <View style={styles.cell_container}>
                    <View style={styles.icon_container}>
                        {Icons&&icon?<Icons name={icon} size={30} style={{color:color||'blue'}}/>:<View style={{opacity: 1,width:26,height:26}}/>}
                    </View>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>;
    }

    /**
     * 封装menu对象的医生科室选择的Item
     * @param callBack
     * @param menu
     * @param color
     * @returns {*}
     */
    static  getDoctorOfficeMenuItem(callBack,menu){
        return ViewUtil.getGridItem(callBack,menu.name,menu.color,menu.Icons,menu.icon);
    }

    /**
     * 封装列表Item
     * @param callBack
     * @param item
     * @returns {*}
     */
    static getListItem(callBack,item){
        if (!item||!item.owner) return null;
        return <TouchableOpacity
            onPress={callBack}
        >
            <View style={styles.list_cell_container}>
                <Text style={styles.list_title}>
                    {item.full_name}
                </Text>
                <Text style={styles.list_description}>
                    {item.description}
                </Text>
                <View style={styles.list_row}>
                    <Text>Author:</Text>
                    <Image
                        style={{height:22,width:22}}
                        source={{uri:item.owner.avatar_url}}
                    />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Start:</Text>
                    <Text>{item.stargazers_count}</Text>
                </View>
            </View>
        </TouchableOpacity>;
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
    cell_container: {
        backgroundColor:'white',
        margin:10,
        width:70,
        borderRadius:8,
    },
    icon_container: {
        flex:0.8,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        padding:3,
    },
    title_container:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center',
        padding:3,
    },
    title: {
        fontSize: 10,
        color: '#212121',
    },
    list_cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',//IOS添加阴影效果
        shadowOffset:{width: 0.5,height: 0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation: 2,//android添加阴影效果
    },
    list_row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
    },
    list_title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121',
    },
    list_description:{
        fontSize: 14,
        marginBottom: 2,
        color:'#212121',
    },
})