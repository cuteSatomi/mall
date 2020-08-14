<template>
  <swiper id="swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" :key="item">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "../../../components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  #swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
