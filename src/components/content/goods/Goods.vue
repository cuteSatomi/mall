<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";

  export default {
    name: "Goods",
    components:{
      GoodsItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  /*设置一行显示多个goods-item*/
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
