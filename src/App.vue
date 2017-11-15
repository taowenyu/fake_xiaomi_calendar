<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style language="scss">
  * {
    box-sizing: border-box;
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-smoothing: antialiased;
    font-smoothing: grayscale;
  }
</style>
