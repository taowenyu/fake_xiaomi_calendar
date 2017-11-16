// 判断是否为同月
Date.prototype.isSameMonth = function(a) {
  if (this.getMonth() === a.getMonth())
    return true
  else
    return false
}

// 判断两个 Date 对象是否为同一天
Date.prototype.isSameDay = function(a) {
  let isSameYear = (a.getFullYear() === this.getFullYear())
  let isSameMonth = (a.getMonth() === this.getMonth())
  let isSameDay = (a.getDate() === this.getDate())

  if (isSameYear && isSameMonth && isSameDay)
    return true
  else
    return false
}

// 判断是否是闰年
Date.prototype.isLeapYear = function() {
  let year

  if (arguments.length === 0) {
    year = this.getFullYear()
  } else {
    year = arguments[0]
  }

  return (year % 400 === 0 || (year % 100 === 0 && year % 4 === 0))
}

// 计算相隔天数
Date.prototype.getDistance = function(a) {
  const msPerDay = 24 * 60 * 60 * 1000

  let ms = ((a.getTime() - this.getTime()) / msPerDay)

  return Math.ceil(ms)
}

// 按天数偏移
Date.prototype.getOffsetDay = function(distance) {
  let temp = this.getTime() + distance * (24 * 60 * 60 * 1000)

  return new Date(temp)
}

export default {

}
