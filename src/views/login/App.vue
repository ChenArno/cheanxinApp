<template>
  <div class="cont">
    <div class="splash" v-if="splashIsShow">
      <img :src="require('assets/img/splash.png')">
    </div>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view :style="{'top':getPadTop}" class="router-view" :type.sync="type"
                   @viewshow="viewshow"></router-view>
    </transition>
  </div>
</template>

<script>
  import {plusready, plusOpen} from 'common/plus'
  import {mapGetters} from 'vuex'
  import Storage from 'common/data/storage'
  // import sql from 'common/data/websql'
  import 'assets/css/vuxActive.css'
  import areaSelect from 'utils/language'

  export default {
    data(){
      return {
        storage: '',
        type: '',
        // sql: '',
        splashIsShow: false,
        time: 3000,
        getPadTop: '0'
      }
    },
    created(){
      //        展示页
      this.urlReady();
      // this.sql = new sql();
      // this.sql.initDB();
      plusready(this.plusready);
    },
    watch: {
      '$route'(to, from){
        if (to.name != 'setIp') return;
        if (to.name == 'main') {
          this.direction = '';
        }
        this.type = to.query;
      }
    },
    methods: {
      init(){
        this.barReady();
        if (!this.storage.getToken() || this.storage.getUserInfo().isPhoneCheck == 1) {
          this.$router.push({name: 'main'});
          return
        }
        this.viewshow();
      },
      plusready(){
        this.cw = plus.webview.currentWebview();
        this.storage = new Storage();
        this.storage.getMsgCode('');
        this.language();

        //仅支持竖屏显示
        plus.screen.lockOrientation("portrait-primary");
        plus.navigator.closeSplashscreen();
        this.init();
      },
      viewshow(){
        let main = plus.webview.create('index.html', 'index.html');
        main.addEventListener('rendered', () => {
          main.show("fade-in");
        });
        main.addEventListener('show', () => {
          setTimeout(() => {
            this.cw.close('none');
          }, 200)
        });
      },
      barReady(){
        plus.navigator.setStatusBarStyle('dark');
        if (!this.storage.getBarHeight()) {
          this.storage.getBarHeight(true);
        }
        this.getPadTop = this.storage.getBarHeight();
      },
      language(){        
        if (!this.$store.getters.lan) {
          let locale = areaSelect(plus.os.language);
          this.$i18n.set(locale);
          this.$store.commit('SET_LAN',locale);
        }
      },
      urlReady(){
        if (!this.$store.getters.url) {
          this.$store.commit('SET_URL', `${process.env.BASE_API}:${process.env.BASE_PORT}`);
          this.$store.commit('SET_IP', `${process.env.BASE_API}`);
          this.$store.commit('SET_PORT', `${process.env.BASE_PORT}`);
        }
      }
    },
    computed: {
      ...mapGetters([
        'direction'
      ])
    }
  }
</script>

<style scoped>
  .cont {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .router-view {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }

  .splash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .splash img {
    width: 100%;
    height: 100%;
  }
</style>
