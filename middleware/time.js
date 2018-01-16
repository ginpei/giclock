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

export {
  now,
  sHours,
  sMinutes,
  sSeconds,
}
