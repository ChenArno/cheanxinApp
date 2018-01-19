<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('告警详情') }}
    </x-header>
    <div class="tj-scroll tj-menu">
      <div class="time">
        <div class="time-left">
          <i class="iconfont icon-record"></i>{{$t('告警时间')}}：
        </div>
        <span class="charg">{{alarmData.alarmTime}}</span>
      </div>
      <div class="time">
        <div class="time-left">
          <i class="iconfont icon-icon-test"></i>{{$t('告警类型')}}：
        </div>
        <span class="charg">{{alarmData.alarmDescription}} {{alarmData.alarmValue}}{{alarmData.alarmType==4?'angle':(alarmData.alarmType==3?'A':(alarmData.alarmType==2?'V':'℃'))}}</span>
      </div>
      <div class="line">
        <div class="line-title">{{alarmData.alarmType==4?'角度':(alarmData.alarmType==3?'电流':(alarmData.alarmType==2?'电压':'温度'))}}统计图</div>
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
import { queryCarAlarmChart } from "api/sysVehicle";
import { getTimeStampfunction } from "utils/validate";
export default {
  data() {
    return {
      chargTime: "2017-04-01 6:00",
      cw: null,
      alarmData: {},
      chartData: {
        xList: [],
        yList: [],
        min: 0,
        max: 0
      },
      alarmType: 1
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
    "curve-line": line
  },
  created() {
    plusready(this.plusready);
  },
  methods: {
    plusready() {
      this.cw = plus.webview.currentWebview();
      this.alarmData = this.cw.msg;
      this.alarmType = this.alarmData.alarmType;
      this.queryCarAlarmChart();
    },
    queryCarAlarmChart() {
      let { carId, alarmTime } = this.alarmData;
      let beginTime = getTimeStampfunction(
        new Date(new Date(alarmTime).getTime() - 1000 * 60 * 30)
      );
      let endTime = getTimeStampfunction(
        new Date(new Date(alarmTime).getTime() + 1000 * 60 * 30)
      );
      let data = {
        carId,
        beginDate: beginTime,
        endDate: endTime
      };
      queryCarAlarmChart(data)
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
      switch (this.alarmType) {
        case 1:
          arr = this.getData.retTemperature;
          break;
        case 2:
          arr = this.getData.retPowerVbv;
          break;
        case 3:
          arr = this.getData.retPowerAmpere;
          break;
        case 4:
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
  padding: 0.2rem 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
