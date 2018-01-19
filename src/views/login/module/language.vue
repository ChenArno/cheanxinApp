<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{$t('语言设置')}}</x-header>
    <div class="ver-cont">
      <group>
        <alarmList class="area-list" lbody v-for="(item,i) in menus" :key="item" @click.native="nextList(i)">
          <div slot="left" class="are-list-cell">
            {{item}}
          </div>
          <span class="icon-emufibaron iconfont" slot="right" v-if="i==areaSelect"></span>
        </alarmList>
      </group>
    </div>
  </div>
</template>

<script>
  import alarmList from 'components/alarmList.vue'
  import {mapGetters} from 'vuex'
  import areaSelect from 'utils/language'
  export default {
    data() {
      return {
        menus:{
          'zh-CN': '中文',
          'en': 'English'
        },
        areaSelect:"zh-CN"
      }
    },
    components: {
      alarmList
    },
    computed: {
      ...mapGetters([
        'lan'
      ])
    },
    mounted(){
      this.areaSelect = areaSelect(this.lan);
    },
    methods:{
      nextList(val){
        this.areaSelect = areaSelect(val);
        this.$i18n.set(this.areaSelect)
        this.$store.commit('SET_LAN',this.areaSelect);
      }
    }
  }
</script>
<style scoped>
  .area-list {
    margin-top: 0 !important;
    border-bottom: 1px solid #E3E6E6;
    background-color: #ffffff;
  }
  .are-list-cell {
    width: 100%;
  }
  .icon-emufibaron {
    color: #EC4F46;
    font-size: .28rem;
  }
</style>
