import React, {Component} from 'react';
import {Button,Overlay,Input} from 'react-native-elements'
import '../../../Global'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    AsyncStorage,
    ActivityIndicator,
    RefreshControl, FlatList
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import actions from "../../../actions";
import {connect} from "react-redux";
import ViewUtil from "../../../utils/ViewUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import Toast from 'react-native-easy-toast';

type Props = {};
const Dimensions = require('Dimensions');
const URL = 'http://'+global.service.local_url+':8080/EfficientDr//docfindHealthCircleByDocidVerif?docid=';
const REFRESH_TITLE_COLOR = 'red';
const REFRESH_COLOR = 'red';
const REFRESH_TINT_COLOR = 'red';
const PAGE_SIZE = 10;
const WINDOW_WIDTH = Dimensions.get('window').width;
// More info on all the options is below in the API Reference... just some common use cases shown here
const CameraOptions = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};

class HealthSightUpdatePage extends Component<Props> {
    constructor(props){
        super(props);
        this.doctorid = global.doctorinfo.id.toString();
        this.state = {
            isVisible:false,
            title:'',
            content:'',
            createStamp:'',
            updateStamp:'',
            keyword:'',
            imgdata:'',
            avatarSource:'',
        };
    }

    componentDidMount(){
        this.loadData(false);
    }

    loadData(loadMore){
        const {onLoadHealthSightUpdateData,onLoadMoreHealthSightUpdateData} = this.props;
        const dataStore = this.getDataStore();
        const url = this.genFetchUrl(this.doctorid);
        if (loadMore){
            //多次载入
            onLoadMoreHealthSightUpdateData(this.doctorid,++dataStore.pageIndex,PAGE_SIZE,dataStore.items,callback=>{
                this.refs.toast.show('没有更多了');
            });
        }else {
            //首次加载
            onLoadHealthSightUpdateData(this.doctorid,url,PAGE_SIZE);
        }
    }

    genFetchUrl(key){
        return URL+key;
    }

    renderItem(item){
        return ViewUtil.getListItem(()=>this.onClick(item),item);
    }

    onClick(item){
        NavigationUtil.GoPage(item,'HealthSightUpdateDetail');
    }

    genIndicator(){
        return this.getDataStore().hideLoadingMore?
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>:null
    }

    getDataStore(){
        const {healthsightupdate} = this.props;
        let dataStore = healthsightupdate[this.diseaseSortName];
        if(!dataStore){
            dataStore = {
                items:[],
                isLoading:false,
                projectModes:[],//要显示的数据
                hideLoadingMore:false,
            }
        }
        return dataStore;
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
            dsimgurl:this.state.imgdata,
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
            }else{
                throw new Error('Response status is wrong.')
            }
        }).catch((error)=>{
            this.refs.toast.show('ERROR:'+error.toString());
        })
    }

    render() {
        let dataStore = this.getDataStore();
        return (
            <View style={styles.container}>
                <FlatList
                    data={dataStore.projectModes}
                    renderItem={({item})=>this.renderItem(item)}
                    keyExtractor={item=>item.id+""}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={REFRESH_TITLE_COLOR}
                            colors={[REFRESH_COLOR]}
                            refreshing={dataStore.isLoading}
                            onRefresh={()=>this.loadData(false)}
                            tintColor={REFRESH_TINT_COLOR}
                        />
                    }
                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        console.log('----onEndReached----')
                        //这里有个bug就是上拉一次多次触发这个方法,onMomentumScrollBegin也是为了解决这个Bug
                        setTimeout(()=>{
                            if (this.canLoadMore){
                                this.loadData(true);
                                this.canLoadMore=false;
                            }
                        },100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={()=>{
                        this.canLoadMore = true;
                        console.log('----onMomentumScrollBegin----')
                    }}
                />
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
                    <Button
                        title="取消"
                        type="outline"
                        onPress={()=>{
                            this.setState(prevState=>({
                                isVisible:!prevState.isVisible
                            }));
                        }}
                    />
                </Overlay>
                <Button
                    title="发送健康圈消息"
                    type="solid"
                    onPress={()=>this.setState(prestate=>({
                        isVisible: !prestate.isVisible,
                    }))}
                    buttonStyle={{width:0.9*WINDOW_WIDTH, marginTop:10, marginBottom:10, marginLeft:5, marginRight:5}}
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    healthsightupdate: state.healthsightupdate,
});

const mapDispatchToProps = dispatch=>({
    onLoadHealthSightUpdateData:(doctorid,url,pageSize)=>dispatch(actions.onLoadHealthSightUpdateData(doctorid,url,pageSize)),
    onLoadMoreHealthSightUpdateData: (doctorid,pageIndex,pageSize,dataArray,callBack)=>dispatch(actions.onLoadMoreHealthSightUpdateData(doctorid,pageIndex,pageSize,dataArray,callBack)),
});

export const HealthSightUpdatePageWithRedux = connect(mapStateToProps,mapDispatchToProps)(HealthSightUpdatePage);

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
