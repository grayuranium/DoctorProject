import React, {Component} from 'react';
import {Button,Overlay,Input} from 'react-native-elements'
import {Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import Icon from "../../RegisterPage";

type Props = {};
const Dimensions = require('Dimensions');
const WINDOW_WIDTH = Dimensions.get('window').width;
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
            imgurl:'',
        };
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
                    <Button
                        title="发送"
                        type="solid"
                        onPress={()=>this.setState(prestate=>({
                            isVisible: !prestate.isVisible,
                        }))}
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
        width: 0.8 * WINDOW_WIDTH,
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
