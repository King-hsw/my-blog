<template>
  <div id="sidebar" :class="animationStyle">
    <main-menu/>
    <div id="level2-menu">
      <music-player/>
    </div>
  </div>
</template>

<script>
  import MainMenu from "../menu/MainMenu";
  import MusicPlayer from "../../components/MusicPlayer";

  export default {
    name: "Sidebar",
    components: {
      MainMenu,
      MusicPlayer
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


  #level2-menu {
    background-color: aqua;
    width: 100%;
  }
</style>