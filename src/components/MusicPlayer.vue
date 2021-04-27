<template>
  <div class="music-palyer">
    <!--当前歌曲的图片-->
    <div class="music-img"
         :style="musicImgStyle">
    </div>
    <div class="music-controller" ref="musicController">
      <!--歌名 后退 播放 快进  播放菜单-->
      <div class="first-line">
        <span>歌名</span>
        <span>作者</span>
        <!--后退-->
        <div>
          <svg-icon icon-name="back"
                    class-name="svg-icon"
                    @mouseenter="changeIconColor($event,'#5b5b5b')"
                    @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
        <!--播放-->
        <div>
          <svg-icon
              :icon-name="isPlayStyle"
              class-name="svg-icon"
              @click="playOrPause"
              @mouseenter="changeIconColor($event,'#5b5b5b')"
              @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
        <!--快进-->
        <div>
          <svg-icon
              icon-name="forward"
              class-name="svg-icon"
              @mouseenter="changeIconColor($event,'#5b5b5b')"
              @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
        <!--播放列表-->
        <div>
          <svg-icon
              icon-name="playlist"
              class-name="svg-icon"
              @click="changePlayList"
              @mouseenter="changeIconColor($event,'#5b5b5b')"
              @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
      </div>
      <!--进度条 时间显示 音量 播放顺序 循环模式 歌词显示-->
      <div class="second-line">
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
        <div>
          <svg-icon icon-name="volume"
                    @mouseenter="changeIconColor($event,'#5b5b5b')"
                    @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
        <!--播放顺序-->
        <div>
          <svg-icon :icon-name="currentOrderMode"
                    @mouseenter="changeIconColor($event,'#5b5b5b')"
                    @mouseleave="changeIconColor($event,'#adadad')"
                    @click="changeOrderMode"/>
        </div>
        <!--循环模式-->
        <div>
          <svg-icon
              :icon-name="currentLoopMode"
              @mouseenter="changeIconColor($event,'#5b5b5b')"
              @mouseleave="changeIconColor($event,'#adadad')"
              @click="changeLoopMode"/>
        </div>
        <!--歌词显示-->
        <div>
          <svg-icon icon-name="lyric"
                    @mouseenter="changeIconColor($event,'#5b5b5b')"
                    @mouseleave="changeIconColor($event,'#adadad')"/>
        </div>
      </div>
    </div>
    <div class="music-expand" @click="changeExpand">{{ isExpandStyle }}</div>
    <div class="play-list" ref="playList"></div>
  </div>
</template>

<script>
  import SvgIcon from "./SvgIcon";

  export default {
    name: "MusicPlayer",
    components: {SvgIcon},
    props: {
      expand: {
        default: true
      },
      openPlayList: {
        default: false
      }
    },
    data() {
      return {
        //当前循环模式
        currentLoopMode: 'loopNone',
        //循环模式
        loopModes: ['loopNone', 'loopOne', 'loopAll'],
        currentOrderMode: 'orderList',
        orderModes: ['orderList', 'orderRandom'],
        // 是否播放
        isPlay: false,
        isExpand: this.expand,
        isOpenPlayList: this.openPlayList,
        audio: "",
        musicInfo: {
          pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
        ,
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
        if (!this.isPlay) {
          return 'play'
        } else {
          return 'pause'
        }
      },
      isExpandStyle() {
        if (!this.isExpand) {
          return '>'
        } else {
          return '<'
        }
      }
    },
    methods: {
      changePlayList() {
        this.$refs.playList.classList.add('drop');
        console.log( this.$refs.playList.classList)
      },
      changeExpand() {
        if (this.$refs.musicController.classList.contains('indentation')) {
          this.$refs.musicController.classList.remove('indentation')
        }
        if (this.$refs.musicController.classList.contains('spread')) {
          this.$refs.musicController.classList.remove('spread')
        }
        if (this.isExpand) {
          this.$refs.musicController.classList.add('indentation')
          this.isExpand = false;
        } else {
          this.$refs.musicController.classList.add('spread')
          this.isExpand = true;
        }
      },
      // 切换播放模式
      changeOrderMode() {
        for (let [index, value] of this.orderModes.entries()) {
          if (value === this.currentOrderMode) {
            if ((index + 1) === this.orderModes.length) {
              index = -1
            }
            this.currentOrderMode = this.orderModes[index + 1]
            return
          }
        }
      },
      // 切换循环模式
      changeLoopMode() {
        for (let [index, value] of this.loopModes.entries()) {
          if (value === this.currentLoopMode) {
            if ((index + 1) === this.loopModes.length) {
              index = -1
            }
            this.currentLoopMode = this.loopModes[index + 1]
            return
          }
        }
      },
      changeIconColor(event, color) {
        event.target.style.fill = color
      },
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

  .music-palyer {
    position: absolute;
    height: 66px;
    display: flex;
    /*音乐播放器控制器的宽度*/
    --music-controller-width: 144px;
    /*音乐图片宽度*/
    --music-img-width: 66px;
    /*播放列表的高度*/
    --play-list-height: 50px;
  }


  .svg-icon {
    cursor: pointer;
    fill: #adadad
  }

  .first-line > div {
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
  }

  .play-list {
    width: calc(var(--music-img-width) + var(--music-controller-width));
    height: var(--play-list-height);
    background-color: aqua;
    position: absolute;
    top: calc(-1 * var(--play-list-height));
    margin-bottom: -px;
    z-index: 10000;
  }


  .music-img {
    z-index: 2;
    width: 66px;
    height: 66px;
    background-size: cover;
  }

  .music-controller {
    background-color: #ffffff;
    width: var(--music-controller-width);
  }

  .music-controller > div {
    display: flex;
  }


  .music-expand {
    background-color: #e6e6e6;
    line-height: 66px;
    height: 66px;
    font-size: 20px;
    color: #919191;
  }

  /*------------------过渡动画效果------------------*/
  .spread {
    animation: spread 1s;
    animation-fill-mode: forwards;
  }

  @keyframes spread {
    0% {
      margin-left: calc(-1 * var(--music-controller-width))
    }
    100% {
      margin-left: 0px
    }
  }

  .indentation {
    animation: indentation 1s;
    animation-fill-mode: forwards;
  }

  @keyframes indentation {
    0% {
      margin-left: 0px
    }
    100% {
      margin-left: calc(-1 * var(--music-controller-width))
    }
  }


  .drop {
    animation: drop 0.7s;
    animation-fill-mode: forwards;
  }

  @keyframes drop {
    from {
    }
    to {
      /*margin-bottom: calc(-1 * var(--play-list-height));*/
    }
  }


</style>