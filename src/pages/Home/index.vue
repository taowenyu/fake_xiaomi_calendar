<template lang="html">
  <div class="home">
    <header>
      <div class="today">
        <div class="left">
          <span class="month">11 月</span>
        </div>
        <div class="right">
          <span class="year">2017 年</span>
          <div class="wrapper">
            <span class="day">15 日</span>
            <span>今天<span class="caret">▾</span></span>
          </div>
        </div>
      </div>
      <div class="button">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="calendar-header">
        <span v-for="(item, index) in '日一二三四五六'.split('')">{{ item }}</span>
      </div>
    </header>
    <div class="main">
      <div class="day" v-for="i in 35">
        <span class="num">
          {{ i }}
        </span>
        <span class="nong">
          初十
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" src="./index.scss" scoped>

</style>
