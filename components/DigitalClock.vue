<template lang="pug">
  div.DigitalClock
    div.time {{sCurrentTime}}
    div.date
      | {{sYear}}-{{sMonth}}-{{sDate}}
      span.yobi ({{sYobi}})
</template>

<script>
import { sCurrentTime } from '~/middleware/time.js'

export default {
  props: [
    'now',
  ],

  computed: {
    sCurrentTime () {
      return sCurrentTime(this.now)
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
      return 'Sun Mon Tue Wed Thu Fri Sat'.split(' ')[this.now.getDay()]
    },
  },
}
</script>

<style lang="sass" scoped>
.DigitalClock

.time
  font-size: 10rem

.date
  font-size: 4rem

.yobi
  font-size: smaller
</style>
