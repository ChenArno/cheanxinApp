/**
 * Created by century on 2017/7/17.
 */
import fetch from '../utils/fetch'
import axios from 'axios'
import store from 'store'
let baseUrl = function () {
  return store.getters.ip + ":" + store.getters.port + process.env.MODULE_URL;
}
const code = '01'
//基础-用户登录
export const login = data => {
  return new Promise((resolve,reject)=>{
    fetch.defaults.baseURL = baseUrl();
    const newAxios = axios.create({
      baseURL:fetch.defaults.baseURL,
      timeout: 20000
    });
    data.sysCode = process.env.SYS_CODE;
    newAxios.post('/sys/login/sysLogin',data).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err);
    })
  });
}
//基础-系统登出
export function sysLogout() {
  return fetch({
    url: '/sys/login/sysLogout',
    method: 'post'
  })
}
//获取帐号手机验证码并发送短信
export function getHandphoneVCode(handphone) {
  fetch.defaults.baseURL = baseUrl();
  return fetch({
    url: `/org/register/getHandphoneVCode?handphone=${handphone}`,
    method: 'get'
  })
}
//帐号手机号验证
export function updateHandphoneValidator(data) {
  fetch.defaults.baseURL = baseUrl();
  return fetch({
    url: '/org/register/updateHandphoneValidator',
    method: 'post',
    data
  })
}
//基础-登录用户头像上传更新
export const uploadUserAuatar = `/sys/load/uploadUserAuatar`;

//基础-用户密码重置
export function updateUserPwdReset(data) {
  fetch.defaults.baseURL = baseUrl();
  return fetch({
    url: '/sys/load/updateUserPwdReset',
    method: 'put',
    data
  })
}
//获取重置密码手机验证码
export function getResetPwdHandphoneVCode(userAccount) {
  fetch.defaults.baseURL = baseUrl();
  return fetch({
    url: `/org/register/getResetPwdHandphoneVCode?userAccount=${userAccount}`,
    method: 'get'
  })
}
//帐号密码重置验证码验证
export function validatorResetPwdVCode(data) {
  fetch.defaults.baseURL = baseUrl();
  return fetch({
    url: `/org/register/validatorResetPwdVCode`,
    method: 'post',
    data
  })
}
//基础-用户密码修改
//针对登录用户自身密码的修改，要求输入新、旧密码： 1、新密码不能为空值 2、旧密码校验必须一致
export function updateUserPwd(data) {
  return fetch({
    url: `/sys/load/updateUserPwd`,
    method: 'put',
    data
  })
}
