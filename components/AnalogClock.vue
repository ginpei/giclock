<template lang="pug">
  div.AnalogClock
    svg(version="1.1" baseProfile="full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg")
      circle(:cx="length / 2" :cy="length / 2" :r="circleRadius" stroke="#0f9" fill="transparent" opacity="0.5")
      AnalogClockNeedle(:size="length" :length="length * 0.3" :progress="hoursProgress" width="5" fill="#0f9")
      AnalogClockNeedle(:size="length" :length="length * 0.4" :progress="minutesProgress" width="3" fill="#0f9")
      AnalogClockNeedle(:size="length" :length="length * 0.45" :progress="secondProgress" width="1" fill="#0f9")
</template>

<script>
import AnalogClockNeedle from './AnalogClockNeedle.vue'

export default {
  components: {
    AnalogClockNeedle
  },

  props: [
    'now'
  ],

  data () {
    return {
      circleStrokeWidth: 1,
      height: 0,
      width: 0
    }
  },

  computed: {
    length () {
      return Math.min(this.height, this.width)
    },

    circleRadius () {
      return this.length / 2 - this.circleStrokeWidth * 6 // ?
    },

    hoursProgress () {
      return (this.now.getHours() % 12 + this.minutesProgress) / 12
    },

    minutesProgress () {
      return this.now.getMinutes() / 60
    },

    secondProgress () {
      return this.now.getSeconds() / 60
    }
  },

  updated () {
    this.updateLayout(this.$el)
  },

  methods: {
    updateLayout (el) {
      this.height = el.clientHeight
      this.width = el.clientWidth
    }
  }
}
</script>

<style lang="sass" scoped>
.AnalogClock
</style>
