<template>
  <div id="titlePop">
    <div class="tex lf">{{title}}</div>
    <tjPopover class="rt" isShow ref="pop">
      <div slot="content" :class="width">
        <div class="popover-list" v-for="(item,index) in listData" @click="chose(item,index)" >{{ item }}</div>
      </div>
      <span class="btn" @click="Popvisible = true">{{ val }}</span>
      <i class="iconfont icon-arrow-down arrow-down"></i>
    </tjPopover>
  </div>
</template>

<script>
  import tjPopover from 'components/tjPopover.vue'
  export default {
    name: 'titlePop',
    props: ['title', 'listData', 'popId'],
    components: {tjPopover},
    data(){
      return {
        Popvisible: false,
        num: 0,
        val: ''
      }
    },
    computed: {
      width(){
        var length = 0;
        this.listData.map(v => {
          if (v.length > length) {
            length = v.length
          }
        })
        return 'width'+ length ;
      }
    },
    mounted(){
      this.val = this.listData[0];
    },
    methods: {
      chose(value, index){
        this.val = value;
        this.$refs.pop.show = false;
        this.$emit('onClick', index);
      }
    }
  }
</script>
<style scoped>
  #titlePop {
    width: 100%;
    height: .81rem;
  }

  .lf {
    float: left;
  }

  .rt {
    float: right;
  }

  .tex {
    font-size: .3rem;
  }

  .arrow-down {
    font-size: .28rem;
  }

  .btn {
    font-size: .28rem;
    color: #666;
  }

  .popover-list {
    width: 2.2rem;
    padding: 0 .15rem;
    font-size: .28rem;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
  }
</style>
