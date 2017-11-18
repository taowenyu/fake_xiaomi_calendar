<template lang="html">
  <div class="slide-bar">
    <ul v-if="range" @scroll="handleScroll($event)" ref="ul">
      <li></li>
      <li></li>

      <li v-for="i in values">
        <span>{{ i }}</span>
      </li>

      <li></li>
      <li></li>
      <li class="shot">
        <span>{{ unit }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      // 取值
      value: Number,
      // 数值范围
      range: Array,
      // 单位
      unit: String,
      // 开启无限滚动
      infinite: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
       // 值列表
        values: []
      }
    },

    methods: {
      handleScroll(e) {
        let height = this.$refs.ul.clientHeight / 5

      }
    },

    created() {
      // 初始化值列表
      if (this.range) {
        for (let i = this.range[0]; i <= this.range[1]; i++) {
          this.values.push(i)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slide-bar {
    z-index: 0;
    position: relative;
    height: 100%;
    width: 100%;

    background-color: #f7f7f7;

    ul {
      z-index: 0;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;

      overflow-y: scroll;

      li {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 20%;
        font-size: .333333rem;

        span {
          z-index: 3;
        }

        &.active {
          font-size: .4rem;
          color: #00a4ff;
        }
      }

      .shot {
        position: absolute;
        z-index: 2;
        top: 37.5%;
        left: 0;
        height: 1.413333rem;
        border-top: .026667rem solid #e4e4e4;
        border-bottom: .026667rem solid #e4e4e4;
        background-color: #fff;

        span {
          position: absolute;
          right: 25%;
          color: #00a4ff;
        }
      }
    }
  }
</style>
