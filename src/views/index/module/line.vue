<template>
  <div class="curve-cont" :id="id">
    暂无数据
  </div>
</template>
<script>
var echarts = require("echarts");

export default {
  props: ["id", "data"],
  data() {
    return {
      isLoad: false,
      xList: [],
      yList: []
    };
  },
  mounted() {},
  watch: {
    data(val) {
      this.getData(val);
      this.initBar();
    }
  },
  methods: {
    getData(val) {
      this.xList = val.xList;
      this.yList = val.yList;
    },
    initBar() {
      if (this.isLoad) {
        this.setOptions();
        return;
      }
      this.chart = echarts.init(document.getElementById(this.id), "tjCurve");
      this.setOptions();
      this.isLoad = true;
    },
    setOptions() {
      let self = this;
      this.chart.setOption({
        grid: {
          top: "10%",
          left: "5%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b0}<br/>" + this.$t("当前") + ":{c0}"
        },
        xAxis: {
          type: "category",
          data: this.xList,
          boundaryGap: false,
          axisLabel: {
            formatter(value, index) {
              return value.substring(value.length - 8, value.length);
            }
          }
        },
        yAxis: {
          show: true,
          type: "value"
        },
        series: [
          {
            type: "line",
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(222,79,69,1)" },
                  { offset: 1, color: "rgba(222,79,69,0.1)" }
                ])
              }
            },
            data: this.yList
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.curve-cont {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
