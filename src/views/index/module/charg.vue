<template>
  <div>
    <x-header :left-options="{showBack: false}">{{ $t('充电记录') }}</x-header>
    <div class="tj-scroll" :style="{'top':top}" v-tloading.type="loading" v-tloading.onclick="loadRefresh">
      <scroller width="100%" :on-refresh="refresh" :on-infinite="infinite" ref="scrol">
        <tjloading slot="refresh-spinner" mini typeStyle="ball-pulse"></tjloading>
        <tjloading slot="infinite-spinner" mini></tjloading>
        <alarmList v-for="item in alarmList" :key="item.id" @click.native="goItem(item)">
          <div class="tj-alarm-left" slot="left">
            <i class="iconfont icon-dianchi"></i>
            充电时间
            <span class="perTime">{{item.beginTime}} - {{item.endTime}}</span>
          </div>
          <div class="charg">
            <div class="charg-cell">
              充电时长
              <span>{{item.time}}</span>
            </div>
            <div class="charg-cell">
              报警状态
              <span :style="{'color':item.alarmState==0?'#DE4F45':'#01AE94'}">{{item.alarmState==1?'未报警':'报警'}}</span>
            </div>
          </div>
        </alarmList>
      </scroller>
    </div>
  </div>
</template>

<i18n>
</i18n>
<script>
import { plusready, plusOpen } from "common/plus";
import alarmList from "components/alarmList.vue";
import { queryCarChargingList } from "api/sysVehicle";
import { getTimeStampfunction, formatSeconds } from "utils/validate";
import { mapGetters } from "vuex";
export default {
  props: ["getBarHeight"],
  name: "shop",
  components: {
    alarmList
  },
  data() {
    return {
      pageSize: this.$Basic.pageSize,
      pageNumber: 0,
      loading: 0,
      alarmList: []
    };
  },
  watch: {
    alarmList(val) {
      if (val.length === 0) return (this.loading = 1);
      this.loading = 0;
    },
    carMsg(val){
      this.loadRefresh();
    }
  },
  methods: {
    loadRefresh() {
      this.$refs.scrol.triggerPullToRefresh();
    },
    refresh(done) {
      this.loading = 0;
      setTimeout(() => {
        this.pageNumber = 1;
        this.queryCarChargingList()
          .then(res => {
            this.alarmList = res;
            done();
          })
          .catch(err => {
            this.$vux.toast.text("queryCarAlarmList " + err);
            done();
          });
      }, this.$Basic.timer);
    },
    infinite(done) {
      setTimeout(() => {
        ++this.pageNumber;
        this.queryCarChargingList()
          .then(res => {
            res.map(v => {
              this.alarmList.push(v);
            });
            if (res.length < this.pageSize) return done(true);
            done();
          })
          .catch(err => {
            this.$vux.toast.text("queryCarChargingList " + err);
            done(true);
          });
        done(true);
      }, this.$Basic.timer);
    },
    goItem(value) {
      plusOpen("sysVehicle.html", "sysVehicle.html", false, { value });
    },
    queryCarChargingList() {
      return new Promise((resolve, reject) => {
        let data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          carId:this.carMsg.id
        };
        queryCarChargingList(data)
          .then(res => {
            if (this.pageNumber == 1 && res.data && res.data.length == 0) {
              this.loading = 1;
            }
            if (res && res.data) {
              let arr = res.data.map(v => {
                if (!v.endTime) {
                  v.time = formatSeconds(new Date().getTime() - v.beginTime);
                  v.endTime = getTimeStampfunction(new Date().getTime(), 3);
                } else {
                  v.time = formatSeconds(v.endTime - v.beginTime);
                  v.endTime = getTimeStampfunction(v.endTime, 3);
                }
                v.beginTime =
                  v.beginTime && getTimeStampfunction(v.beginTime, 3);
                v.endTime = v.endTime && getTimeStampfunction(v.endTime, 3);
                return v;
              });
              resolve(arr);
              return;
            }
            reject("res.data is null");
          })
          .catch(err => {
            this.loading = 2;
            reject(err.toString());
          });
      });
    }
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
.tj-alarm-left {
  color: #999899;
}
.icon-dianchi {
  margin-right: 0.1rem;
}
.perTime {
  margin-left: 0.1rem;
}
.charg {
  display: flex;
  flex-direction: column;
}
.charg-cell {
  padding: 0.1rem 0.5rem;
}
</style>
