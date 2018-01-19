/**
 * Created by chencheng on 2017/9/6.
 */
import store from 'store'


var index = 0;
var decimal =  null;
var result = [], counter = 0;

export function transNum(num) {
  if(/en/.test(store.getters.lan)){
    var n = num;
    if(num >= 1000){ //换算单位
      num = Math.round((num / 1000) * 100) / 100
    }
    if(num >= 1000){
      num = num.toString();
      index = num.indexOf('.')+1;
      decimal = num.slice(index);
      num = parseInt(num)
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) {
          result.unshift(',');
        }
      }
      result = result.join('') + '.' + decimal
      return result;
    }
    return num;
  }else{
    var k = num;
    if (num >= 10000) { //换算单位
      num = Math.round((num / 10000) * 100) / 100
    }
    if(num >= 10000){
      num = num.toString();
      index = num.indexOf('.') + 1;
      decimal = num.slice(index)
      num = parseInt(num)
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) {
          result.unshift(',');
        }
      }
      result = result.join('') + '.' + decimal
      return result;
    }
    return num;
  }
}
