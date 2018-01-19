import fetch from '../utils/fetch'
import {moduleIds} from 'utils/applyModule'
//申请验证码
export function getHandphoneVCode(data){
	return fetch({
		url: `/sys/applyTrial/getHandphoneVCode`,
		method: 'get',
    	params: data,
    	// msgCode:code+'001'
	})
}
//验证码校验
export function validatorHandphomeVCode(data){
	return fetch({
		url: `/sys/applyTrial/validatorHandphomeVCode`,
		method: 'post',
    	data,
    	// msgCode:code+'001'
	})
}
//提交申请
export function addApply(data){
	return fetch({
		url: `/sys/applyTrial/addApply`,
		method: 'post',
    	data,
    	// msgCode:code+'001'
	})
}