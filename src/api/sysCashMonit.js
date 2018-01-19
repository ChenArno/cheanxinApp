/**
 * Created by century on 2017/8/16.
 */
import fetch from '../utils/fetch'
import {dateFormat} from 'vux'
import {moduleIds} from 'utils/applyModule'

const code = moduleIds[9];


// 收银记录查询
 export  function queryTradeRecordList(data) {
 	return fetch({
 	 	url:`/chm/appTrade/queryTradeRecordList`,
 		method: 'get',
    	params: data,
    	msgCode:code+'001'
 	})
}
//单条详细信息查询
export function queryTradeRecordDetail(data){ 
	return fetch({
		url:`/chm/appTrade/queryTradeRecordDetail`,
		method:'get',
		params:data,
		msgCode:code+'002'
	})
}
