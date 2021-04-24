<template>
  <div id="main-menu">
    <el-avatar id="avatar" shape="circle " :size="140" :fit="fit" :src="avatar">nihao</el-avatar>
    <ul>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
    </ul>
    <music-player/>
  </div>
</template>

<script>
  import MusicPlayer from "../../components/MusicPlayer";

  export default {
    name: "MainMenu",
    components: {
      MusicPlayer
    },
    data() {
      return {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

      }
    }
  }
</script>

<style scoped>

  #main-menu {
    background-color: rebeccapurple;
    min-width: 240px;
  }

  #avatar {
    margin: 75px 45px 45px 45px
  }

  #main-menu > ul {
    list-style: none;
    padding: 0;
    text-align: center;
  }
</style>