<template lang="html">
  <div class="home">
    <header>
      <div class="today">
        <div class="left">
          <span class="month">{{ currentDate.getMonth() + 1 }} 月</span>
        </div>
        <div class="right">
          <span class="year">{{ currentDate.getFullYear() }} 年</span>
          <div class="wrapper">
            <span class="day">{{ currentDate.getDate() }} 日</span>
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
      <div class="day"
        :class="{invalid: day.invalid, active: (currentMonth === now.getMonth() && day.num === now.getDate())}"
        v-for="(day, index) in calendarData[currentMonth]"
      >
        <span class="num">
          {{ day.num }}
        </span>
        <span class="nong" v-if="showNong">
          初十
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment'

  export default {
    props: {
      // 显示农历？
      showNong: {
        type: Boolean,
        default: false
      },
      // 显示节日?
      showFestival: false
    },

    data() {
      return {
        // 当前显示日期
        currentDate: new Date(),
        // 当前日期
        now: new Date(),
        // 日历数据
        calendarData: [],
        // 当前显示月份
        currentMonth: new Date().getMonth(),
      }
    },

    methods: {
      // 判断是否为闰年
      isLeapYear(y) {
        return (y % 400 === 0 || (y % 4 === 0 && y % 100))
      },

      // 获取月数据
      getMonthData(m) {
        let special = (28 + (this.isLeapYear(this.currentDate.getFullYear()) ? 1 : 0))

        let months = [31, special, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        let temp = []

        // 差值
        let offset = new Date(this.currentDate.getFullYear(), m, 1).getDay()

        for (let i = offset - 1; i >= 0; i--) {
          temp.push({
            num: (m === 1 ? 31 : months[m - 1]) - i,
            invalid: true
          })
        }

        for (let i = 1; i <= months[m]; i++) {
          temp.push({
            num: i,
            invalid: false
          })
        }

        let i = 1

        while (temp.length < 35) {
          temp.push({
            num: i++,
            invalid: true
          })
        }

        return temp
      }
    },

    computed: {
      isToday() {

      }
    },

    created() {
      for (let i = 0; i < 12; i++) {
        this.calendarData.push(this.getMonthData(i))
      }
    }
  }
</script>

<style lang="scss" src="./index.scss" scoped>

</style>
