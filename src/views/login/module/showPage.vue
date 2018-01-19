<template>
  <div class="show-img" v-if="!showPage">
    <swiper :list="imgList" v-model="index" dots-position="center"
            :show-desc-mask="false" height="100%"></swiper>
    <div class="enter" v-if="index==2">
      <div class="radius" @click="toIndex">
        <span>{{ $t('进入') }}</span>
      </div>
    </div>
  </div>
</template>
<i18n>
进入:
  en: Enter
</i18n>
<script>
  import {Swiper, XButton} from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        index: 0,
        imgList: [{
          url: 'javascript:',
          img: require('assets/img/showPage1.jpg')
        }, {
          url: 'javascript:',
          img: require('assets/img/showPage2.jpg')
        }, {
          url: 'javascript:',
          img: require('assets/img/showPage3.jpg')
        }]
      }
    },
    created(){
    },
    components: {
      Swiper, XButton
    },
    methods: {
      toIndex(){
        this.$store.commit('SET_SHOWPAGE', 'Ok');
      }
    },
    computed: {
      ...mapGetters([
        'showPage'
      ])
    }
  }
</script>

<style scoped lang="less">

  .show-img {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .show-img .vux-slider {
    height: 100% !important;
  }

  .enter {
    position: absolute;
    bottom: 7vh;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .radius {
    width: 1.6rem;
    height: .7rem;
    line-height: .7rem;
    border-radius: 10px;
    background-color: #ffffff;
    color: rgb(33, 129, 236);
    border: 1px solid  rgb(33, 129, 236);
    font-size: .3rem;
    text-align: center;
  }
</style>
