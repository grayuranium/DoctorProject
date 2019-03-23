import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import actions from '../../actions';
import NavigationUtil from "../../utils/NavigationUtil";
import ViewUtil from "../../utils/ViewUtil";

type Props = {};
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const REFRESH_TITLE_COLOR = 'red';
const REFRESH_COLOR = 'red';
const REFRESH_TINT_COLOR = 'red';
const PAGE_SIZE = 10;
class HealthSightTab extends Component<Props> {
    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.diseaseSortName = tabLabel;
    }

    componentDidMount(){
        this.loadData(false);
    }

    loadData(loadMore){
        const {onLoadHealthSightData,onLoadMoreHealthSightData} = this.props;
        const dataStore = this.getDataStore();
        const url = this.genFetchUrl(this.diseaseSortName);
        if (loadMore){
            //多次载入
            onLoadMoreHealthSightData(this.diseaseSortName,++dataStore.pageIndex,PAGE_SIZE,dataStore.items,callback=>{
                this.refs.toast.show('没有更多了');
            });
        }else {
            //首次加载
            onLoadHealthSightData(this.diseaseSortName,url,PAGE_SIZE);
        }
    }

    getDataStore(){
        const {healthsight} = this.props;
        let dataStore = healthsight[this.diseaseSortName];
        if(!dataStore){
            dataStore = {
                items:[],
                isLoading:false,
                projectModes:[],//要显示的数据
                hideLoadingMore:true,
            }
        }
        return dataStore;
    }

    genFetchUrl(key){
        return URL+key+QUERY_STR;
    }

    renderItem(item){
        return ViewUtil.getListItem(()=>this.onClick(item),item);
    }

    onClick(item){
        NavigationUtil.GoPage(null,'HealthSightDetail');
    }

    genIndicator(){
        return this.getDataStore().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>
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
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    healthsight: state.healthsight,
});

const mapDispatchToProps = dispatch=>({
    onLoadHealthSightData:(diseaseSortName,url,pageSize)=>dispatch(actions.onLoadHealthSightData(diseaseSortName,url,pageSize)),
    onLoadMoreHealthSightData: (diseaseSortName,pageIndex,pageSize,dataArray,callBack)=>dispatch(actions.onLoadMoreHealthSightData(diseaseSortName,pageIndex,pageSize,dataArray,callBack)),
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
    indicatorContainer:{
        alignItems: 'center',
    },
    indicator:{
        color:'red',
        margin: 10,
    },
});
