import React, {Component} from 'react';

export default class DateUtil {

    /**
     * 时间戳转日期
     * @param nS
     * @returns {string}
     */
    static getLocalTime(nS){
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
    }

    /**
     * 日期转字符串
     * @param date
     * @returns {string}
     */
    static dateToString(date){
        let year = date.getFullYear();
        let month =(date.getMonth() + 1).toString();
        let day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        let dateTime = year + "-" + month + "-" + day;
        return dateTime;
    }
}