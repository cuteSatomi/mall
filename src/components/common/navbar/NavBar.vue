<template>
  <div class="nav-bar">
    <div class="left-nav-bar">
      <slot name="left-nav-bar"></slot>
    </div>
    <div class="center-nav-bar">
      <slot name="center-nav-bar"></slot>
    </div>
    <div class="right-nav-bar">
      <slot name="right-nav-bar"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /*导航栏底部阴影设置*/
    box-shadow: 0 2px 2px rgba(100, 100, 100, .2);
  }

  .left-nav-bar, .right-nav-bar {
    /*左边和右边分别占据60px*/
    width: 60px;
  }

  .center-nav-bar {
    /*中间会占据所剩下的所有宽度*/
    flex: 1;
  }
</style>
