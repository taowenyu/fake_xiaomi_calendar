<template lang="html">
  <div class="home">
    <header>
      <div class="today">
        <div class="left">
          <span class="month">{{ currentMonth }}月</span>
        </div>
        <div class="right">
          <span class="year">{{ currentYear }}年</span>
          <div class="wrapper">
            <span class="day">{{ currentDay }}日</span>
            <span>{{ durartion }}<span class="caret">▾</span></span>
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
        v-for="(day, index) in calendarData[currentMonth]"
        :class="{
          invalid: day.invalid,
          today: (currentMonth === nowMonth && day.num === nowDay && nowDay === currentDay),
          blur: (currentMonth === nowMonth && day.num === nowDay && nowDay !== currentDay),
          active: (day.month === currentMonth && day.num === currentDay && !(currentMonth === nowMonth && day.num === nowDay))
        }"
        @click="currentDay = day.num"
      >
        <span class="num">
          {{ day.num }}
        </span>
        <span class="nong" v-if="showNong">
          初一
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
        // 当前显示月份
        currentYear: new Date().getFullYear(),
        // 当前显示月份
        currentMonth: new Date().getMonth() + 1,
        // 当前显示日
        currentDay: new Date().getDate(),
        // 当前日期
        now: new Date(),
        // 日历数据
        calendarData: [],
      }
    },

    methods: {
      // 判断是否为闰年
      isLeapYear(y) {
        return (y % 400 === 0 || (y % 4 === 0 && y % 100))
      },

      // 获取月数据
      getMonthData(m) {
        m -= 1

        let special = (28 + (this.isLeapYear(this.currenYear ? 1 : 0)))

        let months = [31, special, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        let temp = []

        // 差值
        let offset = new Date(this.currentYear, m, 1).getDay()

        // 补齐上月
        for (let i = offset - 1; i >= 0; i--) {
          temp.push({
            month: m,
            num: (m === 1 ? 31 : months[m - 1]) - i,
            invalid: true
          })
        }

        // 当月
        for (let i = 1; i <= months[m]; i++) {
          temp.push({
            month: m + 1,
            num: i,
            invalid: false
          })
        }

        // 补齐下月
        let i = 1
        while (temp.length < 35) {
          temp.push({
            month: m + 2,
            num: i++,
            invalid: true
          })
        }

        return temp
      }
    },

    computed: {
      nowYear() {
        return new Date().getFullYear()
      },

      nowMonth() {
        return new Date().getMonth() + 1
      },

      nowDay() {
        return new Date().getDate()
      },

      durartion() {
        let temp = this.currentDay - this.nowDay
        if (temp === 0) {
          return '今天'
        } else {
          return Math.abs(temp) + ' 天' + (temp < 0 ? '前' : '后')
        }
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
