<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{$t('设置')}}</x-header>
    <div class="ver-cont">
      <!-- <span class="tj-opt">{{ $t('语言设置') }}</span> -->
      <!-- <group>
        <cell :title="$t('语言设置')" :value="locale" @click.native="$router.push({name:'language'})"></cell>
      </group> -->
      <span class="tj-opt">{{ $t('服务器设置') }}</span>
      <group>
        <cell :title="$t('服务器地址')" :value="ip" is-link :link="{name:'setIp',query:{ip:ip}}"></cell>
        <cell :title="$t('服务器端口')" :value="port" is-link :link="{name:'setIp',query:{port:port}}"></cell>
      </group>
      <group>
        <cell :title="$t('还原默认')" is-link @click.native="red"></cell>
      </group>
    </div>
  </div>
</template>
<!--zh-CN:后面需要有空格，否则无法生成-->
<i18n>
服务器设置:
  en: Server Settings
语言设置:
  en: Language Settings
服务器地址:
  en: Server adress
服务器端口:
  en: Server port
还原默认:
  en: Restore Default
还原成功:
  en: Restore succeed
</i18n>

<script>
  import {Actionsheet, TransferDom} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
      }
    },
    mounted(){
    },
    components: {
      Actionsheet
    },
    computed: {
      ...mapGetters([
        'lan',
        'ip',
        'port'
      ]),
      locale(){
        if (/en/.test(this.lan)) {
          return 'English'
        }
        return '中文'
      }
    },
    methods: {
      red(){
        this.$store.commit('SET_URL', `${process.env.BASE_API}:${process.env.BASE_PORT}`);
        this.$store.commit('SET_IP', `${process.env.BASE_API}`);
        this.$store.commit('SET_PORT', `${process.env.BASE_PORT}`);
        this.$vux.toast.text(this.$t('还原成功'), 'bottom')
      }
    }
  }
</script>

<style scoped>
  .tj-opt {
    margin: 0 5px;
    text-align: left;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
</style>
