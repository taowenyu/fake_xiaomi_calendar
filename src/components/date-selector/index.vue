<template lang="html">
  <div class="date-selector">
    <h3 class="title">选择日期</h3>

    <p class="current-date">
      {{ currentYear }}年{{ currentMonth }}月{{ currentDay }}日星期{{ currentWeek }}
    </p>

    <section class="main">
      <div class="year">
        <slide-bar :range="[1970, 2037]" unit="年" v-model="currentYear"></slide-bar>
      </div>
      <div class="month">
        <slide-bar :range="[1, 12]" unit="月" v-model="currentMonth"></slide-bar>
      </div>
      <div class="day">
        <slide-bar :range="[1, totalDays]" unit="日" v-model="currentDay"></slide-bar>
      </div>
    </section>

    <footer>
      <span class="cancel" @click="$emit('cancel')">
        取消
      </span>
      <span class="comfirm" @click="$emit('input', currentDate)">
        确定
      </span>
    </footer>
  </div>
</template>

<script>
  import slideBar from './components/slide-bar.vue'

  export default {
    components: {
      slideBar
    },

    props: {
      value: Date
    },

    data() {
      return {
        currentDate: new Date(1970, 0, 1)
      }
    },

    created() {

    },

    computed: {
      // 当前天
      currentDay: {
        get() {
          return this.currentDate.getDate()
        },

        set(val) {
          this.currentDate = new Date(this.currentDate.setDate(val))
        }
      },
      // 当前月份（修正）
      currentMonth: {
        get() {
          return this.currentDate.getMonth() + 1
        },

        set(val) {
          this.currentDate = new Date(this.currentDate.setMonth(val - 1))
        }
      },
      // 当前年
      currentYear: {
        get() {
          return this.currentDate.getFullYear()
        },

        set(val) {
          this.currentDate = new Date(this.currentDate.setFullYear(val))
        }
      },
      // 星期
      currentWeek() {
        let index = this.currentDate.getDay()
        return '日一二三四五六'.split('')[index]
      },
      // 当前月天数
      totalDays() {
        let Feb = (28 + (this.currentDate.isLeapYear() ? 1 : 0))
        let months = [31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        return months[this.currentMonth]
      }
    }
  }

</script>

<style lang="scss" scoped>
  .date-selector {
    width: 9.573333rem;
    margin: 0 auto;
    margin-bottom: .213333rem;
    padding-top: .826667rem;
    border-radius: .133333rem;

    background-color: #fff;

    .title {
      margin-top: 0;
      margin-bottom: 1.066667rem;

      font-size: .466667rem;
      text-align: center;
    }

    .current-date {
      margin-top: 0;
      margin-bottom: .213333rem;

      text-align: center;
      font-size: .333333rem;
    }

    .main {
      display: flex;
      height: 5.6rem;
      border-top: .026667rem solid #e4e4e4;

      .year {
        width: 35%;
      }

      .month, .day{
        width: 32.5%;

        border-left: .026667rem solid #e4e4e4
      }
    }

    footer {
      display: flex;
      width: 100%;
      height: 1.44rem;
      border-top: .026667rem solid #e4e4e4;
      border-radius: 0 0 .133333rem .133333rem;
      background-color: #f2f2f2;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;

        font-size: .4rem;
        color: #676767;
      }

      .comfirm {
        color: #00a8ff;
        border-left: .026667rem solid #e4e4e4;
      }
    }
  }
</style>
