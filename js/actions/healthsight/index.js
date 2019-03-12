import Types from '../types'
import DataStorageUtil from "../../utils/DataStorageUtil";

/**
 * 异步加载健康圈列表
 * @param diseaseSortName
 * @param url
 * @returns {Function}
 */
export function onLoadHealthSightData(diseaseSortName,url) {
    return dispatch=>{
        dispatch({
            type:Types.HEALTHSIGHT_REFRESH,
            diseaseSortName:diseaseSortName,
        });
        let DataStore = new DataStorageUtil();
        //异步action
        DataStore.fetchData(url)
            .then(data=>{
                //数据加载成功
                dispatch({
                    type: Types.HEALTHSIGHT_LOAD_SUCCESSFUL,
                    items:data&&data.data&&data.data.items,
                    diseaseSortName:diseaseSortName,
                })
            })
            .catch(error=>{
                //数据加载失败
                console.log(error);
                dispatch({
                    type:Types.HEALTHSIGHT_LOAD_FAILED,
                    diseaseSortName:diseaseSortName,
                    error:error,
                });
            })
    }
}
