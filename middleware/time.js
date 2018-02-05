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
  //  0     -> '0:00'
  //  0.001 -> '0:01'
  // 60.000 -> '1:00'
  // 59.001 -> '1:00'
  // 59.000 -> '0:59'

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

export {
  now,
  sHours,
  sMinutes,
  sSeconds,
  sCurrentTime,
  sTimeRange,
}
