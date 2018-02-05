<template>
  <div class="tj-scroll" :style="{'top':0}">
    <scroller>
      <div class="my-backImg" :style="{'background-image':backImgUrl}">
        <div class="my-portrait">
          <div class="my-icon-f">
            <div class="my-icon-t">
              <div class="my-icon-logo">
                <img ref="icon" :src="avatarUrl" @error="$Basic.detarImg" @click="actionClick">
              </div>
            </div>
          </div>
        </div>
        <div class="my-position">{{ $t(roleName) }}</div>
        <div class="my-name">{{ $t(userName) }}</div>
        <div class="my-icon-canvas" :style="{'background':wire,'background-size':'100% 100%'}"></div>
      </div>
      <group>
        <cell class="my-cell" :title="info.title" is-link @click.native="goToInfo(info.id)" v-for="info in infoList" :key="info.id">
          <img class="my-icon" slot="icon" :src="require('assets/img/icon/'+info.id+'.png')">
        </cell>
        <popup-picker :data="list" v-model="pcikvalue" @on-change="onChange" ref="picker">
          <template slot="title" class="">
            <div class="weui-label">
              <img class="my-icon" slot="icon" :src="require('assets/img/icon/about.png')">
              <span>车牌号</span>
            </div>
          </template>
        </popup-picker>
      </group>
      <group>
        <cell class="my-logout" :title="$t('退出当前帐号')" @click.native="logout"></cell>
      </group>
    </scroller>
    <popup v-model="popupShow" position="bottom" height="100%" width="100%">
      <cropper v-if="popupShow" @submit="submit" :ulrSrc="ulrSrc" :isRename="userAccount"></cropper>
    </popup>
  </div>
</template>
<i18n>
普通:
  en: Common
从相册中选择:
  en: Choose from Album
退出当前帐号:
  en: Log Out
</i18n>
<script>
import { mapGetters } from "vuex";
import { XButton, Badge, Popup, Actionsheet, PopupPicker } from "vux";
import { plusready, plusOpen } from "common/plus";
import { sysLogout, uploadUserAuatar } from "api/login";
import Storage from "common/data/storage";
import Camera from "common/plus/camera";
import cropper from "components/cropper.vue";
import plusNative from "common/plus/plusNative";
// import PlugIn from 'common/plus/plusPlugIn'
import Cache from "common/data/clearCache";
import nativeUi from "common/plus/plusNativeUI";
import PlusIo from "common/plus/plusIo";
import AppUpdate from "common/plus/appUpdate";
import { queryDistCarListByDriver } from "api/sysVehicle";

