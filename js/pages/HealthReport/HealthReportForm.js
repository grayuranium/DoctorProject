import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TextInput,ScrollView,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import {HueSlider} from 'react-native-color';
import tinycolor from 'tinycolor2';
import ImagePicker  from 'react-native-image-picker';
import NaviBar from 'react-native-pure-navigation-bar';
import Toast from 'react-native-easy-toast';
import DataUploadUtil from "../../utils/DataUploadUtil";

type Props = {};
const EAT_BREAKFAST_OPTIONS = ['吃了','没吃'];
const SKIN_DRY_OPTIONS = ['干燥','正常'];
const NERVEROUS_OPTIONS = ['焦虑','放松'];
const SETIMANT_OPTIONS = ['愁绪','自然'];
const SWEAT_OPTIONS = ['超大','大','一般','少','没出汗'];
const BODY_STATES_OPTIONS = ['精力充沛','一般一般','萎靡不振'];
const SENCE_STATES_OPTIONS = ['开心','一般','难受'];
const URL = 'https://api.github.com/search/repositories?q=';
const imgOptions = {
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData: false,
    storageOptions:{
        skipBackup:true,
        path:'images',
    },
};
export default class HealthReportForm extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            weight:'0',
            height:'0',
            foodCalory:'0',
            waterOfCup:'0',
            sleepHour:'0',
            sportsStep:'0',
            dabianTimes:'0',
            tireTimes:'0',
            sighTimes:'0',
            eatBreakfastOption:true,
            skinDryOption:true,
            nerverousOption:true,
            sentimantOption:true,
            sweatOption:0,
            bodyStatesOption:0,
            senceStatesOption:0,
            urineColor: tinycolor('#70c1b3').toHsl(),
            lipColor: tinycolor('#ff0000').toHsl(),
        };
    }

    renderRadioOption = (option, selected, onSelect, index)=>{
        const style = selected ? { fontWeight: 'bold', marginRight:50, fontSize:20} : {marginRight:50, fontSize:20};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderMultipleRadioOption = (option, selected, onSelect, index)=>{
        const style = selected ? { fontWeight: 'bold', marginRight:10, fontSize:20} : {marginRight:10, fontSize:20};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderRadioContainer = optionsNodes=>{
        return <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>{optionsNodes}</View>;
    }

    openCamera = ()=>{
        ImagePicker.showImagePicker(imgOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // if (DataUploadUtil.uploadImage(response.uri)) {
                //     this.refs.toast.show('上传成功');
                // }
                this.refs.toast.show('上传成功');
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='健康记录'
                />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>体重：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                weight:text,}
                            )}/>
                            <Text style={styles.item_measure}>kg</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>身高：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                height:text,}
                            )}/>
                            <Text style={styles.item_measure}>cm</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>食物热量：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                foodCalory:text,}
                            )}/>
                            <Text style={styles.item_measure}>kCal</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>水摄入量：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                waterOfCup:text,}
                            )}/>
                            <Text style={styles.item_measure}>杯</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>睡眠时间：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                sleepHour:text,}
                            )}/>
                            <Text style={styles.item_measure}>h</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>运动步数：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                sportsStep:text,}
                            )}/>
                            <Text style={styles.item_measure}>步</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>排便次数：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                dabianTimes:text,}
                            )}/>
                            <Text style={styles.item_measure}>次</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>疲劳次数：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                tireTimes:text,}
                            )}/>
                            <Text style={styles.item_measure}>次</Text>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>叹气次数：</Text>
                            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                                sighTimes:text,}
                            )}/>
                            <Text style={styles.item_measure}>次</Text>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>按时早饭：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={EAT_BREAKFAST_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        if (selectedOption===EAT_BREAKFAST_OPTIONS[0]) {
                                            this.setState({
                                                eatBreakfastOption:true,
                                            });
                                        }else {
                                            this.setState({
                                                eatBreakfastOption:false,
                                            });
                                        }
                                    }}
                                    selectedOption={this.state.eatBreakfastOption?EAT_BREAKFAST_OPTIONS[0]:EAT_BREAKFAST_OPTIONS[1]}
                                    renderOption={this.renderRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>皮肤肤质：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={SKIN_DRY_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        if (selectedOption===SKIN_DRY_OPTIONS[0]) {
                                            this.setState({
                                                skinDryOption:true,
                                            });
                                        }else {
                                            this.setState({
                                                skinDryOption:false,
                                            });
                                        }
                                    }}
                                    selectedOption={this.state.skinDryOption?SKIN_DRY_OPTIONS[0]:SKIN_DRY_OPTIONS[1]}
                                    renderOption={this.renderRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>焦虑度：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={NERVEROUS_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        if (selectedOption===NERVEROUS_OPTIONS[0]) {
                                            this.setState({
                                                nerverousOption:true,
                                            });
                                        }else {
                                            this.setState({
                                                nerverousOption:false,
                                            });
                                        }
                                    }}
                                    selectedOption={this.state.nerverousOption?NERVEROUS_OPTIONS[0]:NERVEROUS_OPTIONS[1]}
                                    renderOption={this.renderRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>敏感度：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={SETIMANT_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        if (selectedOption===SETIMANT_OPTIONS[0]) {
                                            this.setState({
                                                sentimantOption:true,
                                            });
                                        }else {
                                            this.setState({
                                                sentimantOption:false,
                                            });
                                        }
                                    }}
                                    selectedOption={this.state.sentimantOption?SETIMANT_OPTIONS[0]:SETIMANT_OPTIONS[1]}
                                    renderOption={this.renderRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>出汗量：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={SWEAT_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        for(let i=0;i<SWEAT_OPTIONS.length;i++){
                                            if (selectedOption===SWEAT_OPTIONS[i]){
                                                this.setState({
                                                    sweatOption:i,
                                                });
                                                break;
                                            }
                                        }
                                    }}
                                    selectedOption={SWEAT_OPTIONS[this.state.sweatOption]}
                                    renderOption={this.renderMultipleRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>身体状况：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={BODY_STATES_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        for(let i=0;i<BODY_STATES_OPTIONS.length;i++){
                                            if (selectedOption===BODY_STATES_OPTIONS[i]){
                                                this.setState({
                                                    bodyStatesOption:i,
                                                });
                                                break;
                                            }
                                        }
                                    }}
                                    selectedOption={BODY_STATES_OPTIONS[this.state.bodyStatesOption]}
                                    renderOption={this.renderMultipleRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>心情：</Text>
                            <View style={styles.item_radio_btn}>
                                <RadioButtons
                                    options={SENCE_STATES_OPTIONS}
                                    onSelection={(selectedOption)=>{
                                        for(let i=0;i<SENCE_STATES_OPTIONS.length;i++){
                                            if (selectedOption===SENCE_STATES_OPTIONS[i]){
                                                this.setState({
                                                    senceStatesOption:i,
                                                });
                                                break;
                                            }
                                        }
                                    }}
                                    selectedOption={SENCE_STATES_OPTIONS[this.state.senceStatesOption]}
                                    renderOption={this.renderMultipleRadioOption}
                                    renderContainer={this.renderRadioContainer}
                                />
                            </View>
                        </View>

                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>尿色：</Text>
                            <HueSlider style={styles.item_color_slider} gradientSteps={40} onValueChange={h=>{
                                this.setState({ color: { ...this.state.urineColor, h } });
                            }} value={this.state.urineColor.h}/>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>唇色：</Text>
                            <HueSlider style={styles.item_color_slider} gradientSteps={40} onValueChange={h=>{
                                this.setState({ color: { ...this.state.lipColor, h } });
                            }} value={this.state.lipColor.h}/>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>排便：</Text>
                            <TouchableOpacity style={styles.item_img_uploader} onPress={()=>this.openCamera()}>
                                <Text style={{fontSize:20}}>上传图片</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>排尿：</Text>
                            <TouchableOpacity style={styles.item_img_uploader} onPress={()=>this.openCamera()}>
                                <Text style={{fontSize:20}}>上传图片</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_container}>
                            <Button style={styles.item_upload_btn} title={'提交'} onPress={()=>{
                                // let data = {
                                //     weight:this.state.weight,
                                //     height:this.state.height,
                                //     foodCalory:this.state.foodCalory,
                                //     waterOfCup:this.state.waterOfCup,
                                //     sleepHour:this.state.sleepHour,
                                //     sportsStep:this.state.sportsStep,
                                //     dabianTimes:this.state.dabianTimes,
                                //     tireTimes:this.state.tireTimes,
                                //     sighTimes:this.state.sighTimes,
                                //     eatBreakfastOption:this.state.eatBreakfastOption,
                                //     skinDryOption:this.state.skinDryOption,
                                //     nerverousOption:this.state.nerverousOption,
                                //     sentimantOption:this.state.sentimantOption,
                                //     sweatOption:this.state.sweatOption,
                                //     bodyStatesOption:this.state.bodyStatesOption,
                                //     senceStatesOption:this.state.senceStatesOption,
                                //     urineColor: (new tinycolor(this.state.urineColor)).toHsvString(),
                                //     lipColor: (new tinycolor(this.state.lipColor)).toHsvString(),
                                // };
                                // if (DataUploadUtil.uploadHealthData(data,URL)){
                                //     this.refs.toast.show('上传成功');
                                // }
                                this.refs.toast.show('上传成功');
                            }}/>
                        </View>
                    </ScrollView>
                </View>
                <Toast ref={'toast'} position={'center'}/>
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
        flexDirection:'row',
    },
    item_uploader_container:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_label:{
        flex:0.3,
        fontSize:20,
        textAlign: 'left',
        textAlignVertical:'center',
    },
    item_input:{
        flex:0.6,
        fontSize:20,
    },
    item_measure:{
        flex:0.1,
        fontSize:20,
        textAlign: 'right',
        textAlignVertical:'center',
    },
    item_radio_btn:{
        flex:0.7,
        paddingTop:5,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row',
    },
    item_color_slider:{
        flex:0.7,
    },
    item_img_uploader:{
        flex:0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_upload_btn:{
        flex:1,
    },
});
