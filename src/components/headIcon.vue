<template>
  <div class="icon">
    <div v-if="labelState" :style="{'background-color':spanColor,'font-size':(max== undefined)?'14px':'1rem'}">{{label}}
    </div>
    <img class="err-img" :src="avatarUrl"
         @error="error"
         v-else>
  </div>

</template>

<script>
  import {chOrEn} from 'utils/validate'

  export default {
    props: ['avatarUrl', 'title', 'max'],
    data(){
      return {
        labelState: false,
        color: ['#DF4F45', '#ffc107', '#f44336', '#00897b']
      }
    },
    watch: {
      avatarUrl(val, oldval){
        if (val !== oldval) {
          this.labelState = false;
        }
      }
    },
    mounted(){
      // console.log(this.spanColor)
    },
    methods: {
      error(e){
        this.labelState = true;
      }
    },
    computed: {
      label(){
        if (this.avatarUrl !== undefined) {
          this.labelState = false;
          return this.title && this.title.substr(0, 1)
        }
        return 'N'
      },
      spanColor(){
        if (!this.title || !this.labelState) return this.color[0];
        if (chOrEn(this.title)) return this.color[0];
        if (this.title.length < 4) return this.color[1];
        if (this.title.length < 8) return this.color[2];
        return this.color[3]
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: .9rem;
    height: .9rem;
    margin-right: .2rem;
    border-radius: 50%;
    position: relative;
    text-align: center;
    color: #ffffff;
  }

  .err-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ffffff;
  }

  .icon div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .err-img:after {
    content: '';
    position: absolute;
    left: .1rem;
    line-height: .91rem;
  }
</style>