export default {
  name: "my",
  data() {
    return {
      cw: null,
      // plugIn:null,
      wire: `url(${require("assets/img/wire.png")})`,
      info: null,
      list: [["暂无"]],
      carData: [],
      pcikvalue: ["暂无"],
      nowData: {},
      roleName: this.$t("普通"),
      userName: this.$t("天机"),
      avatarUrl: null,
      userAccount: "",
      iconImg: false,
      infoList: [
        {
          title: this.$t("个人信息"),
          id: "personal"
        },
        {
          title: this.$t("帮助中心"),
          id: "help"
        },
        {
          title: this.$t("反馈意见"),
          id: "email"
        }, {
          title: this.$t('设置'),
          id: 'setting'
        }
      ],
      popupShow: false,
      menus: [this.$t("拍照"), this.$t("从相册中选择")],
      cropper: null,
      croppable: false,
      ulrSrc: "",
      IO: null,
      isShowBadge: false
    };
  },
  created() {
    plusready(this.plusready);
  },
  mounted() {
    this.queryDistCarListByDriver();
  },
  components: {
    XButton,
    Popup,
    Actionsheet,
    cropper,
    Badge,
    PopupPicker
  },
  methods: {
    plusready() {
      this.info = new Storage().getUserInfo();
      this.IO = new PlusIo();
      let info = JSON.stringify(this.info);
      console.log(info);
      this.cw = plus.webview.currentWebview();
      this.userName = this.info.userName;
      this.avatarUrl = this.info.avatarUrl;
      this.userAccount = this.info.userAccount;
      if (this.info.role && this.info.role.length > 0) {
        this.info.role.map((v, index) => {
          let str = "|";
          if (index == this.info.role.length - 1) {
            str = "";
          }
          this.roleName += v.roleName + str;
        });
      }
    },
    logout() {
      //此时更新localstronge 无法生效，需要远程执行login.html
      localStorage.removeItem("_carMsg");
      new Cache();
      sysLogout()
        .then(res => {
          this.openLogin();
        })
        .catch(err => {
          this.openLogin();
        });
      // this.plugIn.RYlogout();
    },
    openLogin() {
      let login = plusOpen("login.html", "login.html", true, {
        module: "click"
      });
      setTimeout(() => {
        plus.nativeUI.closeWaiting();
        this.cw.close();
      }, 1000);
    },
    goToInfo(val) {
      if (val == "about") return;
      plusOpen("info.html", "info.html", {}, { type: val });
    },
    actionClick() {
      new nativeUi().actionSheet("", this.menus).then(res => {
        if (res) {
          if (res == 1) {
            new Camera()
              .captureImage()
              .then((filePath, file) => {
                plus.nativeUI.showWaiting();
                this.popupShow = true;
                this.ulrSrc = filePath;
              })
              .catch(err => err);
          } else {
            plus.gallery.pick(
              filePath => {
                plus.nativeUI.showWaiting();
                this.popupShow = true;
                this.ulrSrc = filePath;
              },
              err => err,
              {
                filter: "image"
              }
            );
          }
        }
      });
    },
    submit(val) {
      if (val) {
        //上传图片
        this.IO.Upload([val], uploadUserAuatar, { isFileRename: "0" })
          .then(x => {
            plus.nativeUI.closeWaiting();
            this.info.avatarUrl = x.userAuatar;
            new Storage().getUserInfo(this.info);
            this.avatarUrl = x.userAuatar + "?t=" + new Date().getTime();
            this.popupShow = false;
            this.IO.removeFile(val)
              .then(() => {})
              .catch(err => {
                mui.toast(err.toString());
              });
          })
          .catch(err => {
            plus.nativeUI.closeWaiting();
            mui.toast(err.toString());
          });
        return;
      }
      this.popupShow = false;
    },
    onChange(val) {
      if (val.length == 0 || !val[0]) {
        this.$vux.toast.text("暂未维护");
        return;
      }
      this.setData(val[0]);
    },
    queryDistCarListByDriver() {
      queryDistCarListByDriver().then(res => {
        if (res.data && res.data.length > 0) {
          this.carData = res.data;
          let arr = res.data.map(val => {
            return val.plateNumber;
          });
          this.list = [arr];
          if (!this.carMsg) {
            let [f] = arr;
            this.pcikvalue = [f];
            this.setData(f);
          } else {
            this.pcikvalue = [this.carMsg.plateNumber];
          }
        }
      });
    },
    setData(val) {
      this.carData.map(v => {
        if (v.plateNumber == val) {
          this.nowData = v;
        }
      });
      this.$store.commit("SET_CARMSG", JSON.stringify(this.nowData));
    }
  },
  computed: {
    ...mapGetters(["backImg", "carMsg"]),
    backImgUrl() {
      if (!this.backImg) {
        this.$store.commit("SET_BACKIMG", "back0");
      }
      return `url(${require("assets/img/" + this.backImg + ".jpg")})`;
    }
  }
};
</script>

<style scoped>
.my-backImg {
  height: 5.51rem;
  width: 100vw;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.my-backImg img {
  width: 100%;
  height: 100%;
}

.my-icon {
  width: 0.48rem;
  height: 0.48rem;
  display: block;
  margin-right: 5px;
}

.my-icon-logo {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.my-icon-f {
  background: rgba(255, 255, 255, 0.15);
  width: 2.14rem;
  height: 2.14rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-icon-t {
  background: rgba(255, 255, 255, 0.2);
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-cell {
  padding: 0.26rem 15px;
  font-size: 0.34rem;
}

.my-icon-logo img {
  width: 1.66rem;
  height: 1.66rem;
  border-radius: 50%;
}

.my-position {
  margin: 0.2rem;
  color: #ffffff;
  font-size: 0.28rem;
}

.my-name {
  color: #ffffff;
  font-size: 0.32rem;
}

.my-icon-canvas {
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.badge-value {
  display: inline-block !important;
}
.weui-label {
  height: 24px;
  display: flex;
  width: 5em;
}
</style>
