/**
 * Created by century on 2017/7/19.
 */
import fetch from '../utils/fetch'
import axios from 'axios'

const code = '01'
//组织公共-组织全级部门及用户树查询
export function queryAllDeptAndUserTree(count) {
  return fetch({
    url: `/org/combase/queryAllDeptAndUserTree?isUserCount=${count}`,
    method: 'get',
    msgCode:code+'001'
  })
}
//基础-登录用户应用模块查询
export function queryModule() {
  return fetch({
    url: `/sys/load/queryModule`,
    method: 'get',
    msgCode:code+'002'
  })
}
//组织公共-用户系统数据字典查询
export function querySysDictionary() {
  return fetch({
    url: `/org/combase/querySysDictionary?dictTypeCode=DICT_SYS_MODULE_CATEGORY`,
    method: 'get',
    msgCode:code+'003'
  })
}
//组织公共-用户权限门店区域树查询
export function queryPrmUserShopRegionTree() {
  return fetch({
    url: `/org/combase/queryPrmUserShopRegionTree`,
    method: 'get',
    msgCode:code+'004'
  })
}
//组织公共-用户权限门店区域查询
export function queryPrmUserShop(deptId) {
  return fetch({
    url: `/org/combase/queryPrmUserShop?deptId=${deptId}`,
    method: 'get',
    msgCode:code+'005'
  })
}
//组织公共-用户权限门店区域树查询
export function queryDeptExtendPosition(id) {
  return fetch({
    url: `/org/combase/queryDeptExtendPosition?id=${id}`,
    method: 'get',
    msgCode:code+'006'
  })
}
//组织公共-用户权限门店区域树查询
export function queryPrmUserRegionAllShop(deptId) {
  return fetch({
    url: `/org/combase/queryPrmUserRegionAllShop?deptId=${deptId}`,
    method: 'get',
    msgCode:code+'007'
  })
}
//组织公共-用户部门IPC查询
export function queryIpcByDeptId(deptId) {
  return fetch({
    url: `/org/combase/queryIpcByDeptId?deptId=${deptId}`,
    method: 'get',
    msgCode:code+'008'
  })
}
//组织公共-用户消息列表查询
export function queryMsgReocordList(data) {
  return fetch({
    url: `/org/combase/queryMsgReocordList`,
    method: 'get',
    params: data,
    msgCode:code+'009'
  })
}
//组织公共-用户消息读取状态修改
export function updateMsgReocordRead(id) {
  return fetch({
    url: `/org/combase/updateMsgReocordRead`,
    method: 'put',
    data: {id},
    msgCode:code+'010'
  })
}
//组织公共-当前登录用户详情查询
export function queryUserDetail() {
  return fetch({
    url: `/org/combase/queryUserDetail`,
    method: 'get',
    msgCode:code+'011'
  })
}
//组织公共-组织及用户最后更新时间查询
export function queryOrgDeptUserLastUpdateTime() {
  return fetch({
    url: `/org/combase/queryOrgDeptUserLastUpdateTime`,
    method: 'get',
    msgCode:code+'012'
  })
}
//组织公共-指定用户详情查询
export function queryUserDetailById(id) {
  return fetch({
    url: `/org/combase/queryUserDetailById?id=${id}`,
    method: 'get',
    msgCode:code+'013'
  })
}
//组织公共-登录用户信息修改
export function updateLoginUser(data) {
  return fetch({
    url: `/org/combase/updateLoginUser`,
    method: 'put',
    data,
    msgCode:code+'014'
  })
}
//组织公共-登录用户信息修改
export function querySystemBySysCode() {
  return fetch({
    url: `/org/combase/querySystemBySysCode?sysCode=${process.env.SYS_CODE}`,
    method: 'get',
    msgCode:code+'015'
  })
}
//组织公共-萤石云token获取
export function queryYsAccessToken() {
  return fetch({
    url: `/org/combase/queryYsAccessToken`,
    method: 'get',
    msgCode:code+'016'
  })
}
