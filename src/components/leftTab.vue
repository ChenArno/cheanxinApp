<template>
  <div class="tj-scroll tj-menu">
    <div class="leftRef" id="ver-leftRef">
      <div class="leftRef-cell">
        <slot name="left">
        </slot>
      </div>
    </div>

    <div class="rightRef" id="ver-rightRef">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['leftatr', 'atr'],
    data(){
      return {
        timer: 0,
        leftElem: null,
        leftParentElem: null,
        leftListElem: null,
        contElem: null,
        contListElem: null,
        leftParentElemHeight:0,
        length: 0,
        leftTops: [], //存储左侧的scrollTop值
        controlHeight: 0, //左侧类别每一项的高度
        leftMaxScroll: 0, //左侧类别最大可滚动高度
        maxScroll: 0, //右侧内容最大可滚动高度
        contentTops: [0], //存储content的scrollTop值
        lastIndex:0
      }
    },
    mounted(){
      this.$nextTick(() => {  //下次dom重构触发
        setTimeout(()=>{   //异步处理需要
          this.init();
        },0)
      })
    },
    watch: {
      timer(val){
        console.log(val)
      }
    },
    methods: {
      init(){
        this.leftElem = document.getElementById("ver-leftRef");
        this.leftParentElem =this.leftElem.parentNode;
        this.leftParentElemHeight = this.leftParentElem.offsetHeight;
        this.leftListElem = this.leftElem.querySelectorAll(`.${this.leftatr}`);
        this.leftMaxScroll =  this.leftParentElem.scrollHeight - this.leftParentElemHeight;
        this.contElem = document.getElementById("ver-rightRef");
        this.contListElem = this.contElem.querySelectorAll(`.${this.atr}`);
        this.maxScroll = this.contElem.scrollHeight - this.contElem.offsetHeight;
        this.controlHeight = this.leftListElem[0].offsetHeight;
        this.length = this.contListElem.length;
        for (let i = 0; i < this.length; i++) {
          this.leftTops.push(this.leftListElem[i].offsetTop + this.controlHeight);
        }
        for (let i = 1; i < this.length; i++) {
          let offsetTop = this.contListElem[i].offsetTop;
          if (offsetTop + 100 >= this.maxScroll) {
            let height = Math.max(offsetTop + 100 - this.maxScroll, 100);
            let totalHeight = 0;
            let heights = [];
            for (let j = i; j < this.length; j++) {
              let offsetHeight = this.contListElem[j].offsetHeight;
              totalHeight += offsetHeight;
              heights.push(totalHeight);
            }
            for (let m = 0, len = heights.length; m < this.length; m++) {
              this.contentTops.push(parseInt(this.maxScroll - (height - heights[m] / totalHeight * height)))
            }
            break;
          } else {
            this.contentTops.push(parseInt(offsetTop));
          }
        }
        this.addevent(this.contElem);
      },
      addevent(obj){
        obj.addEventListener('scroll',()=>{
          let scrollTop = obj.scrollTop;
          for(let i = 0; i < this.length; i++){
            let offsetTop = this.contentTops[i];
            let offset = Math.abs(offsetTop - scrollTop);
            if (scrollTop < offsetTop) {
              if (scrollTop >= this.maxScroll) {
                this.onScroll(this.length - 1);
              } else {
                this.onScroll(i - 1);
              }
              break;
            } else if (offset < 20) {
              this.onScroll(i);
              break;
            }else if(scrollTop >= this.maxScroll){
              this.onScroll(this.length - 1);
              break;
            }
          }
        })
      },
      onScroll(index){
        if(this.lastIndex !== index){
          this.lastIndex = index;
          this.$emit('leftClick',index);
          //简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
          let controlScrollTop = this.leftParentElem.scrollTop;
          if (controlScrollTop + this.leftParentElemHeight < this.leftTops[index]) {
            this.leftParentElem.scrollTop = this.leftMaxScroll;
          } else if (controlScrollTop > this.leftTops[index] - this.controlHeight) {
            this.leftParentElem.scrollTop = 0;
          }
        }
      },
      rolling(index){
        this.contElem.scrollTop = this.contentTops[index];
      }
    }
  }
</script>

<style scoped>
  .leftRef {
    width: 21%;
    height: 100%;
    overflow-y: auto;
    float: left;
  }

  .leftRef-cell {
    display: table;
    table-layout: fixed;
    overflow: hidden;
    width: 100%;
  }

  .rightRef {
    float: right;
    width: 79%;
    height: 100%;
    background-color: #ffffff;
    padding: 0 0 0 .2rem;
    overflow-y: auto;
  }


</style>
