/**
 * 全局特殊跳转工具类
 */
export default class NavigationUtil {
    /**
     * 返回主页
     * @param navigation
     * @constructor
     */
    static BackToHomePage(pros){
        const {navigation} = pros;
        navigation.navigate('AppHome')
    }

    /**
     * 回退
     * @param navigation
     * @constructor
     */
    static BackUp(navigation){
        navigation.goBack();
    }

    /**
     * 跳转到详情页面并传递参数,这里必须使用homepage的navigation
     * @param page
     * @constructor
     */
    static GoPage(props,page){
        const navigation = NavigationUtil.navigation;
        if (!navigation){
            console.log('navigation can not be null!');
            return;
        }
        if (props){
            navigation.navigate(page,props);
        }else {
            navigation.navigate(page);
        }
    }
}