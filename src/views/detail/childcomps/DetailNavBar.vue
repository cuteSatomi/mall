<template>
  <div>
    <nav-bar>
      <div slot="left-nav-bar" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg">
      </div>
      <div slot="center-nav-bar" class="title">
        <div v-for="(item,index) in title"
             class="title-item"
             :class="{active:index == currentIndex}"
             @click="titleClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
    },
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick",index);
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 12px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
    font-weight: bolder;
  }

  .back {
    margin-top: 5px;
  }

  .back img {
    width: 35px;
    height: 35px;
  }
</style>
