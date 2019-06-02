import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Keyboard,Platform,StatusBar} from 'react-native';
import {GiftedChat,Bubble,Avatar} from 'react-native-gifted-chat'

type Props = {};
export default class PatientCureTalk extends Component<Props> {
    constructor(props){
        super(props);
        //接收上一页面传来的医生数据
        const {sendertoken} = this.props.navigation.state.params;
        this.onlineTocken = sendertoken;
        //设置giftedchat需要的state
        this.state = {
            messages: [],
            userData:{
                userId:global.userinfo.id,
                userName:global.userinfo.name,
                avatar: 'https://placeimg.com/140/140/any',
            },
            messageId: 0,
            moreData:'',
            isMore:true,
            contentHeight:0,
            Currentpage:1,
        }
        //设置接收回调
        global.ws.onmessage = (e)=>{
            let msg = e.data;
        }
        //设置用户头像和气泡
        this.renderBubble = this.renderBubble.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
    }

    componentDidMount(){
        //测试接收数据
        // setTimeout(()=>{
        //     this.setState({
        //         messages: [
        //             {
        //                 _id: 2,
        //                 text: '微信小程序开发的基本流程',
        //                 createdAt: new Date('2018-10-25T15:41:00+08:00'),
        //                 user: {
        //                     _id: 1,
        //                     name: 'jackson影琪',
        //                     avatar: 'https://placeimg.com/140/140/any',
        //                 },
        //             },
        //             {
        //                 _id: 1,
        //                 text: 'Hello jackson影琪',
        //                 createdAt: new Date('2016-06-07T10:00:00+08:00'),
        //                 user: {
        //                     _id: 2,
        //                     name: 'jackson',
        //                     avatar: 'https://placeimg.com/140/140/any'
        //                 },
        //                 image: 'https://pic.cnblogs.com/avatar/1040068/20181013100635.png',
        //             },
        //         ],
        //     })
        // },2000)
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        this.doSend(messages[this.state.messageId].text);
        this.setState(previousState => ({
            messageId:previousState.messageId+1,
        }))
    }

    doSend = (message) => {
        let messageObj = {
            receivertoken:this.onlineTocken,
            content:message,
        };
        let messageJson = JSON.stringify(messageObj);
        global.ws.send(messageJson);
    }

    //气泡
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#ffffff',
                    },
                    right: {
                        backgroundColor: '#1fb922',
                    }
                }}
            />
        );
    }

    //头像
    renderAvatar(props) {
        return (
            <Avatar
                {...props}
            />
        );
    }

    //加载更早的数据
    onLoadEarlier = () => {
        this.state.Currentpage += 1;
        this.setState({
            isMore: true,
            moreData: '正在加载更多...'
        });
        //this.getMessageData();//加载更多的逻辑代码在这里写
    }

    //加载更多界面
    getMessageData(){
        setTimeout(()=>{

        },2000);
        this.setState({
            isMore: false,
            moreData: ''
        });
    }

    //上拉加载//翻页
    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if (y + height >= contentHeight - 20 && y > 0 && this.state.contentHeight != contentHeight) {//上拉下一页
            this.state.contentHeight=contentHeight
            this.onLoadEarlier()
        }
        else if (y < 0 || y == 0) {//下拉上一页ios

        }
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1,}}
                onPress={() => { Keyboard.dismiss() }}
            >
                <GiftedChat
                    //   onPressAvatar={()=>{alert('Keyboard.dismiss'); Keyboard.dismiss()}}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}//发送消息
                    renderBubble={this.renderBubble}//气泡
                    renderAvatar={this.renderAvatar}//头像
                    showUserAvatar={true}// 显示发送方的头像
                    showAvatarForEveryMessage={true}//每条消息都显示头像
                    //onLongPress={()=>{alert('onLongPress')}}
                    // 输入组件
                    placeholder={'请输入内容'}
                    // label={'发送'}
                    containerStyle={{ marginBottom: 2 }}
                    children={
                        <View style={styles.buttonBoxBorder}>
                            <Text style={styles.buttonText}>发送</Text>
                        </View>
                    }//渲染发送按钮
                    // textStyle={{ color: '#70b24e' }}
                    timeFormat={'MM月DD日 HH:mm:ss'}
                    dateFormat={'YYYY年MM月DD日'}
                    // locale={'zh-cn'}
                    isAnimated={true}
                    // renderAvatarOnTop={true}
                    user={this.state.userData}

                    // 系统消息样式
                    wrapperStyle={{ paddingLeft: 12, paddingRight: 12 }}
                    textStyle={{ lineHeight: 20 }}
                    //加载更多消息
                    loadEarlier={this.state.isMore}//
                    isLoadingEarlier={this.state.isMore}//
                    renderLoadEarlier={() => {
                        return (
                            <Text style={styles.LookMoreStyle}  onPress={this.onLoadEarlier}>{this.state.moreData}</Text>
                        );
                    }}

                    listViewProps={{
                        // //ListView/FlatView中标识是否可以加载更多(当现在获取到的数据已经是全部了,不能再继续获取数据了,则设为false,当还有数据可以获取则设为true)
                        canLoad: true,
                        //标识现在是否ListView/FlatView现在正在加载(根据这个值来决定是否显示"正在加载的cell")(loadMore()方法进去后设为true,fetch加载完数据后设为false)
                        isLoadding: false,
                        //是否显示下拉刷新的cell
                        ifShowRefresh: true,
                        //ListView/FlatList是否可以滚动
                        scrollEnabled: true,
                        //记录当前加载到了哪一页
                        page: 1,
                        onScroll:this._onScroll.bind(this)
                    }}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    },
    buttonBoxBorder: {
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "#70b24e",
        borderColor: "#70b24e",
        marginRight: 12,
        marginBottom: 6,
    },
    LookMoreStyle:{
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        color: 'gray',
    },
})
