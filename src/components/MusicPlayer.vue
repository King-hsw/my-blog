<template>
  <div class="music-palyer">
    <!--当前歌曲的图片-->
    <div class="music-img"
         :style="musicImgStyle">
    </div>
    <div class="music-controller">
      <!--歌名 后退 快进 播放 播放菜单-->
      <div>
        <span>歌名</span>
        <span>作者</span>
      </div>
      <!--进度条 音量 播放顺序 循环模式 歌词显示-->
      <div>
        <!--进度条-->
        <div class="progress-bar">

        </div>
      </div>
    </div>
    <div class="music-zoom">></div>

  </div>
</template>

<script>
  export default {
    name: "MusicPlayer",
    data() {
      return {
        musicInfo: {
          pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      }
    },
    computed: {
      musicImgStyle() {
        return 'background-image:url("' + this.musicInfo.pic + '")'
      }
    }
  }
</script>

<style scoped>
  .music-palyer {
    height: 66px;
    display: flex;
  }

  .music-img {
    width: 66px;
    height: 66px;
    background-size: cover;
  }

  .music-controller{
    background-color: #ffffff;
  }

  .music-zoom {
    background-color: #e6e6e6;
    line-height: 66px;
    height: 66px;
    font-size: 20px;
    color: #919191;
  }
</style>