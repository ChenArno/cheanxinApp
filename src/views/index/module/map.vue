<template>
  <el-amap vid="amap" :zoom="zoom" :center="center" :plugin="plugin" :events="events" class="amap" :isCustom="true">
    <el-amap-polyline :strokeColor="polyline.strokeColor" :strokeWeight="polyline.strokeWeight" :editable="polyline.editable" :path="polyline.path" :events="polyline.events"></el-amap-polyline>
    <el-amap-marker :offset="marker.offset" :position="marker.position" :events="marker.events" :icon="marker.icon" :visible="marker.visible" vid="marker">
    </el-amap-marker>
    <!-- <el-amap-info-window :position="window.position" :visible="visible" :isCustom="true" :autoMove="false">
      <div class="info" v-show="visible">
        剩余里程
        <span class="color">{{data.keepMoveMileage?data.keepMoveMileage:0}}</span>公里，已骑行
        <span class="color">{{cycl}}</span>
      </div>
    </el-amap-info-window> -->
  </el-amap>
</template>

<script>
import { plusready, plusOpen } from "common/plus";
import { fail } from "assert";
export default {
  props: ["tjLoad", "data", "cycl"],
  data() {
    let self = this;
    return {
      // amapManager,
      zoom: 15,
      center: [0, 0],
      isFirst: true,
      events: {
        init: o => {
          self.$emit("loadEnd");
          o.getCity(result => {
            // console.log(result);
          });
        }
      },
      polyline: {
        path: [],
        strokeColor: "#0EB273",
        strokeWeight: 4,
        events: {
          end: e => {
            let newPath = e.target
              .getPath()
              .map(point => [point.lng, point.lat]);
          }
        },
        editable: false
      },
      plugin: [
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {}
          }
        },
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.marker.position = [
                    result.position.lng,
                    result.position.lat
                  ];
                  self.$nextTick();
                }
              });
            }
          }
        }
      ],
      window: {
        position: [0, 0]
      },
      visible: false,
      marker: {
        position: [0, 0],
        offset: [-35, -72],
        events: {
          click: () => {
            self.$emit("mapListen");
            // self.$nextTick(() => {
            //   self.visible = true;
            // });
          }
        },
        icon: require("assets/img/carsWhite.png")
      }
    };
  },
  watch: {
    data(val) {
      this.getStop(val);
    }
  },
  methods: {
    getStop(val) {
      this.visible = true;
      if (val.chargingStatus == 1) {
        //充电中
        this.marker.icon = require("assets/img/carsGreen.png");
      } else if (val.alarmStatus == 0) {
        //报警
        this.marker.icon = require("assets/img/cars.png");
      } else if (val.alarmStatus == 2) {
        //预警
        this.marker.icon = require("assets/img/carsYellow.png");
      } else {
        this.marker.icon = require("assets/img/carsWhite.png");
      }
      if (
        !val.longitude ||
        val.longitude == 0 ||
        !val.latitude ||
        val.latitude == 0
      )
        return;
      let arr = [val.longitude, val.latitude];
      this.center = arr;
      this.marker.position = arr;
      this.window = {
        position: [val.longitude - 0.0005, val.latitude + 0.0028]
      };
      console.log(val);

      if (val.stopStatus == 1) {
        this.polyline.path.push(arr);
      }
    }
  }
};
</script>

<style scoped>
.amap {
  height: 100%;
  width: 100%;
}
.info {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 10px;
  -moz-box-shadow: 3px 3px 5px #888888; /* 老的 Firefox */
  box-shadow: 3px 3px 5px #888888;
}
.color {
  color: #f64f44;
}
</style>