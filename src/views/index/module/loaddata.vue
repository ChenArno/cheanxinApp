<template>
  <scroller ref="scrol">
    <div class="time" v-if="data.chargingStatus == 1">
      <i class="iconfont icon-record"></i>
      <div>{{$t('充电时长')}}：
        <span class="charg">{{chargTime}}</span>
      </div>
    </div>
    <div class="time" v-else>
      未充电
    </div>
    <div class="line">
      <div class="line-title">{{$t('电压统计图')}}</div>
      <curve-line id="line-U" :data='retPowerVbv'></curve-line>
    </div>
    <div class="line">
      <div class="line-title">{{$t('电流统计图')}}</div>
      <curve-line id="line-I" :data='retPowerAmpere'></curve-line>
    </div>
    <div class="line">
      <div class="line-title">{{$t('温度统计图')}}</div>
      <curve-line id="line-I" :data='retTemperature'></curve-line>
    </div>
    <div class="line">
      <div class="line-title">{{$t('角度统计图')}}</div>
      <curve-line id="line-I" :data='retAngle'></curve-line>
    </div>
  </scroller>
</template>
<script>
import { mapGetters } from "vuex";
import { queryCarChargingChart } from "api/sysVehicle";
import { getTimeStampfunction } from "utils/validate";
import line from "./line";
export default {
  props: ["data"],
  data() {
    return {
      retAngle: {
        xList: ["00:00"],
        yList: [0]
      },
      retPowerAmpere: {
        xList: ["00:00"],
        yList: [0]
      },
      retTemperature: {
        xList: ["00:00"],
        yList: [0]
      },
      retPowerVbv: {
        xList: ["00:00"],
        yList: [0]
      },
      chargTime: "00:00:00",
      beginDate: "",
      endDate: ""
    };
  },
  watch: {
    data(val) {
      if (val.chargingStatus == 1 && val.stopStatus == 0) {
        this.queryCarChargingChart();
        if (val.lastChargingStartTime) {
          let time = val.lastChargingStopTime - val.lastChargingStartTime;
          this.chargTime = formatSeconds(time);
          return;
        }
        this.chargTime = "00:00:00";
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.chartData = {
        xList: ["12:00", "1:00"],
        yList: [222, 43],
        min: 10,
        max: 23
      };
    }, 1000);
  },
  components: {
    "curve-line": line
  },
  methods: {
    queryCarChargingChart() {
      let data = {
        carId: this.carMsg.id,
        beginDate: getTimeStampfunction(this.data.lastChargingStartTime),
        endDate: getTimeStampfunction(this.data.lastChargingStopTime)
      };
      queryCarChargingChart(data)
        .then(res => {
          if (res.data && res.data.retX) {
            this.retTemperature = {
              xList: res.data.retX,
              yList: res.data.retTemperature
            };
            this.retAngle = {
              xList: res.data.retX,
              yList: res.data.retAngle
            };
            this.retPowerAmpere = {
              xList: res.data.retX,
              yList: res.data.retPowerAmpere
            };
            this.retPowerVbv = {
              xList: res.data.retX,
              yList: res.data.retPowerVbv
            };
            return;
          }
          this.reset();
        })
        .catch(err => {
          this.reset();
        });
    },
    reset() {
      this.retTemperature = {
        xList: ["00:00"],
        yList: [0]
      };
      this.retAngle = {
        xList: ["00:00"],
        yList: [0]
      };
      this.retPowerAmpere = {
        xList: ["00:00"],
        yList: [0]
      };
      this.retPowerVbv = {
        xList: ["00:00"],
        yList: [0]
      };
    }
  },
  computed: {
    ...mapGetters(["carMsg"])
  }
};
</script>
<style scoped>
.time {
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #999999;
}
.charg {
  color: #de4f45;
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

