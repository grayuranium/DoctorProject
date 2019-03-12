import {AsyncStorage} from 'react-native';

export default class DataStore {
    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url,data,callback){
        if (!data||!url)return;
        AsyncStorage.setItem(url,JSON.stringify(this._warpData(data)),callback);
    }

    /**
     * 为网络数据添加时间戳
     * @param data
     * @returns {{data: *, timestamp: number}}
     * @private
     */
    _warpData(data){
        return{data:data,timestamp:new Date().getTime()};
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise<any> | Promise<*>}
     */
    fetchLocalData(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url)
                .then(value => {
                    try {
                        resolve(JSON.parse(value));
                    }catch (e) {
                        reject(e);
                        console.error(e);
                    }
                })
                .catch((error)=>{
                    reject(error);
                    console.error(error);
                })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise<any> | Promise<*>}
     */
    fetchNetData(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then((response)=>{
                    if (response.ok){
                        return response.json();
                    }
                    throw new Error ('Network response was not ok.')
                })
                .then((responseData)=>{
                    this.saveData(url,responseData);
                    resolve(responseData);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    /**
     * 获取数据，优先获取本地数据
     * @param url
     * @returns {Promise<any> | Promise<*>}
     */
    fetchData(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalData(url)
                .then((wrapData)=>{
                    if (wrapData&&DataStore.checkTimestampValid(wrapData.timestamp)){
                        //本地已有数据，取本地数据
                        resolve(wrapData);
                    }else {
                        //本地没有数据，从网上获取数据
                        this.fetchNetData(url)
                            .then((data)=>{
                                resolve(this._warpData(data));
                            })
                            .catch((error)=>{
                                reject(error);
                            })
                    }
                })
                .catch((error)=>{
                    //操作出现问题,从网上获取数据
                    this.fetchNetData(url)
                        .then((data)=>{
                            resolve(this._warpData(data));
                        })
                        .catch((error)=>{
                            reject(error);
                        })
                })
        })
    }

    /**
     * 校验本地数据是否在有效期内
     * @param timestamp
     * @returns {boolean}
     */
    static checkTimestampValid(timestamp){
        const CURRENT_DATE = new Date();
        const TARGET_DATE = new Date();
        TARGET_DATE.setTime(timestamp);
        if (CURRENT_DATE.getMonth()!==TARGET_DATE.getMonth()) return false;
        if (CURRENT_DATE.getDate()!==TARGET_DATE.getDate()) return false;
        if (CURRENT_DATE.getHours()-TARGET_DATE.getHours()>4) return false;//有效期大于4小时
        return true;
    }
}