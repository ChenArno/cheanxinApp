/**
 * Created by century on 2017/9/18.
 */
import {i18n} from 'store'

class plusNativeUI {
  constructor() {

  }

  actionSheet(title, buttons) {
    return new Promise((resolve, reject) => {
      let option = {};
      buttons = buttons.map(val => {
        return {
          title: val
        }
      });
      option.buttons = buttons;
      option.cancel = i18n.translate('取消');
      title && (option.title = title)
      plus.nativeUI.actionSheet(option, (e) => {
        if (e.index == 0) return resolve(false);
        resolve(e.index);
      })
    });
  }

  /*
   * 弹出系统日期选择对话框
   * minDate
   * maxDate
   * */

  pickDate(date,options) {
    return new Promise((resolve, reject) => {
      let option = date ? {date} : {}
      if(options){
        for(let i in options){
          option[i] = options[i];
        }
      }
      plus.nativeUI.pickDate((e) => {
        resolve(e.date);
      }, err => {
        reject(err.toString())
      }, option);
    })
  }
}

export default plusNativeUI
