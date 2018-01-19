<template>
  <div id="table">
    <table class="table" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th v-for="item in title">{{ item }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,x) in data" class="table-td" :class="(x<3)?'tr-cell':''">
        <td>
          <span>{{ x + 1 }}</span>
        </td>
        <td v-for="per in item">
          <span>{{ per }}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="show" class="no-data">{{ $t('暂无数据') }}</div>
  </div>
</template>
<script>
  export default {
    name: "table",
    props: ['title', 'data'],
    created(){
      console.log(this.data)
    },
    computed: {
      show(){
        if (this.data && this.data.length == 0) {
          return true
        }
      }
    }
  }
</script>
<style scoped>
  #table {
    padding-top: .2rem;
  }

  .table {
    width: 100%;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    font-size: .28rem;
  }

  .table thead {
    background: #FAFAFA;
    color: #999999;
  }

  .table tbody {
    background: #fff;
  }

  .table tr {
    height: .71rem;
  }

  .table tbody {
    color: #333;
  }

  .table td, .table th {
    text-align: center;
    border-top: 1px solid #ddd;
  }

  .tr-cell:nth-child(1) td:nth-child(1) span {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background: #2BC086;
  }

  .tr-cell:nth-child(2) td:nth-child(1) span {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background: #FFB033;
  }

  .tr-cell:nth-child(3) td:nth-child(1) span {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background: #FF6A57;
  }

  .no-data {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }
</style>
