<template>
  <div class="music-palyer">
    <!--当前歌曲的图片-->
    <div class="music-img"
         :style="musicImgStyle">
    </div>
    <div class="music-controller">
      <!--歌名 后退 播放 快进  播放菜单-->
      <div class="first-line">
        <span>歌名</span>
        <span>作者</span>
        <span>后退</span>
        <div :style="isPlayStyle" @click="playOrPause"/>
        <span>快进</span>
      </div>

      <!--进度条 时间显示 音量 播放顺序 循环模式 歌词显示-->
      <div>
        <!--进度条-->
        <div class="progress-bar">

        </div>
        <!--时间显示-->
        <div class="music-time">
          <!--当前播放时刻-->
          <span>00:21</span>
          <span>/</span>
          <!--当前歌曲总时长-->
          <span></span>
        </div>
        <!--音量-->
        <div></div>
        <!--播放顺序-->
        <div></div>
        <!--循环模式-->
        <div></div>
        <!--歌词显示-->
        <div></div>
      </div>
    </div>
    <div class="music-zoom">></div>
    <button @click="getTime"></button>
    <button @click="playMusic"></button>
  </div>
</template>

<script>
  export default {
    name: "MusicPlayer",
    data() {
      return {
        // 是否播放
        isPlay: false,
        audio: "",
        musicInfo: {
          pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
      }
    },
    created() {
      // this.audio=document.getElementById('music')
      this.audio = document.createElement("audio");
      let that = this;
      this.audio.addEventListener("canplay", () => {
        return 0
      }, false),
          this.audio.addEventListener("timeupdate", () => {
            return 0
          }, false);
      this.audio.addEventListener("ended", () => {
        return 0
      }, false);
      this.audio.addEventListener("error", () => {
        return 0
      }, false);
      this.audio.src = "http://101.133.141.41/su.flac"
    },
    computed: {
      musicImgStyle() {
        return 'background-image:url("' + this.musicInfo.pic + '")'
      },
      isPlayStyle() {
        let pic = this.$store.state.ip
        if (!this.isPlay) {
          pic += 'play.svg'
        } else {
          pic += 'pause.svg'
        }
        return 'background-image:url("' + pic + '")'
      }
    },
    methods: {
      playOrPause() {
        if (this.isPlay) {
          this.audio.pause()
          this.isPlay = false
          return
        }
        this.audio.play()
        this.isPlay = true
      },


      pause() {
        this.audio.pause();
      },
      playMusic() {
        this.audio.play();
      },
      /**
       * 获取音乐总时长
       */
      getTime() {
        let time = this.audio.duration;
        // this.max = time;
        //总共时长的秒数
        // this.time = this.transTime(time);
        console.log(this.transTime(time))
      },
      /**
       * 获取音乐总时长
       * @param value
       * @returns {string}
       */
      formatTime(value) {
        let time = "";
        let s = value.split(":");
        let i = 0;
        for (; i < s.length - 1; i++) {
          time += s[i].length === 1 ? "0" + s[i] : s[i];
          time += ":";
        }
        time += s[i].length === 1 ? "0" + s[i] : s[i];
        return time;
      },
      /**
       * 把毫秒变成时分秒
       * @param value
       * @returns {string}
       */
      transTime(value) {
        let time = "";
        let h = parseInt((value / 3600).toString());
        value %= 3600;
        let m = parseInt((value / 60).toString());
        let s = parseInt((value % 60).toString());
        if (h > 0) {
          time = this.formatTime(h + ":" + m + ":" + s);
        } else {
          time = this.formatTime(m + ":" + s);
        }
        return time;
      },
    }
  }
</script>

<style scoped>
  .first-line > div {
    width: 20px;
    height: 20px;
    background-size: cover;
  }


  .music-palyer {
    height: 66px;
    display: flex;
  }

  .music-img {
    width: 66px;
    height: 66px;
    background-size: cover;
  }

  .music-controller {
    background-color: #ffffff;
  }

  .first-line {
    display: flex;
  }


  .music-zoom {
    background-color: #e6e6e6;
    line-height: 66px;
    height: 66px;
    font-size: 20px;
    color: #919191;
  }
</style>