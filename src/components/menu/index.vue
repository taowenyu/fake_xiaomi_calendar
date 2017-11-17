<template lang="html">
  <div class="menu">
    <div class="close" @click="$emit('close')">
      <span></span>
      <span></span>
    </div>

    <div class="main">
      <div class="cell"
        v-for="(item, index) in menu"
        :style="{animationDuration: (menu.length - index) * 130 + 'ms'}"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          '订阅频道',
          '日期换算',
          '跳转到指定日期',
          '刷新',
          '设置'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes move {
    from {
      transform: translateY(-500%);
    }

    to {
      transform: translateY(0);
    }
  }

  .menu {
    position: relative;
    width: 100%;
    background-color: #fafcfc;

    /* TODO: 解决背景虚化问题 */
    .close {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: .36rem;
      right: .56rem;
      width: .6rem;
      height: .6rem;

      span {
        height: .04rem;
        width: .6rem;
        background-color: #495857;

        &:nth-child(1) {
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          transform: rotate(-45deg);
          transform-origin: .27rem;
        }
      }
    }

    .main {
      width: 100%;
      padding: 0 .746667rem;
      padding-top: 2.133333rem;
      padding-bottom: .133333rem;

      .cell {
        width: 100%;
        padding-top: .533333rem;
        padding-bottom: .506667rem;
        border-top: 1px solid #e9eaea;

        animation: move 300ms;

        span {
          display: flex;
          font-size: .4rem;
        }
      }
    }
  }
</style>
