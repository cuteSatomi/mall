<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left-nav-bar"></div>
      <div slot="center-nav-bar">购物该</div>
      <div slot="right-nav-bar"></div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: "Home",
    components:{
      NavBar,
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>
