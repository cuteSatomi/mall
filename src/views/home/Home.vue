<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center-nav-bar">购物该</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true">
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

    </scroll>

    <!--返回顶部组件-->
    <back-top @click.native="backTopClick" v-show="isBackTopShow"/>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childcomps/HomeSwiper";
  import HomeRecommend from "./childcomps/HomeRecommend";
  import FeatureView from "./childcomps/FeatureView";
  import TabControl from "../../components/content/tabcontrol/TabControl";
  import Goods from "../../components/content/goods/Goods";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backtop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      Goods,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isBackTopShow: false,
      }
    },
    computed: {
      showGoods() {
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
    mounted() {
      const refresh =this.debounce(this.$refs.scroll.refresh,200);
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        //图片加载完成刷新一次scrollHeight
        refresh();
      });
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
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        this.isBackTopShow = (-position.y) > 1000;
      },
      //防抖函数
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
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
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
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
    /*position: sticky;*/
    top: 44px;
    z-index: 8;
    margin-bottom: 6px;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*  .content{
      height: calc(100% - 93px);
      overflow: hidden;
      margin-top: 44px;
    }*/
</style>
