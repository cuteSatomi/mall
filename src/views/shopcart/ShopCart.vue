<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center-nav-bar">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->


    <img width="100%" src="~assets/img/tuanzhang.jpg">
  </div>
</template>

<script>

  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childcomps/CartList";

  import {mapGetters} from "vuex";

  export default {
    name: "ShopCart",
    components: {
      NavBar,
      CartList,

    },
    computed: {
      ...mapGetters({
        length: "cartLength",
        list: "cartList"
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .cart{
    height: 100vh;
  }
</style>
