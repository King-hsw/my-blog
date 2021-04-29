<template>
  <div class="slider">
    <div class="length"></div>
    <input v-model="value" type="range" :min="iMin" :max="max" step="any" @input="change">
    <div class="track" :style="{width: `${getTrackWidth}%`}">
      <div class="block" :style="{right:getPlacement}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slider",
    props: {
      value: {
        require: true
      },
      min: {
        default: "0"
      },
      max: {
        default: "100"
      }
    },
    data() {
      return {
        iMin: this.min,
        iMax: this.max
      }
    },
    computed: {
      getPlacement() {
        return `${(-0.009 * ((this.getTrackWidth * -1) + 104))}em`;
      },
      getTrackWidth() {
        if (this.value === 0) {
          return 0
        } else {
          return Math.ceil(this.value / this.iMax * 100)
        }
      }
    },
    methods: {
      change() {
        this.$emit('change', this.value);
      },
    },
    watch: {
      max(n, o) {
        this.iMax = n
      }
    }
  }
</script>

<style scoped>
  .slider {
    --slider-width: 110px;
    --slider-height: 16px;
    position: relative;
    width: var(--slider-width);
    /*height: var(--slider-height);*/
    display: table-cell;
    vertical-align: middle;
  }

  .length {
    height: 5px;
    background-color: #e1e1e1;
    border-radius: 20px;
    z-index: 0;
    margin: 2px;
    position: absolute;
    top: auto;
    width: 100%;
  }


  input {
    height: 10px;
    cursor: pointer;
    z-index: 2;
    width: 100%;
    position: absolute;
    left: 0;
    opacity: 0;
  }

  input:focus {
    /*滑轨外边框*/
    outline: none
  }

  .track {
    background-color: #69c0ff;
    height: 5px;
    position: absolute;
    left: 0;
    border-radius: 20px;
    margin: 2px;
  }

  .block {
    position: absolute;
    width: 14px;
    height: 14px;
    bottom: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #91d5ff;
    opacity: 0;
    transition: opacity .1s;
    background-color: white;
  }

  input[type=range]:hover ~ .track > .block {
    opacity: 100%
  }


</style>