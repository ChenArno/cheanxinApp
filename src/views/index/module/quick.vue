<template>
  <div>
    <x-header :left-options="{showBack: false}">{{ $t('车辆管理') }}</x-header>
    <div class="tj-scroll" :style="{'top':top}">
      <tab :line-width=2 active-color="#DE4F45" v-model="defalIndex" custom-bar-width="40px">
        <tab-item selected>骑行</tab-item>
        <tab-item>充电</tab-item>
      </tab>
      <swiper class="tj-swipe" v-model="defalIndex" :show-dots="false" height="100%" :min-moving-distance=500>
        <swiper-item>
          <amap @mapListen="mapListen" :tjLoad="tjLoad" @loadEnd="tjLoad=false " :data="carData" :cycl='cycl' ref="map"></amap>
          <div v-transfer-dom>
            <popup v-model="show" height="250px" style="overflow: hidden;" is-transparent>
              <div class="pop">
                <div class="pop-cell">
                  <div class="pop-icon">
                    <div class="pop-box">
                      <div class="pop-box-cell">{{carData.speed}}</div>
                      <div style="color:#666666,'font-size': 8px">km/h</div>
                      <div class="pop-box-white"></div>
                    </div>
                  </div>
                  <div class="pop-cont">
                    <div class="pop-cont-cell">
                      <div class="pop-cont-d">剩余里程</div>
                      <div class="pop-cont-val">
                        <span style="color:#54A1FD">{{carData.keepMoveMileage?carData.keepMoveMileage:0}}</span>
                        <span style="'font-family':''">km</span>
                      </div>
                    </div>
                    <div class="pop-cont-cell">
                      <div class="pop-cont-d">剩余电量</div>
                      <div class="pop-cont-val" style="color:#DE4F45">{{carData.powerVbvRate*100}}%</div>
                    </div>
                    <div class="pop-cont-cell">
                      <div class="pop-cont-d">骑行时长</div>
                      <div class="pop-cont-val" style="color:#01AE94">{{cycl}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </popup>
          </div>
        </swiper-item>
        <swiper-item>
          <loaddata :data="carData"></loaddata>
        </swiper-item>
      </swiper>
    </div>
    <tjSpinner :tjLoad="tjLoad"></tjSpinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loaddata from "./loaddata";
import amap from "./map";
import tjSpinner from "components/loading/tjSpinner.vue";
import { appqueryMonitorCarStatusList } from "api/sysVehicle";
import {
  TransferDom,
  Tab,
  TabItem,
  XButton,
  Swiper,
  SwiperItem,
  Popup
} from "vux";
import { plusready, plusOpen } from "common/plus";
import { formatSeconds } from "utils/validate";
export default {
  props: ["getBarHeight"],
  name: "shop",
  directives: {
    TransferDom
  },
  data() {
    return {
      defalIndex: 0,
      map: null,
      cw: null,
      tjLoad: false,
      show: false,
      carData: {},
      cycl: "00:00:00"
    };
  },
  watch: {
    carData(val) {
      if (val.lastStopTime) {
        let time = val.lastStopTime - val.lastStartTime;
        this.cycl = formatSeconds(time);
      } else {
        let time = new Date().getTime() - val.lastStartTime;
        this.cycl = formatSeconds(time);
      }
    },
    // show(val){
    //   if(!val){
    //     this.$refs.map.visible = false;
    //   }
    // }
  },
  created() {
    plusready(this.plusready);
  },
  mounted() {
    if (process.env.NODE_ENV === "production") return
    this.route();
  },
  methods: {
    plusready() {
      this.cw = plus.webview.currentWebview();
      this.route();
    },
    router() {
      this.$router.push({ name: "apply" });
      this.$emit("simClick", 2);
    },
    mapListen() {
      if (this.carData.stopStatus == 0) return;
      this.show = true;
    },
    appqueryMonitorCarStatusList() {
      return new Promise((reslove, reject) => {
        appqueryMonitorCarStatusList(this.carMsg.id).then(res => {
          if (res.data) {
            this.carData = res.data;
            reslove(res.data);
          }
        });
      });
    },
    setTime() {
      this.appqueryMonitorCarStatusList().then(res => {
        setTimeout(() => {
          this.setTime();
        }, 5000);
      });
    },
    route() {
      // this.tjLoad = true;
      if (this.carMsg && this.carMsg.id != -1) {
        this.setTime();
        return;
      }
      const _this = this;
      this.$vux.confirm.show({
        title: "提示",
        content: "请先选择一辆车",
        onConfirm() {
          _this.$router.push({ name: "my" });
          _this.$emit("simClick", 3);
        }
      });
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Popup,
    XButton,
    amap,
    loaddata,
    tjSpinner
  },
  computed: {
    ...mapGetters(["carMsg"]),
    top() {
      return parseInt(this.getBarHeight) + 47 + "px";
    }
  }
};
</script>

<style scoped>
.tj-swipe {
  position: absolute;
  bottom: 0;
  top: 44px;
  left: 0;
  right: 0;
}
.amap-box {
  height: 100%;
  width: 100%;
}
.pop {
  width: 100%;
  background-color: #fff;
  height: 200px;
  margin: 0 auto;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 10px;
  position: relative;
  margin-top: 50px;
}
.pop-cont {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  margin-top: 0.5rem;
  padding: 0.7rem 0.2rem 1rem;
}
.pop-icon {
  width: 100%;
  left: 0;
  top: -20%;
  position: absolute;
}
.pop-box {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin: 0 auto;
  border: 2px solid #fc6062;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
}
.pop-box-white {
  width: 100%;
  height: 30px;
  position: absolute;
  background-color: #fff;
  bottom: -16px;
}
.pop-box-cell {
  font-size: 0.4rem;
}
.pop-cont-cell {
  flex: 1;
}
.pop-cont-d {
  text-align: center;
  color: #666666;
}
.pop-cont-val {
  text-align: center;
  margin-top: 0.5rem;
  font-family: "ElektraLightProBold";
}
</style>
