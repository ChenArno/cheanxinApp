<template>
  <div class="tj-card-cell">
    <div class="tj-card-img">
      <slot name="img">
      </slot>
    </div>
    <div class="tj-card-body">
      <slot></slot>
    </div>
    <div class="tj-card-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    }
  }
</script>

<style scoped>
  .tj-card-cell {
    padding: .22rem .23rem;
    background: #fff;
    border-radius: 4px;
    position: relative;
    transition: all .2s ease-in-out;
    border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
  }

  .tj-card-img {
    width: 1.1rem;
    height: 1.1rem;
    flex: 2;
  }

  .tj-card-body {
    flex: 6;
    display: inherit;
    padding: 0 .2rem;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .tj-card-right {
    flex: 2;
    font-size: .36rem;
    color: #F64F44;
    text-align: right;
  }
</style>
