<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" :key="goodsItem.iid" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <!--收藏-->
      <span class="collet">{{goodsItem.cfav}}</span>
    </div>
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
    },
    methods: {
      //每一个imageItem加载完成之后会向bus发送一个名为itemImageLoad的事件
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    /*设置每个item宽占屏幕的48%*/
    width: 46%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 10px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collet {
    position: relative;
  }

  .goods-info .collet::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
