<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center-nav-bar">购物该</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMoreGoods">
      <!--轮播图-->
      <home-swiper :banners="banners"/>
      <!--首页推荐-->
      <home-recommend :recommends="recommends"/>
      <!--本周流行-->
      <feature-view @featureViewLoad="featureViewLoad"/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
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
  import {debounce} from "../../common/utils";

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
        isFeatureViewLoad: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
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
      //图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        //图片加载完成刷新一次scrollHeight
        refresh();
      });
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        //1。判断BackTop组件是否显示
        this.isBackTopShow = (-position.y) > 1000;

        //2。决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMoreGoods() {
        this.getHomeGoods(this.currentType);
      },
      //swiper中的图片是否加载完成
      //当HomeSwiper和FeatureView组件中的图片加载完成后得到tabControl的offsetTop
      //这里不知道怎么处理，总有一个组件没加载出来不知道是哪个，所以就先在上面把tabOffsetTop写死成588(iphone 6/7/8)
      /*swiperImageLoad() {
        console.log(this.$refs.tabControl2.$el.offsetTop);
        //this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isSwiperImageLoad = true;
      },
      recommendImgLoad() {
        console.log(this.$refs.tabControl2.$el.offsetTop);
        //this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isRecommendImgLoad = true;
      },*/
      //多次调试发现由于轮播图和推荐使用的是本地图片，所以featureView组件中的图片才是最后加载的，只需监听这一个imageLoad即可
      featureViewLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

          //请求完一次加载更多之后执行finishPullUp
          this.$refs.scroll.finishPullUp();
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

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  /*  !*给首页的tabControl添加悬停功能*!
    .tab-control {
      !*position: sticky;*!
      top: 44px;
      z-index: 8;
      margin-bottom: 6px;
    }*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*  .content{
      height: calc(100% - 93px);
      overflow: hidden;
      margin-top: 44px;
    }*/
</style>
