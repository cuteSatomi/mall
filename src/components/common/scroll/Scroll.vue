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
        default: 0

      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      //1。创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        //监听滚动位置
        probeType: this.probeType,
        //滚动到底部
        pullUpLoad: this.pullUpLoad,
      });

      //2。监听滚动位置
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', position => {
          //将滚动位置传出
          this.$emit('scrollPosition', position);
        });
      }

      //3。监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        });
      }

    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
