/**
 * Created by century on 2017/7/20.
 */
import store from 'store'
import {
  dateFormat
} from 'vux'

export function chOrEn(val) {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
  if (reg.test(val)) return true //汉字
  return false
}

export function applyName() {
  let obj = {};
  if (!store.getters.defalutApp) {
    obj = {
      id: 100,
      moduleName: '快捷',
      logoUrl: '',
      moduleType: 'quick'
    }
    store.commit('SET_DEFALUTAPP', JSON.stringify(obj));
    return obj.moduleType
  }
  return JSON.parse(store.getters.defalutApp).moduleType;
}


/*获取时间格式数据*/
export function getTimeStampfunction() {
  let date = null;
  if (arguments[0] == "" || arguments[0] == null) {
    date = new Date();
  } else {
    date = new Date(arguments[0]);
  }
  let year = date.getFullYear();
  let month = date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  let hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  let min = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  let scd = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  if (arguments[1] == 1) {
    return year + "-" + month + "-" + day;
  } else if (arguments[1] == 2) {
    return year + "年" + month + "月" + day + "日 ";
  } else if (arguments[1] == 3) {
    return year + "-" + month + "-" + day + " " + hour + ":" + min;
  } else if (arguments[1] == 4) {
    return year + "/" + month + "/" + day + " " + hour + ":" + min;
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + scd;
}

export function showLongTime(LongTime) {
  let time = (typeof LongTime === 'number') ? dateFormat(new Date(LongTime), 'YYYY-MM-DD HH:mm:ss') : LongTime
  let currentTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
  if (time.substr(0, 7) === currentTime.substr(0, 7)) {
    if (time.substr(0, 10) === currentTime.substr(0, 10)) return "今天" + time.substr(11, 5);
    return "今天" + time.substr(11, 5);
    if (new Date(time).getDate() + 1 === new Date(currentTime).getDate()) return "昨天" + time.substr(11, 5);
    return time.substr(5, 5);
  }
  if (time.substr(0, 4) === currentTime.substr(0, 4)) return time.substr(5, 5); //今年
  return time.substr(0, 10); //早些年月
}
export function exAlarmType() {
  switch (arguments[0]) {
    case 0:
      return '断线报警'
      break;
    default:
      return '越界报警'
      break;
  }
}

export function exAlarmState() {
  switch (arguments[0]) {
    case 0:
      return '预警'
      break;
    case 1:
      return '报警'
      break;
    default:
      return '报警解除'
      break;
  }
}

// 克隆对象
export const deepClone = (obj) => {
  if (typeof obj === '') {}
  const proto = Object.getPrototypeOf(obj);
  return Object.assign({}, Object.create(proto), obj);
}

export function shorten(str, num) {
  num = num || 2;
  if (!str) return str;
  let newstr = "";
  const strNum = str.length;
  const provideNumber = num;
  const rowNumber = Math.ceil(strNum / provideNumber);
  if (strNum > provideNumber) {
    for (let p = 0; p < rowNumber; p++) {
      let tempStr = "";
      const start = p * provideNumber;
      const end = start + provideNumber;
      if (p === rowNumber - 1) {
        tempStr = str.substring(start, strNum);
      } else {
        tempStr = str.substring(start, end) + "\n";
      }
      newstr += tempStr;
    }
  } else {
    newstr = str;
  }
  return newstr
}

export function formatSeconds(value, type) {
  value = value / 1000;
  let theTime = parseInt(value); // 秒
  let theTime1 = 0; // 分
  let theTime2 = 0; // 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  // let result = "" + parseInt(theTime) + "秒";
  let result = type ? "" : "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}
