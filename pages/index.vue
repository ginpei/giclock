<template lang="pug">
  section.container.pinCenter(:data-vertical="vertical")
    div.pinCenter(:style="boxStyle")
      AnalogClock.analogClock(:now="now")
    div.pinCenter(:style="boxStyle")
      DigitalClock(:now="now" :style="digitalClockStyle" ref="digitalClock")
</template>

<script>
import AnalogClock from '~/components/AnalogClock.vue'
import DigitalClock from '~/components/DigitalClock.vue'

export default {
  components: {
    AnalogClock,
    DigitalClock
  },

  data () {
    return {
      boxLength: 0,
      digitalClockScale: 0,
      now: new Date(),
      vertical: false
    }
  },

  computed: {
    boxStyle () {
      return {
        height: `${this.boxLength}px`,
        width: `${this.boxLength}px`
      }
    },

    digitalClockStyle () {
      return {
        transform: `scale(${this.digitalClockScale})`
      }
    }
  },

  mounted () {
    this.tmTick = setInterval(() => {
      this.now = new Date()
    }, 100)

    this.f_updateLayout = () => this.updateLayout(this.$el)
    window.addEventListener('resize', this.f_updateLayout)
    this.f_updateLayout()
  },

  destroyed () {
    clearInterval(this.tmTick)
    window.removeEventListener('resize', this.f_updateLayout)
  },

  methods: {
    updateLayout (el) {
      const w = el.clientWidth
      const h = el.clientHeight
      this.boxLength = Math.max(w, h) / 2
      this.vertical = h > w

      const elClock = this.$refs.digitalClock.$el
      const clockEdgeLength = Math.max(elClock.clientWidth, elClock.clientHeight)
      this.digitalClockScale = this.boxLength / clockEdgeLength
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #000
  color: #0f9
  min-height: 100vh

.pinCenter
  display: flex
  justify-content: center
  align-items: center
  text-align: center

  &[data-vertical="true"]
    flex-direction: column

.analogClock
  height: 100%
  width: 100%
</style>
