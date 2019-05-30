import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import {HueSlider} from 'react-native-color';
import tinycolor from 'tinycolor2';
import ImagePicker  from 'react-native-image-picker';
import NaviBar from 'react-native-pure-navigation-bar';
import Toast from 'react-native-easy-toast';
import DataUploadUtil from "../../../utils/DataUploadUtil";
import ViewUtil from "../../../utils/ViewUtil";

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
const {width,height} = Dimensions.get('window');
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
        const style = selected ? { fontWeight: 'bold', marginRight:50, fontSize:16} : {marginRight:50, fontSize:16};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderMultipleRadioOption = (option, selected, onSelect, index)=>{
        const style = selected ? { fontWeight: 'bold', marginRight:10, fontSize:16} : {marginRight:10, fontSize:16};

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
            </TouchableWithoutFeedback>
        );
    }

    renderRadioContainer = optionsNodes=>{
        return <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:100,}}>{optionsNodes}</View>;
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

    //渲染输入框格式的列表项
    onInputItemRender(title,measure,key){
        return <View style={styles.item_container}>
            <Text style={styles.item_label}>{title}</Text>
            <TextInput style={styles.item_input} onChangeText={text=>this.setState({
                [key]:text,}
            )}/>
            <Text style={styles.item_measure}>{measure}</Text>
        </View>;
    }

    //渲染双选选择框格式的列表项
    onRadioItemRender(title,options,key){
        return <View style={styles.item_container}>
            <Text style={styles.item_label}>{title}</Text>
            <View style={styles.item_radio_btn}>
                <RadioButtons
                    options={options}
                    onSelection={(selectedOption)=>{
                        if (selectedOption===options[0]) {
                            this.setState({
                                [key]:true,
                            });
                        }else {
                            this.setState({
                                [key]:false,
                            });
                        }
                    }}
                    selectedOption={this.state[key]?options[0]:options[1]}
                    renderOption={this.renderRadioOption}
                    renderContainer={this.renderRadioContainer}
                />
            </View>
        </View>;
    }

    //渲染多选选择框格式的列表项
    onMultipleRadioItemRender(title,options,key,){
        return <View style={styles.item_container}>
            <Text style={styles.item_label}>{title}</Text>
            <View style={styles.item_radio_btn}>
                <RadioButtons
                    options={options}
                    onSelection={(selectedOption)=>{
                        for(let i=0;i<options.length;i++){
                            if (selectedOption===options[i]){
                                this.setState({
                                    [key]:i,
                                });
                                break;
                            }
                        }
                    }}
                    selectedOption={options[this.state[key]]}
                    renderOption={this.renderMultipleRadioOption}
                    renderContainer={this.renderRadioContainer}
                />
            </View>
        </View>;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NaviBar
                    title='健康记录'
                />
                <View style={styles.container_stretch}>
                    <ScrollView>
                        {ViewUtil.getSeparator('基础指标')}
                        {this.onInputItemRender('体重：','kg','weight')}
                        {this.onInputItemRender('身高：','cm','height')}
                        {ViewUtil.getSeparator('体质指标')}
                        {this.onInputItemRender('食物热量：','kCal','foodCalory')}
                        {this.onInputItemRender('运动步数：','步','sportsStep')}
                        {this.onRadioItemRender('皮肤肤质：',SKIN_DRY_OPTIONS,'skinDryOption')}
                        {this.onMultipleRadioItemRender('出汗量：',SWEAT_OPTIONS,'sweatOption')}
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
                        {ViewUtil.getSeparator('每日习惯')}
                        {this.onInputItemRender('水摄入量：','杯','waterOfCup')}
                        {this.onInputItemRender('睡眠时间：','h','sleepHour')}
                        {this.onInputItemRender('排便次数：','次','dabianTimes')}
                        {this.onRadioItemRender('按时早饭：',EAT_BREAKFAST_OPTIONS,'eatBreakfastOption')}
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>排便：</Text>
                            <TouchableOpacity style={styles.item_img_uploader} onPress={()=>this.openCamera()}>
                                <Text style={{fontSize:16}}>上传图片</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_container}>
                            <Text style={styles.item_label}>排尿：</Text>
                            <TouchableOpacity style={styles.item_img_uploader} onPress={()=>this.openCamera()}>
                                <Text style={{fontSize:16}}>上传图片</Text>
                            </TouchableOpacity>
                        </View>
                        {ViewUtil.getSeparator('心态健康')}
                        {this.onInputItemRender('疲劳次数：','次','tireTimes')}
                        {this.onInputItemRender('叹气次数：','次','sighTimes')}
                        {this.onRadioItemRender('焦虑度：',NERVEROUS_OPTIONS,'nerverousOption')}
                        {this.onRadioItemRender('敏感度：',SETIMANT_OPTIONS,'sentimantOption')}
                        {ViewUtil.getSeparator('主观评价')}
                        {this.onMultipleRadioItemRender('身体状况：',BODY_STATES_OPTIONS,'bodyStatesOption')}
                        {this.onMultipleRadioItemRender('心情：',SENCE_STATES_OPTIONS,'senceStatesOption')}
                        <TouchableOpacity onPress={()=>{
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
                        }}>
                            <View style={[styles.item_container,{justifyContent:'center', margin:5,borderRadius: 40,backgroundColor:'blue'}]}>
                                <Text style={{fontSize:18,color:'white'}}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container_stretch: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    item_container:{
        flex:1,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:2,
        margin:3,
        borderRadius:10,
        backgroundColor: 'white',
    },
    item_uploader_container:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_label:{
        width:0.25*width,
        fontSize:16,
        fontWeight:'300',
        textAlign: 'left',
        textAlignVertical:'center',
    },
    item_input:{
        width:0.25*width,
        fontSize:16,
    },
    item_measure:{
        fontSize:16,
        textAlign: 'left',
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
        marginLeft: 40,
    },
    item_img_uploader:{
        flex:0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
