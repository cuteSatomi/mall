<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default() {
          return 0;
        }
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      //监听滚动位置
      this.scroll.on('scroll', position => {
        //将滚动位置传出
        this.$emit('scrollPosition', position);
      });

    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
