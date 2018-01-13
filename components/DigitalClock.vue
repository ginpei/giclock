<template lang="pug">
  div.DigitalClock
    div.time
      span.hours {{sHours}}
      span.delimiter :
      span.minutes {{sMinutes}}
      span.delimiter :
      span.seconds {{sSeconds}}
    div.date
      | {{sYear}}-{{sMonth}}-{{sDate}}
      span.yobi ({{sYobi}})
</template>

<script>
import { sHours, sMinutes, sSeconds } from '~/middleware/time.js'

export default {
  props: [
    'now'
  ],

  computed: {
    sHours () {
      return sHours(this.now)
    },

    sMinutes () {
      return sMinutes(this.now)
    },

    sSeconds () {
      return sSeconds(this.now)
    },

    sYear () {
      return this.now.getFullYear()
    },

    sMonth () {
      return '01 02 03 04 05 06 07 08 09 10 11 12'.split(' ')[this.now.getMonth()]
    },

    sDate () {
      return this.now.getDate()
    },

    sYobi () {
      return 'Mon Tue Wed Thu Fri Sat Sun'.split(' ')[this.now.getDay()]
    }
  }
}
</script>

<style lang="sass" scoped>
.DigitalClock
  font-family: "Share Tech Mono", monospace

.time
  font-size: 50px

.date
  font-size: 20px

.yobi
  font-size: smaller
</style>
