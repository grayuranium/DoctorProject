import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width,height} = Dimensions.get('window');
const AVATAR_SIZE = 110;
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
     * 列表的Item
     * @param callBack
     * @param item
     * @returns {*}
     */
    static getListItem(callBack,item){
        if (!item||!item.doctorsuggestionid) return null;
        return <TouchableOpacity
            onPress={callBack}
        >
            <View style={styles.list_cell_container}>
                <Text style={styles.list_title}>
                    {item.dstitle}
                </Text>
                <Text style={styles.list_description}>
                    {item.dscontent}
                </Text>
                <View style={styles.list_row}>
                    <Text>Image:</Text>
                    <Image
                        style={{height:22,width:22}}
                        source={{uri:item.dsimgurl}}
                    />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Doctor:</Text>
                    <Text>{item.dsdoctorname}</Text>
                </View>
            </View>
        </TouchableOpacity>;
    }

    /**
     * 健康报表引导项的item
     * @param callBack
     * @param data
     * @returns {*}
     */
    static getIntroductionItem(callBack,data){
        if (!data) return null;
        return <TouchableOpacity onPress={callBack}>
            <View style={styles.intro_container}>
                <Image style={ styles.intro_img } source={{
                    uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <View style={styles.intro_text}>
                    <Text style={styles.intro_title}>{data.name}</Text>
                    <Text style={styles.intro_description}>{data.description}</Text>
                </View>
                <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                    style={{
                        marginRight:10,
                        color: 'black',
                    }}
                />
            </View>
        </TouchableOpacity>
    }

    /**
     * 分隔线
     * @returns {*}
     */
    static getSeparator(title){
        return <View style={{width:width,height:25,backgroundColor:'#B7D8D8',paddingTop: 5,paddingBottom: 5,
            margin:5,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight: '400'}}>{title}</Text>
        </View>;
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
    intro_container:{
        width:0.9*width,
        height:180,
        marginTop:7,
        marginBottom:7,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    intro_img:{
        margin: 20,
        borderRadius: AVATAR_SIZE / 2,
    },
    intro_text:{
        width:180,
        height:AVATAR_SIZE,
        flexDirection:'column',
        justifyContent:'space-evenly',
        backgroundColor:'white',
        paddingTop:5,
        paddingBottom:5,
    },
    intro_title:{
        fontSize:25,
        fontWeight: '300',
        color:'black',
    },
    intro_description:{
        fontSize:16,
        color:'gray',
    },
})