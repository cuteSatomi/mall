<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="../../../assets/img/home/recommend_bg.jpg" @load="imageLoad">
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    data(){
      return{
        isFeatureViewLoad: true,
      }
    },
    methods:{
      //监听该组件图片是否加载完成
      imageLoad(){
        if(this.isFeatureViewLoad){
          this.$emit('featureViewLoad');
          this.isFeatureViewLoad = false;
        }
      }
    }
  }
</script>

<style scoped>
  .feature img{
    width: 100%;
  }
</style>
