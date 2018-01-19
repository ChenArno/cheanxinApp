<template>
  <div class="app-cont">
    <div class="app-bar" :style="{height:getBarHeight}"></div>
    <keep-alive>
      <router-view @simClick="itemClick" :apply="apply" :getBarHeight="getBarHeight"></router-view>
    </keep-alive>
    <tabbar class="tj-tab">
      <tabbar-item :selected="index == defalut" :link="`/${tab.link}`" v-for="(tab,index) in tabs" :key="tab.link" @on-item-click="itemClick">
        <img slot="icon" :src="require(`assets/img/icon/tab-${tab.icon}.png`)">
        <span slot="label">{{tab.name}}</span>
        <img slot="icon-active" :src="require(`assets/img/icon/tab-${tab.icon}1.png`)">
      </tabbar-item>
    </tabbar>
  </div>
</template>
<i18n>
快捷:
  en: Shortcut
消息:
  en: Info
我的:
  en: My
基本应用:
  en: Basic application
暂无可用应用，请联系企业管理人员:
  en: No application available , please contact administrator
通讯获取信息失败:
  en: Fail to obtain information
wifi网络:
  en: Wifi network
移动网络:
  en: Mobile network
当前没有网络:
  en: No network currently
连接失败:
  en: Connection fail
</i18n>
<script>
import { plusready, plusOpen, plusToast } from "common/plus";
import { Tabbar, TabbarItem, XButton } from "vux";
import Storage from "common/data/storage";
import { mapGetters } from "vuex";
import {
  queryModule,
  querySysDictionary,
  queryOrgDeptUserLastUpdateTime
} from "api/Initialize";
import { applyName } from "utils/validate";
import sql from "common/data/websql";
import Plugin from "common/plus/plusPlugIn";
import Push from "common/plus/Push";

