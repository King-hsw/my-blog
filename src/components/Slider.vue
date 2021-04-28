<template>
  <div class="slider">
    <input v-model="val" type="range" min="0" max="100">
    <div class="track" :style="{width: `${val}%`}">
      <div class="block" :style="{right:getPlacement}">a</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slider",
    data() {
      return {
        val: 70
      }
    },
    computed: {
      getPlacement: function () {
        return `${(-0.009 * ((this.val * -1) + 104))}em`;
      }
    }
  }
</script>

<style scoped>
  .slider {
    --slider-width: 330px;
    --slider-height: 16px;
    position: relative;
    width: var(--slider-width);
    /*height: var(--slider-height);*/
    display: table-cell;
    vertical-align:middle;
  }

  input {
    height: 10px;
    /*opacity: 0;*/
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
    background-color: yellow;
    height: 16px;
    position: absolute;
    left: 0;
    border-radius: 20px;
    margin: 2px;
  }

  .block {
    position: absolute;
  }
</style>