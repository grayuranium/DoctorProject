import React, {Component} from 'react';
import {Button,Overlay,Input} from 'react-native-elements'
import {Platform, StyleSheet, Text, View, TextInput, Image, AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from "../../RegisterPage";

type Props = {};
const Dimensions = require('Dimensions');
const WINDOW_WIDTH = Dimensions.get('window').width;
// More info on all the options is below in the API Reference... just some common use cases shown here
const CameraOptions = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};
export default class HealthSightUpdatePage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            isVisible:false,
            title:'',
            content:'',
            createStamp:'',
            updateStamp:'',
            keyword:'',
            avatarSource:'',
        };
    }

    showCamera(){
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(CameraOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    imgdata:response.data,
                    avatarSource: response.uri,
                });
            }
        });
    }

    updateArticle(){
        let id = global.doctorinfo.id;
        let time = new Date().getTime().toString();
        let postData = {
            dsdoctorid:id,
            dsimgurl:this.state.avatarSource,
            dscreatetstamp:time,
            dslastupdatetstamp:time,
            dskeyword:this.state.keyword,
            dscontent:this.state.content,
            dstitle:this.state.title,
        };
        let json_data = JSON.stringify(postData)
        fetch('http://'+global.service.local_url+':8080/EfficientDr/docAddHealthCircleVerif',{
            method:'POST',
            // credentials:'include',
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
                'Cookie':global.cookies.cookie,
            },
            body:json_data,
        }).then((response)=>{
            if (response.ok){
                return response.json();
            }
            throw new Error ('Network response was not ok.');
        }).then((responseData)=>{
            if (responseData.status===1){
                this.setState(prevState=>({
                    isVisible:!prevState.isVisible
                }))
            }else if(responseData.status===0){
                throw new Error ('Password is wrong.')
            }else {
                throw new Error ('User do not exist.')
            }
        }).catch((error)=>{
            this.refs.toast.show('ERROR:'+error.toString()+'请重新登录');
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Overlay
                    isVisible={this.state.isVisible}
                    width={0.8*WINDOW_WIDTH}
                    height={500}
                >
                    <View style={styles.item_container}>
                        <Text style={styles.testStyle}>标题</Text>
                        <TextInput
                            placeholder='Title'
                            onChangeText={text => {
                                this.setState({
                                    title: text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                        />
                    </View>
                    <View style={styles.item_container}>
                        <Text style={styles.testStyle}>关键词</Text>
                        <TextInput
                            placeholder='Keyword'
                            onChangeText={text => {
                                this.setState({
                                    keyword: text,
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                            style={styles.textInputStyle}
                        />
                    </View>
                    <View style={[styles.item_container,{height:100}]}>
                        <Text style={styles.testStyle}>内容</Text>
                        <TextInput
                            placeholder='Content'
                            onChangeText={text => {
                                this.setState({
                                    content: text,
                                })
                            }}
                            multiline
                            underlineColorAndroid={'transparent'}
                            style={[styles.textInputStyle,{height:100}]}
                        />
                    </View>
                    {this.state.avatarSource==''?
                        null:
                        <View style={[styles.item_container,{height:100,justifyContent:'center'}]}>
                            <Image
                                source={{uri:this.state.avatarSource}}
                                style={{height:100,width:100}}
                            />
                        </View>
                    }
                    <Button
                        title="选择图片"
                        type="solid"
                        onPress={()=>this.showCamera()}
                        containerStyle={{justifyContent: 'center',alignItems: 'center',}}
                        buttonStyle={{marginTop:10, marginBottom:10, width:80,}}
                    />
                    <Button
                        title="发送"
                        type="solid"
                        onPress={()=>this.updateArticle()}
                    />
                </Overlay>
                <Button
                    title="发送健康圈消息"
                    type="solid"
                    onPress={()=>this.setState(prestate=>({
                        isVisible: !prestate.isVisible,
                    }))}
                />
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    item_container: {
        height: 50,
        width: 0.65 * WINDOW_WIDTH,
        marginLeft: 0.05 * WINDOW_WIDTH,
        marginRight: 0.05 * WINDOW_WIDTH,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
    },
    testStyle:{
        height:50,
        fontSize: 20,
        textAlignVertical:'center',
        includeFontPadding:false,
    },
    textInputStyle:{
        height:50,
        width: 0.6 * WINDOW_WIDTH,
        fontSize:20,
        paddingLeft:20,
        paddingVertical: 0,
    },
});
