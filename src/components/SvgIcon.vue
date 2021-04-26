<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
  export default {
    name: "SvgIcon",
    props: {
      iconName: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: ""
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconName}`;
      },
      svgClass() {
        // 父组件有传值时
        if (this.className) {
          return this.className;
        }
        // 父组件没传值时,走组件默认的样式
        return "svg-icon";
      }
    }
  }
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

</style>