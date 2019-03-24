import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput,TouchableOpacity,Button} from 'react-native';
import Toast from 'react-native-easy-toast';


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
        };
    }

    login(){
        //需要根据redux设计工具类
        const {navigation} = this.props;
        navigation.navigate('AppUserHome');
    }

    sendMsgToLogin(){
        this.refs.toast.show('验证码已发送');
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source={{uri:'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',}}
                    style={styles.iconStyle}
                />
                <View style={styles.textInputContainer}>
                    <TextInput
                        onChangeText={text=>this.setState({account:text})}
                        underlineColorAndroid={'transparent'}
                        style={styles.textInputStyle}
                        placeholder={'请输入账号'}
                    />
                    <Text style={styles.label}>账号</Text>
                </View>
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
                        {/*<Button style={styles.msgLoginBtn} title={'验证码'} onPress={()=>this.sendMsgToLogin()}/>*/}
                </View>:
                    <View style={[styles.textInputContainer,{marginTop:10}]}>
                    <TextInput
                        onChangeText={text=>this.setState({password:text})}
                        underlineColorAndroid={'transparent'}
                        style={styles.textInputStyle}
                        placeholder={'请输入密码'}
                        password={true}
                    />
                    <Text style={styles.label}>密码</Text>
                </View>}
                <TouchableOpacity onPress={()=>this.login()}>
                    <View style={[styles.loginBtnStyle,{borderRadius:40}]}>
                            <Text style={{color:'white'}}>登录</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.settingStyle}>
                    <Text>忘记密码？</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Register');
                    }}>
                        <Text>新用户</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.errorShow}></View>
                <TouchableOpacity
                    onPress={()=>this.setState((prevState)=>{
                    return {msgLogin:!prevState.msgLogin,}
                })}>
                    <View style={[styles.settingStyle,{justifyContent:'center'}]}>
                        <Text style={{fontSize:15,color:'blue'}}>{this.state.msgLogin?'使用密码登录':'使用短信验证码登录'}</Text>
                    </View>
                </TouchableOpacity>
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
    iconStyle:{
        width:120,
        height:120,
        marginTop:100,
        borderRadius:60,
        borderWidth:2,
        borderColor:'orange',
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
        flexDirection:'row',
        marginTop:40,
        borderRadius:8,
    },
    textInputStyle:{
        flex:1,
        height:50,
        backgroundColor:'white',
        fontSize:18,
        paddingVertical: 0,
        paddingLeft:68,
        borderRadius:8,
    },
    loginBtnStyle:{
        height:40,
        width:WINDOW_WIDTH*0.8,
        backgroundColor:'blue',
        marginTop:20,
        marginBottom:30,
        //flex布局
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
        height:0.3*WINDOW_WIDTH,
    },
});