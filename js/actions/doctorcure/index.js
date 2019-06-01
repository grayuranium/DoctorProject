import Types from '../types'
import DataStorageUtil from "../../utils/DataStorageUtil";

/**
 * 异步加载科室医生列表（首次加载）
 * @param officeName
 * @param url
 * @returns {Function}
 */
export function onLoadDoctorCureData(officeName,url, pageSize) {
    return dispatch=>{
        dispatch({
            type:Types.DOCTORCURE_LIST_REFRESH,
            officeName:officeName,
        });
        let DataStore = new DataStorageUtil();
        //异步action
        DataStore.fetchData(url)
            .then(data=>{
                //数据加载成功
                let outFixItems = new Array();
                let fixItems = new Array();
                if (data&&data.data&&data.data.doctors) {
                    outFixItems = data.data.doctors;//获取本次搜索到的所有数据
                }
                for (let i=0;i<outFixItems.length;i++){
                    let doctor = outFixItems[i].doctor
                    doctor = {
                        ...doctor,
                        onlineTocken:outFixItems[i].onlineTocken,
                    }
                    fixItems[i] = doctor;
                }
                dispatch({
                    type: Types.DOCTORCURE_LIST_LOAD_SUCCESSFUL,
                    items:fixItems,
                    projectModes:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),//第一次要加载的数据
                    officeName:officeName,
                    pageIndex:1,
                })
            })
            .catch(error=>{
                //数据加载失败
                console.log(error);
                dispatch({
                    type:Types.DOCTORCURE_LIST_LOAD_FAILED,
                    officeName:officeName,
                    error:error,
                });
            })
    }
}

/**
 * 上拉刷新科室医生列表（多次加载）
 * @param officeName
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param callBack
 * @returns {Function}
 */
export function onLoadMoreDoctorCureData(officeName,pageIndex,pageSize,dataArray=[],callBack) {
    return dispatch=>{
        setTimeout(()=>{
            if ((pageIndex-1)*pageSize>=dataArray.length){
                //在上一页就已经加载完全部数据了
                if (typeof callBack === 'function'){
                    callBack('no more');
                }
                dispatch({
                    type:Types.DOCTORCURE_LIST_LOAD_MORE_FAILED,
                    error: 'no more',
                    officeName:officeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray,//所有数据
                });
            }else {
                //本次是否可以完全载入
                let max = pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                dispatch({
                    type:Types.DOCTORCURE_LIST_LOAD_MORE_SUCCESSFUL,
                    officeName:officeName,
                    pageIndex:pageIndex,
                    projectModes: dataArray.slice(0,max),//一开始到显示的最后一个的数据
                })
            }
        },500);
    }
}
