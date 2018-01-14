<template lang="pug">
  div.AnalogClock
    svg(version="1.1" baseProfile="full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg")
      circle(:cx="length / 2" :cy="length / 2" :r="circleRadius" :stroke="fgColor" fill="transparent")
      AnalogClockNeedle(:size="length" :length="length * 0.3" :progress="hoursProgress" :width="length * 0.04" :fill="fgColor")
      AnalogClockNeedle(:size="length" :length="length * 0.4" :progress="minutesProgress" :width="length * 0.02" :fill="fgColor")
      AnalogClockNeedle(:size="length" :length="length * 0.44" :progress="secondProgress" :width="length * 0.01" :fill="fgColor")
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
    fgColor () {
      return this.$store.state.preferences.fgColor
    },

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
