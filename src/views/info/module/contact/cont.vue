<!--//通讯录-->
<template>
  <div class="contact-cont">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back">{{ $t('选择联系人') }}</x-header>
    <div class="contact-search">
      <search
        @on-change="getResult"
        @on-focus="onFocus"
        position="absolute"
        auto-scroll-to-top top="47px"
        @on-submit="onSubmit"
        @on-cancel="onCancel"
        ref="search"></search>
    </div>
    <div class="tj-scroll tj-menu phone-viewport" :style="{top:'93px'}">
      <scroller :on-refresh="refresh" class="my-scrol" v-if="search">
        <tjloading slot="refresh-spinner" mini typeStyle="ball-pulse"></tjloading>
        <tjloading slot="infinite-spinner" mini></tjloading>
        <sortMenu class="contact-menu" :list="headList" @na-click="naClick"></sortMenu>
        <template v-for="ch in contList">
          <cell-box :border-intent="false" class="sub-item" is-link @click.native="openAlert(ch)">
            <div class="contact-cell">
              <headIcon :title="ch.shortLabel"
                        :avatarUrl="ch.nodeType==0?ch.avatarUrl:require('assets/img/orgIcon.png')"></headIcon>
              <span>{{ch.label}}</span>
            </div>
          </cell-box>
        </template>
      </scroller>
      <scroller class="my-scrol" v-else>
        <cell-box :border-intent="false" class="sub-item" @click.native="openAlert(sea)" v-for="sea in seaList"
                  :key="sea.id">
          <div class="contact-cell">
            <headIcon :title="sea.shortLabel" v-if="sea.id !== '-1'"
                      :avatarUrl="sea.nodeType==0?sea.avatarUrl:require('assets/img/orgIcon.png')"></headIcon>
            <span>{{sea.shortLabel}}</span>
          </div>
        </cell-box>
      </scroller>
    </div>
  </div>
</template>
<i18n>
选择联系人:
  en: Select contact
更新通讯录失败:
  en: Update Failed
</i18n>
<script>
  import sql from 'common/data/websql'
  import {Cell, CellBox, XImg, Search} from 'vux'
  import sortMenu from 'components/sortMenu.vue'
  import headIcon from 'components/headIcon.vue'
  import {plusready} from 'common/plus'

  export default {
    data(){
      return {
        showContent: true,
        headList: [{
          id: '0',
          shortLabel: this.$t('组织')
        }],
        contList: [],
        childrenList: [],
        sql: '',
        search: true,
        seaList: [{
          id: '-1',
          shortLabel: this.$t('空')
        }],
        nowIndex: 0,
        clickItem: null
      }
    },
    components: {
      Search,
      sortMenu,
      XImg,
      headIcon,
      Cell,
      CellBox
    },
    created(){
      this.sql = new sql();
      this.init();
      plusready(this.plusready)
    },
    mounted(){
    },
    watch: {
      clickItem(val){
        this.slqQuery(val.id).then(v => {
          if (!v) return;
          this.contList = v;
          this.headClick(val);
        })
      }
    },
    methods: {
      plusready(){
        this.cw = plus.webview.currentWebview();
      },
      init(){
        this.slqQuery('0').then(res => {
          if (!res) return
          this.headList = res;
          this.clickItem = res[0];
        })
      },
      refresh(done){
        setTimeout(() => {
          this.sql.clearInsert().then(res => {
            if (res) {
              this.init();
            }
            done();
          }).catch(err => {
            mui.toast(err)
            done();
          });
        }, 1000)
      },
      onFocus(){
        this.search = false;
      },
      onCancel(){
        this.search = true;
        this.seaList = [{
          id: '-1',
          shortLabel: this.$t('空')
        }]
      },
      getResult(val){
        if (val == '')return;
        this.sql.select('user_info', '*', `nodeType = 0 and shortLabel like "%${val}%"`, [], rows => {
          let items = [];
          if (rows) {
            for (let i = 0; i < rows.length; i++) {
              items.push(rows.item(i))
            }
            this.seaList = items;
          }
        })
      },
      back(){
        this.cw.close();
      },
      onSubmit(){
        this.$refs.search.setBlur();
        this.search = true;
      },
      slqQuery(id, type){
        type = !type ? 'pid' : type
        return new Promise((resovle, reject) => {
          this.sql.select('user_info', '*', type + ' = ?', [id], rows => {
            let items = [];
            if (rows) {
              for (let i = 0; i < rows.length; i++) {
                items.push(rows.item(i))
              }
            }
            if (items.length == 0) return resovle(false);
            resovle(items);
          })
        })
      },
      openAlert(node){
        if (node.nodeType == 0) { //点击人员操作
          node.deptName = this.clickItem.shortLabel;
          this.$store.commit('SET_SHOPMSG', node);
          this.$router.push({name: 'more'});
          return
        }
        this.clickItem = node;
      },
      naClick(val){
        this.clickItem = val;
      },
      headClick(value){
        let nowitem = this.headList.findIndex(v => {
          return (v.id == value.id) ? v : false
        })
        if (nowitem == -1) {
          this.headList.push({
            id: value.id,
            shortLabel: value.shortLabel
          })
          return
        }
        this.headList = this.headList.filter((item, x) => {
          if (x <= nowitem) return item
        })
      }
    }
  }
</script>

<style scoped>
  .contact-cont {
    width: 100%;
    height: 100%;
  }

  .contact-cell {
    display: flex;
  }

  .contact-cell span {
    line-height: .91rem;
  }

  .contact-search {
    height: 44px;
  }

  .phone-viewport {
    background-color: #fff;
  }

  .sub-item {
    padding: 5px 15px;
  }

  .sub-item:last-child {
    border-bottom: 1px solid #D9D9D9;
  }

  .contact-menu {
    border-bottom: none !important;
  }
</style>
