/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
import './Global.js'
import {AppReduxWithNavigation} from './navigators/AppNavigator'
import {InnerNaviBar} from 'react-native-pure-navigation-bar';

//默认导航栏选项
//Android半透明模式
// InnerNaviBar.defaultProps.isTranslucent = true;
//自动关闭键盘
InnerNaviBar.defaultProps.autoCloseKeyboard = true;
//硬件返回支持
InnerNaviBar.defaultProps.autoHardwareBack = true;
//单击锁定
InnerNaviBar.defaultProps.disableLock = true;
//返回按钮文本
InnerNaviBar.defaultProps.gobackText = '返回';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
          <AppReduxWithNavigation/>
        </Provider>
    );
  }
}
