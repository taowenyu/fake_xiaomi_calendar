<template lang="html">
  <div class="home">
    <header :style="{backgroundColor: colorList[currentMonth]}">
      <div class="today">
        <div class="left">
          <span class="month">{{ currentMonth + 1 }}月</span>
        </div>
        <div class="right">
          <span class="year">{{ currentYear }}年</span>
          <div class="wrapper">
            <span class="day">{{ currentDay }}日</span>
            <span>{{ distance }}<span class="caret">▾</span></span>
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
      <div
        v-for="(date, index) in MonthCardData"
        class="day"
        :class="{
          invalid: !date.isSameMonth(currentDate),
          today: date.isSameDay(now) && currentDate.isSameDay(now),
          active: !date.isSameDay(now) && currentDate.isSameDay(date),
          blur: date.isSameDay(now) && !currentDate.isSameDay(date)
        }"
        @click="changeDate(date)"
      >
        <span class="num">
          {{ date.getDate() }}
        </span>
        <span class="nong" v-show="showNong">
          初十
        </span>
      </div>
    </div>

    <div
      class="goback"
      v-show="!currentDate.isSameDay(now)"
      :style="{backgroundColor: colorList[currentMonth]}"
      @click="backToday()">
       今
    </div>
  </div>
</template>

<script>
  // 获取当前时间
  let now = new Date()

  import utils from './utils'

  export default {
    props: {
      // 农历可见性
      showNong: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        now: now,
        // 当前激活日期
        currentDate: now,
        // 当前月数据
        MonthCardData: [],
        // 背景色列表
        colorList: [
          'rgb(70, 153, 217)',
          'rgb(95, 128, 218)',
          'rgb(116, 119, 209)',
          'rgb(136, 116, 205)',
          'rgb(116, 119, 209)',
          'rgb(95, 128, 218)',
          'rgb(70, 153, 217)',
          'rgb(59, 171, 215)',
          'rgb(41, 173, 167)',
          'rgb(64, 178, 129)',
          'rgb(79, 183, 108)',
          'rgb(107, 177, 86)'
        ]
      }
    },

    methods: {
      // 获取 date 相关月的 Date 集合(上下月补齐)
      getMonthCardData(date) {
        // 日期设置为当月 1 号
        let temp = new Date(date)
        temp.setDate(1)

        let Feb = (28 + (temp.isLeapYear() ? 1 : 0))
        let months = [31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let ret = []
        // 补齐上月
        for (let i = temp.getDay(); i > 0; i--) {
          ret.push(temp.getOffsetDay(-i))
        }
        // 本月
        for (let i = 0; i < months[temp.getMonth()]; i++) {
          ret.push(temp.getOffsetDay(i))
        }
        // 补齐下月
        let lastDate = ret[ret.length - 1]

        let dis = 0
        if (ret.length % 7 !== 0)
          dis = 7 - ret.length % 7

        for (let i = 1; i <= dis; i++) {
          ret.push(lastDate.getOffsetDay(i))
        }

        return ret
      },
      // 跳转至日期
      gotoDate(date) {
        this.MonthCardData = this.getMonthCardData(date)
        this.currentDate = date
      },
      // 回到今天
      backToday() {
        if (!this.currentDate.isSameMonth(now))
          this.gotoDate(now)
        this.currentDate = now
      },

      changeDate(date) {
        if (!this.currentDate.isSameMonth(date))
          this.gotoDate(date)
        this.currentDate = date
      }
    },

    computed: {
      // 当前天
      currentDay: {
        get() {
          return this.currentDate.getDate()
        },

        set(val) {
          this.currentDate.setDate(val)
        }
      },
      // 当前月份
      currentMonth: {
        get() {
          return this.currentDate.getMonth()
        },

        set(val) {
          this.currentDate.setMonth(val)
        }
      },
      // 当前年
      currentYear: {
        get() {
          return this.currentDate.getFullYear()
        },

        set(val) {
          this.currentDate.setFullYear(val)
        }
      },
      // 相差天数
      distance() {
        let days = now.getDistance(this.currentDate)
        if (days === 0) {
          return '今天'
        }

        if (days > 0) {
          return (days + '天后')
        }

        if (days < 0) {
          return (-days + '天前')
        }
      }
    },

    created() {
      this.gotoDate(now)
    }
  }
</script>

<style lang="scss" src="./index.scss" scoped>

</style>
