<template lang="pug">
  div.DigitalClock
    span.hours {{sHours}}
    span.delimiter :
    span.minutes {{sMinutes}}
    span.delimiter :
    span.seconds {{sSeconds}}
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
    }
  }
}
</script>

<style lang="sass" scoped>
.DigitalClock
  font-family: monospace
</style>
