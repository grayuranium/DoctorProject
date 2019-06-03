import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput,TouchableOpacity,Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,Input } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import Toast from 'react-native-easy-toast';
import { Avatar } from 'react-native-elements';
import Cookie from 'react-native-cookie';

const Dimensions = require('Dimensions');
const WINDOW_WIDTH = Dimensions.get('window').width;
export default class LoginPage extends  Component {
    constructor(props){
        super(props);
        this.state = {
            account:'',
            password:'',
            isError:false,
            errorMsg:'',
            msgLogin:false,
            loginMsg:'',
            type:0,
        };
    }

    forgetPassword(){

    }

    login(){
        //需要根据redux设计工具类
        // const {navigation} = this.props;
        // navigation.navigate('AppUserHome');
        //type:0-用户 1-医生

        const {navigation} = this.props;
        let postData = {
            accid:this.state.account,
            pwd:this.state.password,
            type:this.state.type.toString(),
        };
        let json_data = JSON.stringify(postData)
        fetch('http://'+global.service.local_url+':8080/EfficientDr/login',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
            },
            body:json_data,
        }).then((response)=>{
            if (response.ok){
                return response.json();
            }
            throw new Error ('Network response was not ok.');
        }).then((responseData)=>{
            if (responseData.status===1){
                global.cookies.cookie = responseData.cookie.toString();
                return responseData.InfoKey;
            }else if(responseData.status===0){
                throw new Error ('Password is wrong.')
            }else {
                throw new Error ('User do not exist.')
            }
        }).then((info)=>{
            if (this.state.type==0){
                global.userinfo.accid = info.uaccid;
                global.userinfo.name = info.uname;
                global.userinfo.id = info.userid;
                global.userinfo.phonenum = info.uphonenum;
            } else {
                global.doctorinfo.accid = info.daccid;
                global.doctorinfo.id = info.doctorid;
                global.doctorinfo.phonenum = info.dphonenum;
                global.doctorinfo.hospital = info.dhospital;
                global.doctorinfo.headpho = info.dheadpho;
                global.doctorinfo.hospitaldepartmentid = info.dhospitaldepartmentid;
            }
            navigation.navigate(this.state.type==0?'AppUserHome':'AppDoctorHome');
        }).catch((error)=>{
            this.refs.toast.show('ERROR:'+error.toString()+'请重新登录');
        })
    }

    sendMsgToLogin(){
        this.refs.toast.show('验证码已发送');
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.switchStyle}>
                    <Switch
                        value={this.state.type==0?false:true}
                        onValueChange={value=>{
                            if (value==true){
                                this.setState({
                                    type:1,
                                })
                            }else {
                                this.setState({
                                    type:0,
                                })
                            }
                        }}
                    />
                </View>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                    }}
                    containerStyle={styles.iconStyle}
                />
                <Input
                    placeholder='Username'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                    inputStyle={styles.textInputStyle}
                    onChangeText={text=>this.setState({account:text})}
                    inputContainerStyle={styles.textInputContainer}
                />
                {this.state.msgLogin?
                    <View style={[styles.textInputContainer,{marginTop:10}]}>
                    <TextInput
                        onChangeText={text=>this.setState({loginMsg:text})}
                        underlineColorAndroid={'transparent'}
                        style={[styles.textInputStyle,{paddingLeft: 8,}]}
                        placeholder={'请输入验证码'}
                    />
                        <TouchableOpacity onPress={()=>this.sendMsgToLogin()}>
                            <View style={styles.msgLoginBtn}>
                                <Text style={{fontSize:18,marginLeft:8,marginRight:8}}>发送验证码</Text>
                            </View>
                        </TouchableOpacity>
                </View>:
                        <Input
                            placeholder='Password'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color='black'
                                />
                            }
                            secureTextEntry={true}
                            inputStyle={styles.textInputStyle}
                            onChangeText={text=>this.setState({password:text})}
                            inputContainerStyle={[styles.textInputContainer,{marginTop:10}]}
                        />
                }
                <Button
                    title="登录"
                    type="solid"
                    onPress={()=>this.login()}
                    buttonStyle={styles.loginBtnStyle}
                />
                <View style={styles.settingStyle}>
                    <Button
                        title={"忘记密码？"}
                        type={"clear"}
                        onPress={()=>this.forgetPassword()}
                    />
                    <Button
                        title={"新用户"}
                        type={"clear"}
                        onPress={()=>{
                            navigation.navigate(this.state.type==0?'Register':'Register_Doctor');
                        }}
                    />
                </View>
                <View style={styles.errorShow}></View>
                <Button
                    title={this.state.msgLogin?'使用密码登录':'使用短信验证码登录'}
                    type={"clear"}
                    onPress={()=>this.setState((prevState)=>{
                        return {msgLogin:!prevState.msgLogin,}
                    })}
                    buttonStyle={[styles.settingStyle,{justifyContent:'center'}]}
                />
                {/*<View style={styles.otherLoginStyle}>*/}
                    {/*<Text>其他登录方式</Text>*/}
                    {/*<Image source={{uri:'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',}} style={styles.otherImageStyle}></Image>*/}
                    {/*<Image source={{uri:'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',}} style={styles.otherImageStyle}></Image>*/}
                    {/*<Image source={{uri:'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',}} style={styles.otherImageStyle}></Image>*/}
                {/*</View>*/}
                <Toast ref={'toast'} position={'center'}/>
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
    switchStyle:{
        height:30,
        width:WINDOW_WIDTH,
        marginTop:10,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    iconStyle:{
        // width:120,
        // height:120,
        marginTop:60,
        // borderRadius:60,
        // borderWidth:2,
        // borderColor:'orange',
        marginBottom:30,
    },
    label:{
        position: 'absolute',
        left: 18,
        top: 12,
        fontSize:18,
        fontWeight:'500'
    },
    msgLoginBtn:{
        flex:1,
        margin:8,
        borderRadius:8,
        backgroundColor:'skyblue',
        justifyContent:'center',
    },
    textInputContainer:{
        marginLeft:0.1*WINDOW_WIDTH,
        marginRight: 0.1*WINDOW_WIDTH,
        // flexDirection:'row',
        marginTop:40,
        borderRadius:8,
    },
    textInputStyle:{
        height:50,
        paddingVertical: 0,
        paddingLeft:20,
    },
    loginBtnStyle:{
        height:40,
        width:WINDOW_WIDTH*0.8,
        marginTop:20,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    },
    settingStyle:{
        flexDirection:'row',
        width:WINDOW_WIDTH*0.8,
        justifyContent:'space-between',
    },
    otherLoginStyle: {
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        left:20
    },
    otherImageStyle:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:10,
    },
    errorShow:{
        height:0.18*WINDOW_WIDTH,
    },
});