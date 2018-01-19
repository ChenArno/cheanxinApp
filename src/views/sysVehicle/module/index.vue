<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('充电详情') }}
    </x-header>
    <div class="tj-scroll tj-menu">
      <div class="time">
        <div class="time-left">
          <i class="iconfont icon-record"></i>{{$t('充电时长')}}：
        </div>
        <span class="charg">{{alarmData.time?alarmData.time:'00:00:00'}}</span>
      </div>
      <div class="time">
        <div class="time-left">
          <i class="iconfont icon-icon-test"></i>{{$t('充电状态')}}：
        </div>
        <span class="charg">{{alarmData.chargingStatus==0?'充电中':'充电完毕'}}</span>
      </div>
      <div class="line">
        <picker class="line-title" :title="title+'统计图'" :list="listData" @onClick="changeNew"></picker>
        <curve-line id="line-U" :data='chartData'></curve-line>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { plusready, plusOpen } from "common/plus";
import { Tab, TabItem, Swiper, SwiperItem } from "vux";
import line from "views/index/module/line";
import picker from "components/tjPicker.vue";
import { queryCarChargingChart } from "api/sysVehicle";

export default {
  data() {
    return {
      chargTime: "2017-04-01 6:00",
      cw: null,
      alarmData: {},
      listData: [["电压", "电流", "温度", "角度"]],
      chartData: {
        xList: ["00:00"],
        yList: [0]
      },
      title: "电压",
      getData: {}
    };
  },
  computed: {
    ...mapGetters(["direction", "defalutDep"])
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    "curve-line": line,
    picker
  },
  created() {
    plusready(this.plusready);
  },
  methods: {
    plusready() {
      this.cw = plus.webview.currentWebview();
      this.alarmData = this.cw.value;
      this.queryCarChargingChart();
    },
    changeNew(val) {
      this.title = val;
      this.switch();
    },
    queryCarChargingChart() {
      let { carId, beginTime, endTime } = this.alarmData;
      beginTime = beginTime + ":00";
      endTime = endTime + ":00";
      let data = {
        carId,
        beginDate:beginTime,
        endDate:endTime
      };
      queryCarChargingChart(data)
        .then(res => {
          if (res.data && res.data.retX) {
            this.getData = res.data;
            this.switch();
            return;
          }
          this.chartData = {
            xList: ["00:00"],
            yList: [0]
          };
        })
        .catch(err => {
          this.chartData = {
            xList: ["00:00"],
            yList: [0]
          };
        });
    },
    switch() {
      let arr = [];
      switch (this.title) {
        case "温度":
          arr = this.getData.retTemperature;
          break;
        case "电压":
          arr = this.getData.retPowerVbv;
          break;
        case "电流":
          arr = this.getData.retPowerAmpere;
          break;
        case "角度":
          arr = this.getData.retAngle;
          break;
      }
      if (!this.getData.retX) {
        this.chartData = {
          xList: ["00:00"],
          yList: [0]
        };
        return;
      }
      this.chartData = {
        xList: this.getData.retX,
        yList: arr
      };
    }
  }
};
</script>

<style scoped>
.time {
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: #999999;
  padding: 0 0.2rem;
}
.time-left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.line {
  width: 100%;
  height: 4.9rem;
  background-color: #fff;
  position: relative;
  padding-top: 0.8rem;
}
.line-title {
  height: 0.8rem;
  background-color: #f7f5f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
