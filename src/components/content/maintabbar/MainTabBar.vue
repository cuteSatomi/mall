<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home_active.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/home.svg"/>
      <div slot="icon-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category_active.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/category.svg"/>
      <div slot="icon-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart_active.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart.svg"/>
      <div slot="icon-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile_active.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/profile.svg"/>
      <div slot="icon-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
