import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Picker,
    TouchableOpacity
} from 'react-native';
import {RadioButtons} from "react-native-radio-buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input,Tile } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

type Props = {};
const GENDER = ['Woman', 'Man'];
const {width, height} = Dimensions.get('window');
export default class DoctorRegisterPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: '',
            doctorGender: '女',
            doctorPhone: '',
            doctorPsw: '',
            doctorDate: '2016-05-15',
            doctorIdentityNum:'',
            doctorDepartmentId:1,
            doctorHospital:'',
            doctorTitle:'医师',
        };
    }

    renderRadioOption = (option, selected, onSelect, index) => {
        const style = selected ? {fontWeight: 'bold', marginRight: 40, fontSize: 20} : {marginRight: 40, fontSize: 20};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderRadioContainer = optionsNodes => {
        return <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 30
        }}>{optionsNodes}</View>;
    }

    onRegister() {
        // const {navigation} = this.props;
        // navigation.navigate('AppUserHome');
        const {navigation} = this.props;
        let postData = {
            dhospitaldepartmentid:this.state.doctorDepartmentId,
            dname: this.state.doctorName,
            dgender: this.state.doctorGender,
            dbirthday: this.state.doctorDate,
            daccid: this.state.doctorPhone,
            dpwd: this.state.doctorPsw,
            didentitycard:this.state.doctorIdentityNum,
            dhospital:this.state.doctorHospital,
            dtitle:this.state.doctorTitle,
            dphonenum: this.state.doctorPhone,
            dheadpho: 0,
        };
        fetch('http://192.168.1.12:8080/EfficientDr/docRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.')
        }).then((responseData) => {
            if (responseData.status === 1) {
                navigation.navigate('Login');
            } else if (responseData.status === 0) {
                throw new Error('Server return failed.');
            } else {
                throw new Error('Doctor is existed.');
            }
        }).catch((error) => {
            this.refs.toast.show('ERROR:' + error.toString() + '请重新输入!');
        })
    }

    checkPassword() {

    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF'
                }}
            >
                <Tile
                    height={80}
                    imageSrc={require('../res/bitmap/swiper1.jpg')}
                    title="Sign Up"
                    featured
                    containerStyle={{marginBottom:5,}}
                />
                <Input
                    placeholder='Doctor name'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={text => {
                        this.setState({
                            doctorName: text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={styles.textInputStyle}
                />
                <View style={styles.item_container}>
                    <Icon
                        name='transgender'
                        size={24}
                        color='black'
                        style={{marginLeft: 25}}
                    />
                    <RadioButtons
                        options={GENDER}
                        onSelection={(selectedOption) => {
                            if (selectedOption === GENDER[0]) {
                                this.setState({
                                    doctorGender: '女',
                                });
                            } else {
                                this.setState({
                                    doctorGender: '男',
                                });
                            }
                        }}
                        selectedOption={this.state.doctorGender === '女' ? GENDER[0] : GENDER[1]}
                        renderOption={this.renderRadioOption}
                        renderContainer={this.renderRadioContainer}
                    />
                </View>
                <Input
                    placeholder='Phonenumber'
                    leftIcon={
                        <Icon
                            name='phone'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={text => {
                        this.setState({
                            doctorPhone: text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={[styles.textInputStyle,{paddingLeft: 17}]}
                />
                <Input
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={text => {
                        this.setState({
                            doctorPsw: text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={styles.textInputStyle}
                />
                <Input
                    placeholder='Identitycard'
                    leftIcon={
                        <Icon
                            name='id-card'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={text=>{
                        this.setState({
                            doctorIdentityNum:text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={[styles.textInputStyle,{paddingLeft:9}]}
                />
                <Input
                    placeholder='Hospital Name'
                    leftIcon={
                        <Icon
                            name='hospital-o'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={text=>{
                        this.setState({
                            doctorHospital:text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={[styles.textInputStyle,{paddingLeft:17}]}
                />
                <Picker
                    selectedValue={this.state.doctorTitle}
                    onValueChange={value=>this.setState({
                        doctorTitle:value,
                    })}
                    style={[styles.item_container,{marginLeft:0.15 * width,}]}
                >
                    <Picker.Item label="医师" value="医师" />
                    <Picker.Item label="主治医师" value="主治医师" />
                    <Picker.Item label="副主任医师" value="副主任医师" />
                    <Picker.Item label="主任医师" value="主任医师" />
                </Picker>
                <Picker
                    selectedValue={this.state.doctorDepartmentId}
                    onValueChange={value=>this.setState({
                        doctorDepartmentId:value,
                    })}
                    style={[styles.item_container,{marginLeft:0.15 * width,}]}
                >
                    <Picker.Item label="妇科" value="1" />
                    <Picker.Item label="儿科" value="2" />
                    <Picker.Item label="皮肤性病科" value="3" />
                    <Picker.Item label="内科" value="4" />
                    <Picker.Item label="男科" value="5" />
                    <Picker.Item label="产科" value="6" />
                    <Picker.Item label="外科" value="7" />
                    <Picker.Item label="中医科" value="8" />
                    <Picker.Item label="骨伤科" value="9" />
                    <Picker.Item label="精神心理科" value="10" />
                    <Picker.Item label="口腔颌面科" value="11" />
                    <Picker.Item label="眼科" value="12" />
                    <Picker.Item label="耳鼻咽喉科" value="13" />
                    <Picker.Item label="肿瘤及防治科" value="14" />
                    <Picker.Item label="整形美容科" value="15" />
                    <Picker.Item label="营养科" value="16" />
                </Picker>
                <View style={styles.item_container}>
                    <Icon
                        name='calendar'
                        size={24}
                        color='black'
                        style={{marginLeft: 22}}
                    />
                    <DatePicker
                        style={{width: 250}}
                        date={this.state.doctorDate}
                        showIcon={false}
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
                        }}
                        onDateChange={(date) => {
                            this.setState({doctorDate: date})
                        }}
                    />
                </View>
                <Button
                    title="注册"
                    type="outline"
                    buttonStyle={styles.registerBtnStyle}
                    onPress={()=>this.onRegister()}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textInputContainer:{
        marginLeft:0.1*width,
        marginRight: 0.1*width,
        // flexDirection:'row',
        marginTop:40,
        borderRadius:8,
    },
    textInputStyle:{
        height:50,
        paddingVertical: 0,
        paddingLeft:20,
    },
    item_container: {
        height: 50,
        width: 0.8 * width,
        marginLeft: 0.1 * width,
        marginRight: 0.1 * width,
        marginTop: 3,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
    },
    registerBtnStyle:{
        height: 50,
        width: 0.8 * width,
        marginLeft: 0.1 * width,
        marginRight: 0.1 * width,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
});
