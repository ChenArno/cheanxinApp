/**
 * Created by century on 2017/8/8.
 */

export const moduleIds = [13, 20, 25, 26, 21, 22, 23, 24, 27, 28, 31, 32, 16,33,34];

export function switchName(obj, ref) {
  let name = '';
  let str = !ref ? obj.id : obj[ref]
  switch (str) {
    case moduleIds[1]:
      name = 'sysExhib';   //展保系统
      break;
    case moduleIds[0]:
      name = 'sysCruiseShop';  //巡店系统
      break;
    case moduleIds[2]:
      name = 'sysTemMon';  //温湿监控系统
      break;
    case moduleIds[3]:
      name = 'sysPasFlow';  //客流流计系统
      break;
    case moduleIds[4]:
      name = 'sysData';  //运营维度  analyOpera
      break;
    case moduleIds[5]:
      name = 'sysData';  //员工维度  analyStaff
      break;
    case moduleIds[6]:
      name = 'sysData';  //顾客维度  analyCustom
      break;
    case moduleIds[7]:
      name = 'sysData';  //货品维度  analyGoods
      break;
    case moduleIds[8]:
      name = 'sysStoreParam';  //门店台账
      break;
    case moduleIds[9]:
      name = 'sysCashMonit';  //收银监控
      break;
    case moduleIds[10]:
      name = 'sysHotAnaly';  //热点分析
      break;
    case moduleIds[11]:     //EAS
      name = 'sysEas';
      break;
    case moduleIds[12]:     //设备中心
      name = 'sysDeviceControl';
      break;
    case moduleIds[13]:     //资产管理
      name = 'sysEam';
      break;
    case moduleIds[14]:     //RFID库存
      name = 'sysRFID';
      break;
    default:
      name = 'quick';
      break;
  }
  obj.moduleType = name;
  return obj
}
