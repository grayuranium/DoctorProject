/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';

type Props = {};
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const REFRESH_TITLE_COLOR = 'red';
const REFRESH_COLOR = 'red';
const REFRESH_TINT_COLOR = 'red';
class HealthSightTab extends Component<Props> {
    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.diseaseSortName = tabLabel;
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        const {onLoadHealthSightData} = this.props;
        const url = this.genFetchUrl(this.diseaseSortName);
        onLoadHealthSightData(this.diseaseSortName,url);
    }

    genFetchUrl(key){
        return URL+key+QUERY_STR;
    }

    renderItem(data){
        const item = data.item;
        return(
            <View style={{marginBottom:10}}>
                <Text style={{backgroundColor: '#faa'}}>
                    {JSON.stringify(item)}
                </Text>
            </View>
        );
    }

    render() {
        const {healthsight} = this.props;
        let dataStore = healthsight[this.diseaseSortName];
        if(!dataStore){
            dataStore = {
                items:[],
                isLoading:false,
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={dataStore.items}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>item.id+""}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={REFRESH_TITLE_COLOR}
                            colors={[REFRESH_COLOR]}
                            refreshing={dataStore.isLoading}
                            onRefresh={()=>this.loadData()}
                            tintColor={REFRESH_TINT_COLOR}
                        />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    healthsight: state.healthsight,
});

const mapDispatchToProps = dispatch=>({
    onLoadHealthSightData:(diseaseSortName,url)=>dispatch(actions.onLoadHealthSightData(diseaseSortName,url))
});

export const HealthSightTabWithRedux = connect(mapStateToProps,mapDispatchToProps)(HealthSightTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
