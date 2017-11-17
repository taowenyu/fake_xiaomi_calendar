<template lang="html">
  <div class="date-selector">
    <h3 class="title">选择日期</h3>

    <p class="current-date">
      {{ currentYear }}年{{ currentMonth + 1 }}月{{ currentDay }}日星期{{ currentWeek }}
    </p>

    <section class="main">
      <div class="year">
        <ul>
          <li v-for="i in (2037 - 1970 + 1)">
            {{ 1969 + i }}
          </li>
        </ul>
      </div>
      <div class="month">
        <ul>
          <li v-for="i in 12">
            {{ i }}
          </li>
        </ul>
      </div>
      <div class="day">
        <ul>
          <li v-for="i in totalDays">
            {{ i }}
          </li>
        </ul>
      </div>
    </section>

    <footer>
      <span class="cancel" @click="$emit('cancel')">
        取消
      </span>
      <span class="comfirm">
        确定
      </span>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      value: Date
    },

    data() {
      return {
        currentDate: this.value
      }
    },

    watch: {
      value() {
        this.currentDate = this.value
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
    margin: 0 auto;
    width: 9.573333rem;
    border-radius: .133333rem;
    margin-bottom: .213333rem;
    padding-top: .826667rem;

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

      ul {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;

        overflow-y: scroll;
        list-style: none;

        li {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 1.413333rem;
          font-size: .333333rem;
          color: #9d9d9d;

          &.active {
            color: #00a4ff;
            font-size: .4rem;
          }
        }
      }

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
      border-top: 2px solid #e4e4e4;
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
        border-left: 2px solid #e4e4e4;
      }
    }
  }
</style>
