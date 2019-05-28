import React,{Component} from 'react';
import {ViewPropTypes,View,StatusBar,StyleSheet,Text,Platform} from 'react-native';
import PropTypes from 'prop-types';

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
    barStyle:PropTypes.oneOf(['light-content','default']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string,
};

/**
 * 自定义导航栏,用是能用但是太挫了,还是用了三方插件
 */
export default class NavigationBar extends Component{
    //自定义props类型检查
    static propTypes = {
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide:PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),//状态栏props类型
        rightButton:PropTypes.element,
        leftButton:PropTypes.element,
    };

    //设置默认属性
    static defaultProps = {
        statusBar:{
            barStyle: 'light-content',
            hidden:false,
        },
    };

    //设置左右按钮
    getButtonElement(data){
        return(
            <View>
                {data?data:null}
            </View>
        );
    }

    render() {
        //状态栏
        let statusBar = this.props.statusBar.hidden?null:
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>;

        let titleView = this.props.titleView?this.props.titleView:
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

        //导航栏
        let content = this.props.hide?null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;

        return(
            <View style={[styles.NavigationBarContainer,this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarButton:{
        alignItems:'center',
    },
    navBar:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height:Platform.OS==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0,
    },
    NavigationBarContainer:{
        backgroundColor:'#789',
    },
    title:{
        fontSize:20,
        color:'black',
    },
    statusBar:{
        height: Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
    },
})