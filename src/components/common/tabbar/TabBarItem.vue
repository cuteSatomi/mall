<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="icon-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#1296db'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.includes(this.path);
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {color: '#cdcdcd'};
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    height: 49px;


  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 1px;
    vertical-align: middle;
  }
</style>