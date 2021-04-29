<template>
  <container/>
  <!--<slider/>-->
</template>

<script>
  import Container from "./views/container/Container";
  import Slider from "./components/Slider";

  export default {
    components: {Slider, Container},
    name: "App",

  }
</script>

<style>
  @import "assets/css/base.css";


</style>
