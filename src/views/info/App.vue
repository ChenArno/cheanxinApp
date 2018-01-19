<template>
    <router-view></router-view>

</template>

<script>
import { plusready, plusOpen, plusToast } from "common/plus";

export default {
  data() {
    return {
     
    };
  },
  created() {
    plusready(this.plusready);
  },
  methods: {
    plusready() {
      this.cw = plus.webview.currentWebview();
      this.$router.push({ name: this.cw.type });
    }
  }
};
</script>

<style scoped>

</style>
