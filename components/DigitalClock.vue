<template lang="pug">
  div.DigitalClock
    div.time {{sCurrentTime}}
    div.date
      | {{sFullDate}}
      span.yobi ({{sYobi}})
</template>

<script>
import { sCurrentTime, sFullDate } from '~/middleware/time.js'

export default {
  props: [
    'now',
  ],

  computed: {
    sCurrentTime () {
      return sCurrentTime(this.now)
    },

    sFullDate () {
      return sFullDate(this.now)
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
