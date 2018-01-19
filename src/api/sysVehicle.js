/**
 * Created by century on 2017/8/7.
 */
import fetch from '../utils/fetch'


export function queryCarAlarmList(params) {
  return fetch({
    url: `/dist/appCarAlarm/queryCarAlarmList`,
    method: 'get',
    params
  })
}

export function queryMonitorCarStatusList(params) {
  return fetch({
    url: `/dist/appCarMonitor/queryMonitorCarStatusList`,
    method: 'get',
    params
  })
}
// 充电管理-配送车辆充电记录图表查询
export function queryCarChargingChart(params) {
  return fetch({
    url: `/dist/appCarCharging/queryCarChargingChart`,
    method: 'get',
    params
  })
}

// 充电记录-配送车辆充电记录列表查询
export function queryCarChargingList(params) {
  return fetch({
    url: `/dist/appCarCharging/queryCarChargingList`,
    method: 'get',
    params
  })
}
// 充电记录-配送车辆充电记录查询
export function queryCarCharging(id) {
  return fetch({
    url: `/dist/appCarCharging/queryCarCharging?id=${id}`,
    method: 'get'
  })
}
export function queryCarAlarmChart(params) {
  return fetch({
    url: `/dist/appCarAlarm/queryCarAlarmChart`,
    method: 'get',
    params
  })
}
export function queryDistCarListByDriver() {
  return fetch({
    url: `/dist/appCarManager/queryDistCarListByDriver`,
    method: 'get'
  })
}
export function appqueryMonitorCarStatusList(carId) {
  return fetch({
    url: `/dist/appCarMonitor/queryMonitorCarStatusList?carId=${carId}`,
    method: 'get'
  })
}
