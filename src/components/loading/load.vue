<template>
  <div class="loader">
    <div class="loader-inner" :class="line+' '+min">
      <div></div>
      <div></div>
      <div></div>
      <div v-if="line == 'line-scale-pulse-out'"></div>
      <div v-if="line == 'line-scale-pulse-out'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['typeStyle', 'mini'],
    computed: {
      line(){
        return !this.typeStyle ? 'line-scale-pulse-out' : this.typeStyle
      },
      min(){
        return (this.mini === undefined) ? '' : 'line-mini'
      }
    }
  }
</script>

<style scoped>
  .loader {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    height: 100%;
    align-items: center;
    justify-content: center;
    opacity: inherit;
  }

  .line-scale-pulse-out > div:nth-child(1), .line-scale-pulse-out > div:nth-child(5) {
    -webkit-animation-delay: -0.2s !important;
    animation-delay: -0.2s !important;
  }

  .line-scale-pulse-out > div:nth-child(2), .line-scale-pulse-out > div:nth-child(4) {
    -webkit-animation-delay: -0.4s !important;
    animation-delay: -0.4s !important;
  }

  .line-scale-pulse-out > div {
    background-color: #DE4F45;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
  }

  .line-scale-pulse-out.line-mini > div {
    width: 3px;
    height: 25px;
    margin: 0;
  }

  .ball-pulse > div {
    background-color: #DE4F45;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }
  .ball-pulse.line-mini > div {
    width: 5px;
    height: 5px;
    margin: 0;
    border-radius: 50%;
  }
  .ball-pulse > div:nth-child(1) {
    -webkit-animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .ball-pulse > div:nth-child(2) {
    -webkit-animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .ball-pulse > div:nth-child(3) {
    -webkit-animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  @keyframes scale {
    30% {
      -webkit-transform: scale(0.3);
      transform: scale(0.3);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes line-scale-pulse-out {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }
    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
</style>
