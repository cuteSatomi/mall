<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img">
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<style scoped>

</style>
