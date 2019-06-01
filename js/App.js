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