export default {
  name: "app",
  data() {
    return {
      sql: null,
      defalutHtml: "",
      cw: "",
      getBarHeight: "0",
      subNav: "",
      contStr: this.$t("未连接"),
      tabs: [
        {
          name: this.$t("首页"),
          icon: "quick",
          link: "quick"
        },
        {
          name: this.$t("告警"),
          icon: "message",
          link: "alarm"
        },
        {
          name: this.$t("充电"),
          icon: "apply",
          link: "charg"
        },
        {
          name: this.$t("我的"),
          icon: "my",
          link: "my"
        }
      ],
      apply: [
        {
          dictName: this.$t("基本应用"),
          list: []
        }
      ],
      plugin: null,
      appRunTime: 0,
      clearT: null
    };
  },
  created() {
    // this.sql = new sql();
    plusready(this.plusready);
    // this.readLocal();
    // this.querySysDictionary();
  },
  mounted() {
    // if(process.env.NODE_ENV !== "production"){
    //   this.queryOrgDeptUserLastUpdateTime();
    // }
    this.back();
  },
  components: {
    Tabbar,
    TabbarItem,
    XButton
  },
  watch: {
    notice(val) {
      if (val == 1) {
        setTimeout(() => {
          this.$router.push({ name: "message" });
          this.itemClick(val);
        }, 200);
      }
    },
    $route(val) {
      console.log(val);
    }
  },
  methods: {
    plusready() {
      // this.queryOrgDeptUserLastUpdateTime();
      this.getBarHeight = new Storage().getBarHeight();
      this.cw = plus.webview.currentWebview();
      // if (this.defalutApp) {
      //   let {moduleType, moduleName, moduleCode} = this.defalutApp;
      //   this.tabs[0].name = moduleName;
      //   this.defalutHtml = moduleType + '.html';
      //   gs.subView = this.subNav = plus.webview.create(this.defalutHtml, this.defalutHtml, {
      //     top: mui.os.ios ? this.getBarHeight : '0',
      //     bottom: '52px',
      //     popGesture: 'none',
      //     statusbar: {background: this.$Basic.statusbar}
      //   }, {type: 'home', code: moduleCode});
      //   if (mui.os.ios) {
      //     this.cw.append(this.subNav);
      //   } else {
      //     this.cw.addEventListener('show', () => {
      //       this.subNav.show('none');
      //     }, false);
      //   }
      // }
      // this.querySysDictionary();
      // new Push();
      document.addEventListener("pause", this.pause, false);
      document.addEventListener("resume", this.resume, false);
      document.addEventListener("netchange", this.netchange, false);
    },
    itemClick(item) {
      if (item == this.defalut) return;
      // if (this.defalutApp && window.plus) {
      //   (item == 0) ? this.subNav.show('none') : this.subNav.hide()
      // }
      this.defalut = item;
    },
    querySysDictionary() {
      this.$store.commit("SET_TIMELOAD", true);
      querySysDictionary().then(val => {
        if (val && val.data) {
          this.queryModule().then(res => {
            this.apply = val.data.map(v => {
              v.list = res.filter(x => {
                if (v.dictValue === x.dictValueCategory) return x;
                return false;
              });
              return v;
            });
          });
        }
      });
    },
    queryModule() {
      return new Promise((resolve, reject) => {
        queryModule()
          .then(res => {
            if (res && res.data) {
              resolve(res.data);
              return;
            }
            plusToast(this.$t("暂无可用应用，请联系企业管理人员"));
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    queryOrgDeptUserLastUpdateTime() {
      this.ryInit().then(res => {
        this.ryConect();
      });
    },
    ryInit() {
      return new Promise((resolve, resject) => {
        queryOrgDeptUserLastUpdateTime()
          .then(v => {
            if (
              v.data &&
              v.data.lastUpdateTime &&
              this.lastUpdateTime !== v.data.lastUpdateTime.toString()
            ) {
              this.sql.clearInsert().then(res => {
                if (res) {
                  this.$store.commit(
                    "SET_LASTUPDATETIME",
                    v.data.lastUpdateTime.toString()
                  );
                  resolve(res);
                  return;
                }
                resolve(false);
              });
              return;
            }
            resolve(false);
          })
          .catch(err => {
            resolve(false);
          });
      });
    },
    back() {
      let self = this;
      mui.back = function() {
        mui.confirm(self.$t("手滑了一下，要退出吗") + "？", "", function(e) {
          if (e.index == 1) {
            plus.runtime.quit();
          }
        });
      };
    },
    readLocal() {
      let self = this;
      this.sql.select("user_list order by time desc", "*", "", [], function(
        rows
      ) {
        if (rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            self.signleList.push({
              id: rows.item(i).id,
              name: rows.item(i).name,
              icon: rows.item(i).icon,
              cont: rows.item(i).cont,
              num: rows.item(i).num,
              time: rows.item(i).time
            });
          }
        }
      });
    },
    ryConect() {
      if (!window.plus || plus.runtime.appid == "HBuilder") return;
      let userInfo = new Storage().getUserInfo();
      if (!userInfo) {
        if (userInfo.accountType !== 3) return (this.contStr = $t("管理员"));
        if (!userInfo.tokenRc) return plusToast(this.$t("通讯获取信息失败"));
        return;
      }
      let ryToken = userInfo.tokenRc;
      this.plugin = new Plugin();
      let self = this;
      this.plugin.RYconnect(
        ryToken,
        () => {
          self.contStr = "";
          this.plugin.getUserInfoCache(
            userInfo.userUuid,
            userInfo.userName,
            userInfo.avatarUrl
          );
        },
        err => {
          //          plusToast("通讯连接失败" + err);
          self.contStr = $t("连接失败");
        }
      );
    },
    pause() {
      //运行环境从前台切换到后台事件
      this.appRunTime = 0;
      this.timedCount();
    },
    resume() {
      //运行环境从后台切换到前台事件
      clearTimeout(this.clearT);
      this.clearT = null;
    },
    timedCount() {
      this.appRunTime++;
      if (this.appRunTime >= 300) {
        clearTimeout(this.clearT);
        this.clearT = null;
        plus.runtime.quit();
        return;
      }
      this.clearT = setTimeout(this.timedCount, 1000);
    },
    netchange() {
      let nt = plus.networkinfo.getCurrentType();
      switch (nt) {
        case plus.networkinfo.CONNECTION_ETHERNET:
        case plus.networkinfo.CONNECTION_WIFI:
          plusToast(this.$t("wifi网络"));
          break;
        case plus.networkinfo.CONNECTION_CELL2G:
        case plus.networkinfo.CONNECTION_CELL3G:
        case plus.networkinfo.CONNECTION_CELL4G:
          plusToast(this.$t("移动网络"));
          break;
        default:
          plusToast(this.$t("当前没有网络"));
          break;
      }
    }
  },
  computed: {
    ...mapGetters([
      "tabItem",
      "defalutApp",
      "signleList",
      "notice",
      "userInfo",
      "lastUpdateTime",
      "lan"
    ]),
    defalut: {
      get() {
        return parseInt(this.tabItem);
      },
      set(v) {
        this.$store.commit("SET_TABITEM", v.toString());
      }
    }
  }
};
</script>

<style scoped>

</style>
