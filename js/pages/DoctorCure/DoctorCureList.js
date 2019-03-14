import React, {Component} from 'react';
import {ActivityIndicator, Platform, StyleSheet, Text, View,FlatList,RefreshControl} from 'react-native';
import actions from "../../actions";
import {connect} from "react-redux";
import Toast from 'react-native-easy-toast';
import DoctorCureListItem from '../../common/DoctorCureListItem'

type Props = {};
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const PAGE_SIZE = 10;
const REFRESH_TITLE_COLOR = 'red';
const REFRESH_COLOR = 'red';
const REFRESH_TINT_COLOR = 'red';
class DoctorCureList extends Component<Props> {
    constructor(props){
        super(props);
        const {officeName} = this.props.navigation.state.params;
        this.officeName = officeName;
    }

    componentDidMount(){
        this.loadData(false);
    }

    loadData(loadMore){
        const {onLoadDoctorCureData,onLoadMoreDoctorCureData} = this.props;
        const dataStore = this.getDataStore();
        const url = this.genFetchUrl(this.officeName);
        if (loadMore){
            //多次载入
            onLoadMoreDoctorCureData(this.officeName,++dataStore.pageIndex,PAGE_SIZE,dataStore.items,callback=>{
                this.refs.toast.show('没有更多了');
            });
        }else {
            //首次加载
            onLoadDoctorCureData(this.officeName,url,PAGE_SIZE);
        }
    }

    getDataStore(){
        const {doctorcure} = this.props;
        let dataStore = doctorcure[this.officeName];
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

    renderItem(data){
        const item = data.item;
        const {navigation} = this.props;
        return(
            <DoctorCureListItem
                item={item}
                onSelect={()=>{
                    navigation.navigate('DoctorCureDetail',{doctorId:item.id,officeName:this.officeName});
                }}
            />
        );
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
                    renderItem={data=>this.renderItem(data)}
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
    doctorcure: state.doctorcure,
});

const mapDispatchToProps = dispatch=>({
    onLoadDoctorCureData:(officeName,url,pageSize)=>dispatch(actions.onLoadDoctorCureData(officeName,url,pageSize)),
    onLoadMoreDoctorCureData: (officeName,pageIndex,pageSize,dataArray,callBack)=>dispatch(actions.onLoadMoreDoctorCureData(officeName,pageIndex,pageSize,dataArray,callBack)),
});

export const DoctorCureListWithRedux = connect(mapStateToProps,mapDispatchToProps)(DoctorCureList);

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