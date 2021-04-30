<template>
  <div id="sidebar" :class="animationStyle">
    <main-menu/>
    <div id="level2-menu">
      <ul>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
      </ul>
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
  }


  #level2-menu {
    width: 100%;
  }
</style>