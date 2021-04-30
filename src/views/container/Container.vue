<template>
  <div id="container">
    <sidebar :animation-style="animationStyle"/>
    <div id="content-container">我好</div>
    <button id="full-screen" @click="doFullscreen">全屏</button>
  </div>
</template>

<script>
  import Sidebar from "../sidebar/Sidebar";

  export default {
    name: "Container",
    components: {
      Sidebar
    },
    data() {
      return {
        animationStyle: [],
      }
    },
    methods: {
      doFullscreen() {
        if (!this.$store.state.isFullScreen) {
          this.$store.commit('changeFullScreen')
          this.animationStyle = ("do-full-screen")
        } else {
          this.$store.commit('changeFullScreen')
          this.animationStyle = ["no-full-screen"]
        }
      }
    }
  }
</script>

<style scoped>
  /* 主容器*/
  #container {
    display: flex;
    height: 100%;
  }


  #full-screen {
    position: fixed;
    top: 16px;
    right: 24px;
  }

  .do-full-screen {
    animation: fullScreen .7s;
    animation-fill-mode: forwards;
  }

  .no-full-screen {
    animation: noFullScreen .7s;
    animation-fill-mode: forwards;
  }



  #content-container {
    width: 100%;
    /*height: 100%;*/
  }

  /*全屏动画效果*/
  @keyframes fullScreen {
    0% {
      min-width: 500px;
    }
    100% {
      margin-left: -500px
    }
  }

  /*取消全屏动画效果*/
  @keyframes noFullScreen {
    0% {
      margin-left: -500px;
    }
    100% {
      margin-left: 0px;
      min-width: 500px;
    }
  }



</style>