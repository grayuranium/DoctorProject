import Types from '../types'
import DataStorageUtil from "../../utils/DataStorageUtil";

/**
 * 异步加载健康圈列表（首次加载）
 * @param diseaseSortName
 * @param url
 * @returns {Function}
 */
export function onLoadHealthSightUpdateData(doctorid,url, pageSize) {
    return dispatch=>{
        dispatch({
            type:Types.HEALTHSIGHTUPDATE_REFRESH,
            diseaseSortName:doctorid,
        });
        let DataStore = new DataStorageUtil();
        //异步action
        DataStore.fetchData(url)
            .then(data=>{
                //数据加载成功
                let fixItems = new Array();
                if (data&&data.data&&data.data.data) {
                    fixItems = data.data.data;//获取本次搜索到的所有数据
                }
                dispatch({
                    type: Types.HEALTHSIGHTUPDATE_LOAD_SUCCESSFUL,
                    items:fixItems,
                    projectModes:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),//第一次要加载的数据
                    diseaseSortName:doctorid,
                    pageIndex:1,
                })
            })
            .catch(error=>{
                //数据加载失败
                console.log(error);
                dispatch({
                    type:Types.HEALTHSIGHTUPDATE_LOAD_FAILED,
                    diseaseSortName:doctorid,
                    error:error,
                });
            })
    }
}

/**
 * 上拉刷新健康圈列表（多次加载）
 * @param diseaseSortName
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param callBack
 * @returns {Function}
 */
export function onLoadMoreHealthSightUpdateData(doctorid,pageIndex,pageSize,dataArray=[],callBack) {
    return dispatch=>{
        setTimeout(()=>{
            if ((pageIndex-1)*pageSize>=dataArray.length){
                //在上一页就已经加载完全部数据了
                if (typeof callBack === 'function'){
                    callBack('no more');
                }
                dispatch({
                    type:Types.HEALTHSIGHTUPDATE_LOAD_MORE_FAILED,
                    error: 'no more',
                    diseaseSortName:doctorid,
                    pageIndex:--pageIndex,
                    projectModes:dataArray,//所有数据
                });
            }else {
                //本次是否可以完全载入
                let max = pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                dispatch({
                    type:Types.HEALTHSIGHTUPDATE_LOAD_MORE_SUCCESSFUL,
                    diseaseSortName:doctorid,
                    pageIndex:pageIndex,
                    projectModes: dataArray.slice(0,max),//一开始到显示的最后一个的数据
                })
            }
        },500);
    }
}