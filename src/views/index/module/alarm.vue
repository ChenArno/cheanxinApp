<template>
  <div>
    <x-header :left-options="{showBack: false}">{{ $t('告警记录') }}</x-header>
    <div class="tj-scroll" :style="{'top':top}" v-tloading.type="loading" v-tloading.onclick="loadRefresh">
      <scroller width="100%" :on-refresh="refresh" :on-infinite="infinite" ref="scrol">
        <tjloading slot="refresh-spinner" mini typeStyle="ball-pulse"></tjloading>
        <tjloading slot="infinite-spinner" mini></tjloading>
        <alarmList v-for="item in alarmList" :key="item.id" @click.native="goItem(item)">
          <div class="tj-alarm-left" slot="left">
            <i class="iconfont icon-icon-test"></i>
            {{$t('告警时间')}}
            <span class="perTime">{{item.alarmTime}}</span>
          </div>
          <div class="charg">
            <div class="charg-cell">
              {{$t('告警类型')}}:{{item.alarmDescription}} 告警值:{{item.alarmValue}}{{item.alarmType==4?'angle':(item.alarmType==3?'A':(item.alarmType==2?'V':'℃'))}}
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
import alarmList from "components/alarmList.vue";
import { plusready, plusOpen } from "common/plus";
import { queryCarAlarmList } from "api/sysVehicle";
import { getTimeStampfunction } from "utils/validate";
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
        this.queryCarAlarmList()
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
        this.queryCarAlarmList()
          .then(res => {
            res.map(v => {
              this.alarmList.push(v);
            });
            if (res.length < this.pageSize) return done(true);
            done();
          })
          .catch(err => {
            this.$vux.toast.text("queryPlanTaskList " + err);
            done(true);
          });
        done(true);
      }, this.$Basic.timer);
    },
    queryCarAlarmList() {
      return new Promise((resolve, reject) => {
        let data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          carId:this.carMsg.id
        };
        queryCarAlarmList(data)
          .then(res => {
            if (this.pageNumber == 1 && res.data && res.data.length == 0) {
              this.loading = 1;
            }
            if (res && res.data) {
              let arr = res.data.map(v => {
                v.alarmTime = getTimeStampfunction(v.alarmTime);
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
    },
    goItem(value) {
      plusOpen("sysVehicle.html#/alarm", "sysVehicle.html", false, { msg:value });
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
.icon-icon-test {
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
