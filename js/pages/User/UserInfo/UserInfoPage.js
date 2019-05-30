import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {USER_MENU,USER_CHILD_MENU} from '../../../res/data/UserMenuData'
import ViewUtil from "../../../utils/ViewUtil";
import NavigationUtil from "../../../utils/NavigationUtil";

type Props = {};
const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
export default class UserInfoPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            userInformation:false,
            styleChange:false,
        };
    }

    onClick(menu){
        // let RouteName,params = {};
        // switch (menu) {
        //     case USER_MENU.About_Author:
        //         RouteName = '';
        //         break;
        //     default:
        //         break;
        // }
        // if (RouteName){
        //     NavigationUtil.GoPage(params,RouteName);
        // }
    }

    onRenderItem(menu){
        return ViewUtil.getUserMenuItem(()=>this.onClick(menu),menu,null,null);
    }

    onRenderFoldItem(menu,key,isShow){
        return ViewUtil.getSettingItem(()=>{
            this.setState({
                [key]:!this.state[key],
            });
        },menu.name,null,menu.Icons,menu.icon,isShow?'ios-arrow-up':'ios-arrow-down');
    }

    onRenderListItem(dic){
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(()=>this.onClick(dic[i]),dic[i].name,null,null,null,null)}
                </View>
            )
        }
        return views;
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <ParallaxScrollView
                onScroll={onScroll}
                backgroundColor="#333"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundScrollSpeed={10}

                renderBackground={() => (
                    <View key="background">
                        <Image source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT}}/>
                        <View style={{position: 'absolute',
                            top:0,
                            width: window.width,
                            backgroundColor: 'rgba(0,0,0,.4)',
                            height: PARALLAX_HEADER_HEIGHT}}/>
                    </View>
                )}

                renderForeground={() => (
                    <View key="parallax-header" style={ styles.parallaxHeader }>
                        <Image style={ styles.avatar } source={{
                            uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE
                        }}/>
                        <Text style={ styles.sectionSpeakerText }>
                            Talks by Rich Hickey
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            CTO of Cognitec, Creator of Clojure
                        </Text>
                    </View>
                )}

                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
                    </View>
                )}

                renderFixedHeader={() => (
                    <View key="fixed-header" style={styles.fixedSection}>
                        {ViewUtil.getLeftBackButton(()=>NavigationUtil.BackToHomePage(this.props))}
                        {ViewUtil.getShareButton(()=>{

                        })}
                    </View>
                )}>
                {this.onRenderFoldItem(USER_MENU.User_Information,'userInformation',this.state.userInformation)}
                {this.state.userInformation?this.onRenderListItem(USER_CHILD_MENU.User_Information):null}
                {this.onRenderFoldItem(USER_MENU.Style_Change,'styleChange',this.state.styleChange)}
                {this.state.styleChange?this.onRenderListItem(USER_CHILD_MENU.Style_Change):null}
                {this.onRenderItem(USER_MENU.Related_Website)}
                {this.onRenderItem(USER_MENU.Version_Update)}
                {this.onRenderItem(USER_MENU.About_Author)}
                {this.onRenderItem(USER_MENU.Connect_Withus)}
            </ParallaxScrollView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'center',
        alignItems:'center',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        marginLeft:100,
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left:0,
        top:0,
        paddingRight:5,
        paddingTop:(Platform.OS==='ios'?20:0),
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
});
