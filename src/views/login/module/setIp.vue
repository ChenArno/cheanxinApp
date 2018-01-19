<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{ $t(title) }}{{ $t('设置') }}<span slot="right" @click="save">{{ $t('保存') }}</span></x-header>
    <div class="ver-cont">
      <group>
        <x-textarea v-if="ipOrPort" :max="200" name="detail" v-model="value" :show-counter="false"></x-textarea>
        <x-input :title='$t("端口")' v-model="value" type="number" v-else></x-input>
      </group>
    </div>
  </div>
</template>
<script>
  import {XTextarea,XInput} from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    props:['type'],
    data(){
      return {
        title:'地址',
        ipOrPort:true,
        value:''
      }
    },
    mounted(){
      if(this.type.ip){
        this.ipOrPort = true;
        this.value = this.type.ip;
        this.title = "地址"
      }else{
        this.ipOrPort = false;
        this.value = this.type.port;
        this.title = "端口"
      }
    },
    components: {
      XTextarea,
      XInput
    },
    computed: {
      ...mapGetters([
        'ip',
        'port'
      ])
    },
    methods:{
      save(){
        if(this.ipOrPort){
          this.$store.commit('SET_IP',this.value);
          this.$store.commit('SET_URL',`${this.value}:${this.port}`);
        }else{
          this.$store.commit('SET_PORT',this.value);
          this.$store.commit('SET_URL',`${this.ip}:${this.value}`);
        }
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .tj-opt {
    margin: 0 5px;
  }
</style>
