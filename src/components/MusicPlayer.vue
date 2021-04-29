<template>
  <div class="music-player">
    <!--当前歌曲的图片-->
    <div class="music-img"
         :style="musicImgStyle">
    </div>
    <div class="music-controller" ref="musicController">
      <!--歌名 后退 播放 快进  播放菜单-->
      <div class="first-line">
        <span>{{ musicInfo.author }}</span>
        <span>-{{ musicInfo.name }}</span>
        <!--后退-->
        <div style="display:flex;position: absolute;right: 0">`
          <div>
            <svg-icon icon-name="back"
                      class-name="svg-icon"
                      @click="backMusic"
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
                @click="forwardMusic"
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
      </div>
      <!--进度条 时间显示 音量 播放顺序 循环模式 歌词显示-->
      <div class="second-line">
        <!--进度条-->
        <div class="progress-bar">
          <slider min="0" :max="max" :value="numb" @change="getVal"/>
        </div>
        <!--时间显示-->
        <div class="music-time">
          <!--当前播放时刻-->
          <span>{{ newTime }}</span>
          <span>/</span>
          <!--当前歌曲总时长-->
          <span>{{ time }}</span>
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
    <div class="play-list" ref="playList">
      <ol>
        <li v-for="(item,index) in musicInfos" @click="changeCurrentMusicInfo(index)"
            :style="musicInfo.index===index?'background-color:red;':''">
          {{ index + 1 + '.' + item.name }}
          <span>{{ item.author }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import SvgIcon from "./SvgIcon";
  import Slider from "./Slider";

  export default {
    name: "MusicPlayer",
    components: {Slider, SvgIcon},
    props: {
      // 是否展开
      expand: {
        default: true
      },
      musicInfos: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        max: 0,
        // 当前音乐播放进度的时间戳
        numb: 0,
        time: "00:00",
        //  格式化后的当前音乐播放进度的时间
        newTime: "00:00",
        //当前循环模式
        currentLoopMode: 'loopNone',
        //循环模式
        loopModes: ['loopNone', 'loopOne', 'loopAll'],
        currentOrderMode: 'orderList',
        orderModes: ['orderList', 'orderRandom'],
        // 是否播放
        isPlay: false,
        isExpand: this.expand,
        isOpenPlayList: false,
        audio: "",
        musicInfo: {
          pic: this.musicInfos[0].pic,
          src: this.musicInfos[0].src,
          name: this.musicInfos[0].name,
          author: this.musicInfos[0].author,
          index: 0
        }
        ,
      }
    },
    created() {
      // 创建<audio>元素
      this.audio = document.createElement("audio");
      let that = this;
      this.audio.addEventListener("canplay", that.mCanplay, false);
      this.audio.addEventListener("timeupdate", that.mTimeUpdate, false);
      this.audio.addEventListener("ended", that.mEnded, false);
      this.audio.addEventListener("error", () => {
        return 0
      }, false);
      this.audio.src = "https://mp32.9ku.com/upload/128/2018/02/09/875689.mp3"
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
      mEnded() {
        switch (this.currentLoopMode) {
          case "loopNone":
            if (this.musicInfo.index + 1 === this.musicInfos.length) {
              return
            }
            this.forwardMusic()
            break;
          case "loopOne":
            this.changeCurrentMusicInfo(this.musicInfo.index)
            break;
          case "loopAll":
            this.forwardMusic()
            break;
        }
      },


      backMusic() {
        if (this.musicInfo.index === 0) {
          this.changeCurrentMusicInfo(this.musicInfos.length - 1)
        } else {
          this.changeCurrentMusicInfo(this.musicInfo.index - 1)
        }
      },
      forwardMusic() {
        if (this.musicInfo.index + 1 === this.musicInfos.length) {
          this.changeCurrentMusicInfo(0)
        } else {
          this.changeCurrentMusicInfo(this.musicInfo.index + 1)
        }
      },
      changeCurrentMusicInfo(index) {
        this.musicInfo.pic = this.musicInfos[index].pic
        this.musicInfo.src = this.musicInfos[index].src
        this.musicInfo.name = this.musicInfos[index].name
        this.musicInfo.author = this.musicInfos[index].author
        this.musicInfo.index = index
      },

      // 调整音乐进度
      getVal(value) {
        console.log(value)
        this.numb = value
        console.log(this.numb)
        if (!this.audio.paused || this.audio.currentTime != 0) {
          this.audio.currentTime = this.numb;
          if (this.numb === Math.floor(this.max)) {
            this.audio.pause();
            this.isPlay = false;
          }
        }
      },
      // 用于监听播放音乐器加载状态
      mCanplay() {
        this.canplay = true;
        if (this.loading) {
          this.audio.play(); // 播放
          this.isPlay = true;
        }
        this.getTime();
      },
      // 用于监听歌曲播放进度
      mTimeUpdate() {
        this.numb = this.audio.currentTime;
        this.newTime = this.transTime(this.audio.currentTime);
      },
      changePlayList() {
        if (this.$refs.playList.classList.contains('drop')) {
          this.$refs.playList.classList.remove('drop')
        }
        if (this.$refs.playList.classList.contains('rise')) {
          this.$refs.playList.classList.remove('rise')
        }
        if (this.isOpenPlayList) {
          this.$refs.playList.classList.add('drop');
          this.isOpenPlayList = false;
        } else {
          this.$refs.playList.classList.add('rise');
          this.isOpenPlayList = true;
        }
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
          if (this.$refs.playList.classList.contains('drop')) {
            this.$refs.playList.classList.remove('drop')
          }
          if (this.$refs.playList.classList.contains('rise')) {
            this.$refs.playList.classList.remove('rise')
          }
          if (this.isOpenPlayList) {
            this.$refs.playList.classList.add('drop');
            this.isOpenPlayList = false;
          }
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
      /**
       * 获取音乐总时长
       */
      getTime() {
        let time = this.audio.duration;
        this.max = time;
        //总共时长的秒数
        this.time = this.transTime(time);
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

  .music-player {
    position: absolute;
    height: 66px;
    display: flex;
    /*音乐播放器控制器的宽度*/
    --music-controller-width: 300px;
    /*音乐图片宽度*/
    --music-img-width: 66px;
    /*播放列表的高度*/
    --play-list-height: 50px;
  }

  .first-line {
    margin: 0px 0px 13px 5px;
    padding: 0px 0px 2px;
    font-size: 14px;
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
    height: 0;
    background-color: white;
    position: absolute;
    bottom: 65px;
    z-index: 10000;
    overflow-y: scroll;

  }

  ::-webkit-scrollbar {
    display: none;
  }

  ol {
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
  }

  li {
    position: relative;
  }

  li > span {
    position: absolute;
    right: 0;
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
    white-space: nowrap;
    overflow-x: hidden;
    position: relative;
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
      margin-left: calc(-1 * var(--music-img-width));
      width: var(--music-img-width);

    }
    100% {
      margin-left: calc(-1 * var(--music-img-width));
      margin-left: 0;
      width: var(--music-controller-width);
    }
  }

  .indentation {
    animation: indentation ease-in-out 0.7s;
    animation-fill-mode: forwards;
  }


  @keyframes indentation {
    0% {
      margin-left: 0;
      width: var(--music-controller-width);
    }
    75% {
      margin-left: calc(-1 * var(--music-img-width));
    }
    100% {
      margin-left: calc(-1 * var(--music-img-width));
      width: var(--music-img-width);
    }
  }


  .drop {
    animation: drop 0.7s;
    animation-fill-mode: forwards;
  }

  @keyframes drop {
    from {
      height: var(--play-list-height);
    }
    to {
      height: 0;
    }
  }

  .rise {
    animation: rise 0.7s;
    animation-fill-mode: forwards;
  }

  @keyframes rise {
    from {
      height: 0;
    }
    to {
      height: var(--play-list-height);
    }
  }

</style>