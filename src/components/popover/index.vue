<template lang="html">
  <div class="popover">
    <transition name="fade">
      <div class="mask" v-show="show" @click="close()"></div>
    </transition>

    <transition :name="popClass">
      <div
        class="content"
        v-show="show"
        :class="{top: direction === 'up', bottom: direction === 'bottom'}"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      // 弹出方向
      direction: {
        type: String,
        default: 'up'
      },

      value: Boolean
    },

    data() {
      return {
        // 可见性
        show: this.value
      }
    },

    watch: {
      value(val) {
        this.show = val
      }
    },

    methods: {
      close() {
        this.show = false
        this.$emit('input', false)
      }
    },


    computed: {
      popClass() {
        if (this.direction === 'up') {
          return 'slide-down'
        }

        if (this.direction === 'bottom') {
          return 'slide-up'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './transitions.scss';

  .popover {
    z-index: 1000;

    .mask {
      z-index: 1001;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: rgba(0, 0, 0, .3);
    }

    .content {
      z-index: 1002;
      position: fixed;
      left: 0;
      right: 0;

      &.top {
        top: 0;
      }

      &.bottom {
        bottom: 0;
      }
    }
  }
</style>
