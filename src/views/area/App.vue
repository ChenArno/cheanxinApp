<template>
  <div class="area-cont">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back">
      <i slot="right" class="tj-submit" @click="submit"> {{ $t('确定') }}
        <md-ink-ripple/>
      </i>
      {{ $t('选择') }}{{ $t(typeName) }}
    </x-header>
    <div class="contact-search">
      <search
        @on-focus="onFocus"
        position="absolute"
        auto-scroll-to-top top="47px"
        @on-submit="onSubmit"
        @on-cancel="onCancel"
        ref="search"></search>
    </div>
    <sortMenu :list="headList" @na-click="naClick" :props="{label:'label'}"></sortMenu>
    <div class="are-list tj-scroll tj-menu" :style="{'margin-top': margin}">
      <scroller v-if="this.top == 40" :on-refresh="refresh">
        <tjloading slot="refresh-spinner" mini typeStyle="ball-pulse"></tjloading>
        <tjloading slot="infinite-spinner" mini></tjloading>
        <alarmList class="area-list" lbody v-for="item in treeList" :key="item.id" @click.native="nextList(item)">
          <div slot="left" class="are-list-cell">
            {{item.label}}
          </div>
          <span class="icon-emufibaron iconfont" slot="right" v-if="areaSelect && (areaSelect.id == item.id)"></span>
        </alarmList>
        <alarmList border lbody v-for="(item,index) in shopList" :key="item.id">
          <div slot="left" class="list-cell">
            {{item.deptName}}
            <md-radio v-model="radio" name="my-test-group1" :md-value="item.id"></md-radio>
          </div>
        </alarmList>
      </scroller>
      <scroller v-else>
        <alarmList border lbody v-for="(item,index) in checklist" :key="item.id">
          <div slot="left" class="list-cell">
            {{item.deptName}}
            <md-radio v-model="radio" name="my-test-group1" :md-value="item.id"></md-radio>
          </div>
        </alarmList>
      </scroller>
    </div>
    <tjSpinner :tjLoad="tjLoad"></tjSpinner>
  </div>
</template>
<script>
  import native from 'common/plus/plusNative'
  import {plusready, plusOpen} from 'common/plus'
  import {Search} from 'vux'
  import {queryPrmUserShopRegionTree, queryPrmUserShop} from 'api/Initialize'
  import alarmList from 'components/alarmList.vue'
  import sortMenu from 'components/sortMenu.vue'
  import {treeNode} from 'utils/validate'
  import {mapGetters} from 'vuex'
  import tjSpinner from 'components/loading/tjSpinner.vue'

  export default {
    data(){
      return {
        dataList: [],
        headList: [{id: 0, label: this.$t('组织')}],
        treeList: [],
        shopList: [],
        radio: -1,
        areaSelect: null,
        nowNode: null,
        top: 40,
        cw: null,
        page: '',
        nextOrBack: true,
        areaType: null,
        tjLoad: false,
        checklist: [] //远程搜索
      }
    },
    components: {
      Search,
      alarmList,
      sortMenu,
      tjSpinner
    },
    created(){
      plusready(this.plusready);
    },
    mounted(){
     // this.areaType = 'shop';
     // this.page = 'sysRFID';
     // this.queryPrmUserShopRegionTree();
    },
    computed: {
      margin(){
        return (this.top + 44) + 'px'
      },
      ...mapGetters([
        'defalutDep',
        'defalutArea'
      ]),
      typeName(){
        if (this.areaType == 'area') return this.$t('区域');
        return this.$t('门店')
      }
    },
    watch: {
      nowNode(val){
        this.queryPrmUserShop(val.id).then(res => {
          if (val.id == 0) {
            this.shopList = [];
            this.firstNode();
            this.changeNode(val);
            return;
          }
          if (this.areaType == 'shop' && res) {
            this.shopList = res;
            this.treeList = this.getNextNod(val);
            this.changeNode(val);
            return
          }
          let list = this.getNextNod(val);
          if (list.length == 0) {
            this.areaSelect = val;
            return;
          }
          this.treeList = list;
          this.changeNode(val);
        })
      },
      shopList(val){
        if (val.length == 0) return;
        let [{id}] = val;
        this.radio = id;
      }
    },
    methods: {
      plusready(){
        this.cw = plus.webview.currentWebview();
        this.areaType = this.cw.areaType;
        this.page = this.cw.page;
        this.queryPrmUserShopRegionTree();
      },
      refresh(done){
        setTimeout(() => {
          this.queryPrmUserShopRegionTree().then(() => {
            this.headList = [{id: 0, label: this.$t('组织')}];
            done();
          }).catch(() => {
            done();
          });
        }, 1000)
      },
      queryPrmUserShopRegionTree(){
        return new Promise((resolve, reject) => {
          this.tjLoad = true;
          let defal = null;
          if (this.areaType == 'area') {
            defal = this.defalutArea;
            this.areaSelect = defal;
          } else {
            defal = this.defalutDep;
            this.radio = defal && defal.id;
          }
          queryPrmUserShopRegionTree().then(res => {
            this.tjLoad = false;
            if (res.data && res.data.treeData) {
              this.dataList = res.data.treeData;
              this.firstNode();
            }
            resolve();
          }).catch(err => {
            this.tjLoad = false;
            reject(err);
          })
        })
      },
      back(){
        this.cw.close();
      },
      submit(){
        if (this.areaType == 'shop') {
          if (this.radio == -1) return;
          this.shopList.map(v => {
            if (this.radio == v.id) {
              let val = JSON.stringify(v);
//              if (!window.plus) {
//                this.$store.commit('SET_DEFALUTDEP', val);
//              }
              plus.webview.getWebviewById(`${this.page}.html`).evalJS(`selection.shop('${val}')`);
              this.back();
            }
          })
        } else {
          if (!this.areaSelect) return;
          let val = JSON.stringify(this.areaSelect);
         // if (!window.plus) {
         //   this.$store.commit('SET_DEFALUTAREA', val);
         // }
          plus.webview.getWebviewById(`${this.page}.html`).evalJS(`selection.area('${val}')`);
          this.back();
        }
      },
      firstNode(){
        this.treeList = this.dataList.map(val => {
          return {
            id: val.id,
            label: val.label,
            pid: val.pid
          }
        })
      },
      naClick(node){
        this.nowNode = node;
        this.nextOrBack = false;
      },
      nextList(node){
        this.nowNode = node;
        this.nextOrBack = true;
      },
      changeNode(node){
        if (this.nextOrBack) {
          this.headList.push(node);
        } else {
          let begin = true;
          let newList = [];
          this.headList.map(v => {
            if (!begin) return
            newList.push(v);
            if (v.id == node.id) {
              begin = false;
            }
          });
          this.headList = newList;
        }
      },
      queryPrmUserShop(id){
        return new Promise((resolve, reject) => {
          queryPrmUserShop(id).then(res => {
            resolve(res.data)
          }).catch(err => {
            resolve(false);
          })
        })
      },
      getNextNod(val){
        let list = [];
        this.dataList.map(v => {
          list = (v.id == val.id && v.children) ? v.children : []
        })
        return list
      },
      onFocus(){
        this.top = 0;
      },
      onSubmit(){

      },
      onCancel(){
        this.top = 40;
      }
    }
  }
</script>

<style scoped>
  .area-cont {
    background-color: #ffffff;
  }

  .icon-emufibaron {
    color: #EC4F46;
  }

  .area-list {
    margin-top: 0 !important;
    border-bottom: 1px solid #E3E6E6;
    background-color: #ffffff;
  }
  .are-list-cell {
    width: 100%;
  }
</style>
