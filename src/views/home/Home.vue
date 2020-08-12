<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center-nav-bar">购物该</div>
    </nav-bar>
    <!--轮播图-->
    <home-swiper :banners="banners"></home-swiper>
    <!--首页推荐-->
    <home-recommend :recommends="recommends"/>
    <!--本周流行-->
    <feature-view/>

    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"/>

    <!--商品的展示-->
    <goods :goods="showGoods"/>

    <img width="100%" src="~assets/img/tuanzhang.jpg">
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Goods from "../../components/content/goods/Goods";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      Goods
    },
    data() {
      return {
        banners: [
          {
            image: require('../../assets/img/swiper/huoying.jpg'),
            link: 'https://act.mogujie.com/huanxin0001?acm=3.mce.2_10_1jhwa.43542.0.ccy5br4OlfK0Q.pos_0-m_454801-sd_119'
          },
          {
            image: require('../../assets/img/swiper/juren.jpg'),
            link: 'https://act.mogujie.com/ruqiu00001?acm=3.mce.2_10_1ji16.43542.0.ccy5br4OlfK0R.pos_1-m_454889-sd_119'
          },
          {
            image: require('../../assets/img/swiper/longzhu.jpg'),
            link: 'https://act.mogujie.com/huanji001?acm=3.mce.2_10_1jfj8.43542.0.ccy5br4OlfK0S.pos_2-m_453270-sd_119'
          },
          {
            image: require('../../assets/img/swiper/SAO.jpg'),
            link: 'https://act.mogujie.com/liuxing00001?acm=3.mce.2_10_1jepe.43542.0.ccy5br4OlfK0T.pos_3-m_452733-sd_119'
          },
        ],
        recommends: [
          {
            title: '十点抢券',
            image: require('../../assets/img/recommend/kakaxi.jpg'),
            link: "http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          },
          {
            title: '好物特卖',
            image: require('../../assets/img/recommend/naruto.jpg'),
            link: "https://act.mogujie.com/tejiazhuanmai09?acm=3.mce.2_10_1dgge.13730.0.ccy5br4OlfK0V.pos_1-m_313899-sd_119",
          },
          {
            title: '内购福利',
            image: require('../../assets/img/recommend/you.jpg'),
            link: "http://act.meilishuo.com/neigouful001?acm=3.mce.2_10_1b610.13730.0.ccy5br4OlfK0W.pos_2-m_260486-sd_119",
          },
          {
            title: '初秋上新',
            image: require('../../assets/img/recommend/zilaiye.jpg'),
            link: "http://act.meilishuo.com/wap/yxzc1?acm=3.mce.2_10_1dggg.13730.0.ccy5br4OlfK0X.pos_3-m_313900-sd_119",
          },
        ],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop'
      }
    },
    computed:{
      showGoods(){
       return this.goods[this.currentType].list;
      }
    },
    created() {
      //组件创建完成请求轮播图的数据，将数据存储到data中
      this.getHomeMultiData();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {

      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
          default:
            break;
        }
      },


      /**
       * 网络请求相关方法
       */
      //请求轮播图数据
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          //this.banners = res.banners.list;
          //this.recommends = res.data.recommend.list;
        });
      },

      //请求首页商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          console.log(res);
          //将新请求到的商品数据塞到data中
          this.goods[type].list.push(...res.data.list);
          //将data中相应type的page加1
          this.goods[type].list.page++;
        });
      },
    }
  }
</script>

<style scoped>

  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*给首页的tabControl添加悬停功能*/
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
