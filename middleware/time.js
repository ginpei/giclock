function twoDigitize (n) {
  const s = n < 10 ? `0${n}` : String(n)
  return s
}

function now () {
  return Date.now()
}

function sHours (date) {
  return twoDigitize(date.getHours())
}

function sMinutes (date) {
  return twoDigitize(date.getMinutes())
}

function sSeconds (date) {
  return twoDigitize(date.getSeconds())
}

function sCurrentTime (date) {
  return `${sHours(date)}:${sMinutes(date)}:${sSeconds(date)}`
}

function sTimeRange (timeRange) {
  // -1.000 -> -0:01
  // -0.001 ->  0:00
  //  0.000 ->  0:00
  //  0.001 ->  0:01
  //  1.000 ->  0:01
  // 59.000 ->  0:59
  // 59.001 ->  1:00
  // 60.000 ->  1:00

  const restTimeInSeconds = Math.ceil(timeRange / 1000)
  if (isNaN(restTimeInSeconds)) {
    return '0m 0s'
  }

  let restSeconds = restTimeInSeconds % 60
  const restMinutes = Math.floor((restTimeInSeconds - restSeconds) / 60)

  if (restMinutes < 0) {
    restSeconds = -restSeconds
  }

  const sRestTime = `${restMinutes}m ${restSeconds}s`
  return sRestTime
}

function sYear (date) {
  return date.getFullYear()
}

function sMonth (date) {
  return '01 02 03 04 05 06 07 08 09 10 11 12'.split(' ')[date.getMonth()]
}

function sDate (date) {
  return twoDigitize(date.getDate())
}

function sFullDate (date) {
  return `${sYear(date)}-${sMonth(date)}-${sDate(date)}`
}

export {
  now,
  sHours,
  sMinutes,
  sSeconds,
  sCurrentTime,
  sTimeRange,
  sFullDate,
}
