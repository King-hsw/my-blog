<template>
  <div id="sidebar" :class="animationStyle">
    <main-menu/>
    <div id="level2-menu"> 大猪</div>
  </div>
</template>

<script>
  import MainMenu from "../menu/MainMenu";
  export default {
    name: "Sidebar",
    components:{
      MainMenu
    },
    props: {
      animationStyle: {
        default: []
      }
    }
  }
</script>

<style scoped>
  #sidebar {
    display: flex;
    min-width: 500px;
    background-color: red;
  }


  #level2-menu{
    background-color: aqua;
    width: 100%;
  }
</style>