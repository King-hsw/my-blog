<template>
  <div id="main-menu">
    <div>
      <el-avatar id="avatar" shape="circle" :size="140" :src="avatar">nihao</el-avatar>
    </div>
    <ul>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
      <li>你好</li>
    </ul>
    <div>123</div>
    <!--<music-player :music-infos="musicInfos"/>-->
  </div>
</template>

<script>
  import MusicPlayer from "../../components/MusicPlayer";
  import MusicInfos from "../../mock/music.json"

  export default {
    name: "MainMenu",
    components: {
      MusicPlayer
    },
    data() {
      return {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        musicInfos: MusicInfos
      }
    }
  }
</script>

<style scoped>

  #main-menu {
    background-color: #474d57;
    min-width: 240px;
  }

  div:first-of-type {
    border-bottom: 1px solid #3c4149;
  }

  div:nth-of-type(2) {
    border-top: 1px solid #525965;
  }

  #avatar {
    margin: 75px 45px 45px 45px;
    border: #aaaaaa 2px solid;
    transition: all 1s ease-in-out;
  }

  #avatar:hover {
    transform: rotate(360deg);
  }

  #main-menu > ul {
    list-style: none;
    padding: 0;
    text-align: center;
  }

  li {
    border-top: 1px solid #525965;
    border-bottom: 1px solid #3c4149;
    padding-top: 2px;
    padding-bottom: 2px;
    color: #c2bebf;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
</style>