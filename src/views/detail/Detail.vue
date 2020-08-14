<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";

  import {getDetail, Goods} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        //轮播图数据
        topImages: [],
        goods: {},
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //根据iid请求数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        //将商品信息封装到goods中
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      });
    }
  }
</script>

<style scoped>

</style>
