import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View,ScrollView,Button,TouchableOpacity} from 'react-native';
import {RadioButtons} from "react-native-radio-buttons";
import DatePicker from 'react-native-datepicker'

type Props = {};
const GENDER = ['女','男'];
const {width,height} = Dimensions.get('window');
export default class RegisterPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userAge:'',
            userGender:0,
            userPhone:'',
            userPsw:'',
            userDate:'2016-05-15',
        };
    }

    renderRadioOption = (option, selected, onSelect, index)=>{
        const style = selected ? { fontWeight: 'bold', marginRight:40, fontSize:20} : {marginRight:40,fontSize:20};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderRadioContainer = optionsNodes=>{
        return <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:30}}>{optionsNodes}</View>;
    }

    onRegister(){
        const {navigation} = this.props;
        navigation.navigate('AppUserHome');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={{height:90,backgroundColor:'gray',justifyContent:'center',alignItems:'center',marginBottom: 20,}}>
                        <Text style={{fontSize:30,fontWeight:'500',}}></Text>
                    </View>
                    <View style={styles.item_container}>
                        <TextInput
                            onChangeText={text=>{
                                this.setState({
                                    userName:text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                            placeholder={'请输入姓名'}
                        />
                        <Text style={styles.label}>姓名</Text>
                    </View>
                    <View style={[styles.item_container,{height:50}]}>
                        <Text style={{fontSize:18,fontWeight:'500',marginLeft:18}}>性别</Text>
                        <RadioButtons
                            options={GENDER}
                            onSelection={(selectedOption)=>{
                                if (selectedOption===GENDER[0]) {
                                    this.setState({
                                        userGender:0,
                                    });
                                }else {
                                    this.setState({
                                        userGender:1,
                                    });
                                }
                            }}
                            selectedOption={this.state.userGender===0?GENDER[0]:GENDER[1]}
                            renderOption={this.renderRadioOption}
                            renderContainer={this.renderRadioContainer}
                        />
                    </View>
                    <View style={styles.item_container}>
                        <TextInput
                            onChangeText={text=>{
                                this.setState({
                                    userAge:text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                            placeholder={'请输入年龄'}
                        />
                        <Text style={styles.label}>年龄</Text>
                    </View>
                    <View style={styles.item_container}>
                        <TextInput
                            onChangeText={text=>{
                                this.setState({
                                    userPhone:text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                            placeholder={'请输入手机号'}
                        />
                        <Text style={styles.label}>手机</Text>
                    </View>
                    <View style={styles.item_container}>
                        <TextInput
                            onChangeText={text=>{
                                this.setState({
                                    userPsw:text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                            placeholder={'请输入密码'}
                            password={true}
                        />
                        <Text style={styles.label}>密码</Text>
                    </View>
                    <View style={styles.item_container}>
                        <Text style={{fontSize:18,fontWeight:'500',marginLeft:18,marginRight:18}}>出生日期</Text>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.userDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({userDate: date})}}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>this.onRegister()}>
                        <View style={[styles.item_container,{height:50,justifyContent:'center',borderRadius:40,backgroundColor:'blue',marginTop:50 }]}>
                            <Text style={{color:'white'}}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    item_container:{
        flex:1,
        marginLeft:0.1*width,
        marginRight: 0.1*width,
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius:8,
    },
    label:{
        position: 'absolute',
        left: 18,
        top: 13,
        fontSize:18,
        fontWeight:'500'
    },
    textInputStyle:{
        flex:1,
        height:50,
        backgroundColor:'white',
        fontSize:18,
        paddingVertical:0,
        paddingLeft:68,
        borderRadius:8,
    },
});
