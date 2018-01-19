/**
 * Created by century on 2017/9/1.
 */
import {i18n} from 'store'

class PlusShare {
  static shares = null;

  constructor() {
    this.shares = {};
    this.getServices();
  }

  /*
   *获取分享服务
   * */
  getServices() {
    plus.share.getServices((s) => {
      for (let i in s) {
        let t = s[i];
        this.shares[t.id] = t;
      }
    }, (e) => {
      plus.nativeUI.toast(i18n.translate('获取分享服务列表失败')+'： ' + e.message);
    });
  }

  /*
   * 打开分享
   * @param obj 要分享的对象 title, content, href,realUrl
   * @param {JSON} shareBts x 可取值： "WXSceneSession"分享到微信的“我的好友”；
   * "WXSceneTimeline"分享到微信的“朋友圈”中；
   * "WXSceneFavorite"分享到微信的“我的收藏”中。 默认值为"WXSceneSession"。
   * */
  shareShow(obj) {
    const shareBts = [];
    // 更新分享列表
    let ss = this.shares['weixin'];
    ss && ss.nativeClient && (shareBts.push({title: i18n.translate('微信朋友圈'), s: ss, x: 'WXSceneTimeline'}),
      shareBts.push({title: i18n.translate('微信好友'), s: ss, x: 'WXSceneSession'}));
    // 弹出分享列表
    shareBts.length > 0 ? plus.nativeUI.actionSheet({title: i18n.translate('分享'), cancel: i18n.translate('取消'), buttons: shareBts}, (e) => {
      (e.index > 0) && this.shareAction(shareBts[e.index - 1], true, obj);
    }) : plus.nativeUI.alert(i18n.translate('当前环境无法支持分享操作')+'!');
  }

  /**
   * 分享操作
   * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
   * @param {Boolean} bh 是否分享链接
   */
  shareAction(sb, bh, obj) {
    if (!sb || !sb.s) {
      plus.nativeUI.toast(i18n.translate('无效的分享服务')+'！');
      return;
    }
    const msg = {content: obj.content, extra: {scene: sb.x}};
    let {title, content, href, realUrl} = obj;
    if (bh) {
      msg.href = href;
      msg.content = content;
      msg.title = title;
      msg.thumbs = ['_www/static/logo.png'];
      msg.pictures = ['_www/static/logo.png'];
    } else {
      if (realUrl) {
        msg.pictures = realUrl;
      }
    }
    // 发送分享
    if (sb.s.authenticated) {  // ('---已授权---');
      this.shareMessage(msg, sb.s);
    } else {  // outLine('---未授权---');
      sb.s.authorize(() => {
        this.shareMessage(msg, sb.s);
      }, err => {
        plus.nativeUI.toast(i18n.translate('认证授权失败')+'： ' + e.code + ' - ' + e.message);
      });
    }
  }

  /*
   * 发送分享
   * */
  shareMessage(msg, s) {
    // console.log(JSON.stringify(msg));
    s.send(msg, () => {
    }, e => {
      // console.log('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
    });
  }
}
export default PlusShare
