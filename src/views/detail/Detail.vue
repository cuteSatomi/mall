<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probeType="3" @scrollPosition="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>

    <img width="100%" src="../../assets/img/tuanzhang.jpg">
  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamInfo from "./childcomps/DetailParamInfo";
  import DetailCommentInfo from "./childcomps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/Goods";
  import DetailBottomBar from "./childcomps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    data() {
      return {
        iid: null,
        //轮播图数据
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
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

        //获取店铺的信息
        this.shop = new Shop(data.shopInfo);

        //获取detailInfo
        this.detailInfo = data.detailInfo;

        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

      });

      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })
    },
    mounted() {
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
      contentScroll(position) {
        //获取Y值
        const positionY = -position.y;

        let length = this.themeTopYs.length;
        for (let index = 0; index < length; index++) {
          if (this.currentIndex !== index && ((index < length - 1 && positionY >= this.themeTopYs[index] && positionY < this.themeTopYs[index + 1])
            || (index === length - 1 && positionY >= this.themeTopYs[index]))) {
            this.currentIndex = index;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },

      addToCart(){
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // this.$store.commit("addToCart",product);
        this.$store.dispatch("addToCart",product);
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
