import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {RadioButtons} from "react-native-radio-buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input,Tile } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

type Props = {};
const GENDER = ['Woman', 'Man'];
const {width, height} = Dimensions.get('window');
export default class RegisterPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userGender: '女',
            userPhone: '',
            userPsw: '',
            userDate: '2016-05-15',
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
            uname: this.state.userName,
            ugender: this.state.userGender,
            uaccid: this.state.userPhone,
            upwd: this.state.userPsw,
            uphonenum: this.state.userPhone,
            usomatotypes: 0,
            ubirthday: this.state.userDate,
            uheadpho: 0,
        };
        fetch('http://192.168.1.12:8080/EfficientDr/userRegister', {
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
                throw new Error('User is existed.');
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
                    height={120}
                    imageSrc={require('../res/bitmap/swiper1.jpg')}
                    title="Sign Up"
                    featured
                    caption="For a intellgence user"
                    containerStyle={{marginBottom:20,}}
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
                    onChangeText={text => {
                        this.setState({
                            userName: text,
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
                                    userGender: '女',
                                });
                            } else {
                                this.setState({
                                    userGender: '男',
                                });
                            }
                        }}
                        selectedOption={this.state.userGender === '女' ? GENDER[0] : GENDER[1]}
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
                            userPhone: text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={[styles.textInputStyle,{paddingLeft: 17,}]}
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
                            userPsw: text,
                        })
                    }}
                    containerStyle={styles.item_container}
                    inputStyle={styles.textInputStyle}
                />
                <Input
                    placeholder='Repeat Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={() => this.checkPassword()}
                    containerStyle={styles.item_container}
                    inputStyle={styles.textInputStyle}
                />
                <View style={styles.item_container}>
                    <Icon
                        name='calendar'
                        size={24}
                        color='black'
                        style={{marginLeft: 22}}
                    />
                    <DatePicker
                        style={{width: 250}}
                        date={this.state.userDate}
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
                            this.setState({userDate: date})
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
        marginTop: 10,
        marginBottom: 10,
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
