<template>
  <transition name="bounce">
    <div v-show="value" class="time-cont">
      <div class="time-cont-cell" ref="cell">
        <div class="screen-cont">
          <div class="tj-alarm-left">
            <span class="tj-alarm-left-cell"><i class="tj-leftI"></i>
            {{ $t('筛选类型') }}</span>
            <span class="tj-submit" @click="submit">{{ $t('确定') }}</span>
          </div>
          <div class="screen-check">
            <x-button mini :type="(alarmType==-1)?'primary':'default'" @click.native="alarmType = -1">{{ data[0] }}</x-button>
            <x-button mini :type="(alarmType==0)?'primary':'default'" @click.native="alarmType = 0">{{ data[1] }}</x-button>
            <x-button mini :type="(alarmType==1)?'primary':'default'" @click.native="alarmType = 1">{{ data[2] }}</x-button>
          </div>
        </div>
        <div class="screen-cont">
          <div class="tj-alarm-left">
           <span class="tj-alarm-left-cell"> <i class="tj-leftI"></i>
            {{ $t('筛选时间') }}</span>
          </div>
          <group class="tj-time">
            <datetime v-model="Bvalue" :format="format" @on-change="changeB" :end-date="endDate"
                      :title="$t('开始时间')"></datetime>
            <datetime v-model="Evalue" :format="format"
                      @on-change="changeE" :min-hour="startHour"
                      :start-date="startDate" :title="$t('结束时间')"></datetime>
          </group>
        </div>
      </div>
      <div class="time-cont-mask" @click="close"></div>
    </div>
  </transition>
</template>
<i18n>
筛选类型:
  en: Type
所有记录:
  en: ALL
开始时间:
  en: Start Time
结束时间:
  en: Ending Time
筛选时间:
  en: Time
</i18n>
<script>
  import {Group, XButton, Datetime, dateFormat} from 'vux'

  export default {
    props: {
      value: { // 必须要使用value
        default: '',
      },
      timeForm: {
        type: Object,
        default: null
      },
      data:{
        type: Array,
        default: null
      }
    },
    data(){
      return {
        alarmType: -1,
        Bvalue: '',
        Evalue: '',
        startHour: 0,
        endDate: '',
        startDate: '',
        format: 'YYYY-MM-DD HH:mm',
        styles: true
      }
    },
    components: {
      XButton,
      Datetime,
      dateFormat,
      Group
    },
    created(){
      this.dateReady();
    },
    mounted(){
    },
    watch: {
      value(val){
      }
    },
    methods: {
      dateReady(){
        this.Bvalue = dateFormat(new Date(), 'YYYY-MM-DD HH:mm');
        let end = new Date().getTime() + 1000 * 60;
        this.Evalue = dateFormat(new Date(end), 'YYYY-MM-DD HH:mm');
        this.startDate = dateFormat(this.Bvalue, 'YYYY-MM-DD');
        this.endHour = parseInt(dateFormat(this.Evalue, 'HH'));
        this.endDate = dateFormat(this.Evalue, 'YYYY-MM-DD');
      },
      submit(){
        let data = {
          alarmBeginDate: this.Bvalue + ':00',
          alarmEndDate: this.Evalue + ':00',
          alarmType: this.alarmType
        };
        console.log(data)
        this.$emit('timeChage', data);
        this.close();
      },
      changeB(val){
        this.startDate = dateFormat(val, 'YYYY-MM-DD');
        this.endHour = parseInt(dateFormat(val, 'HH'));
      },
      changeE(val){
        this.endDate = dateFormat(this.Evalue, 'YYYY-MM-DD');
      },
      close(){
        this.$emit('input', false)
      }
    }
  }
</script>

<style scoped>
  .time-cont {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
  }

  .time-cont-mask {
    position: absolute;
    height: 52%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }

  .time-cont-cell {
    z-index: 1001;
    margin-top: 47px;
    padding: .3rem .2rem;
    background-color: #fff;
    box-shadow: 0 3px 9px rgba(0, 0, 0, .3)
  }

  .screen-cont {
    padding: .2rem 0;
  }

  .tj-alarm-left {
    justify-content: space-between;
    padding: 0 .2rem;
  }

  .tj-alarm-left-cell {
    display: flex;
    align-items: center;
  }

  .screen-check {
    padding: .1rem 0;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .bounce-enter-active {
    animation: fadeInDown .5s;
  }

  .bounce-leave-active {
    transition: opacity .5s
  }

  .bounce-leave-to {
    opacity: 0
  }
</style>
