<template lang="pug">
  section.container.pinCenter(:data-vertical="vertical" :style="style")
    div.pinCenter(:style="boxStyle")
      AnalogClock.analogClock(:now="now")
    div.multiPanel(:style="boxStyle")
      div.pinCenter.topLine(ref="digitalClockContainer")
        DigitalClock(:now="now" :style="digitalClockStyle" ref="digitalClock")
      div.leftBottom X
      div.rightBottom Z
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
    style () {
      return {
        backgroundColor: this.$store.state.preferences.bgColor,
        color: this.$store.state.preferences.fgColor
      }
    },

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

    this.f_updateLayout = () => this.updateLayout()
    window.addEventListener('resize', this.f_updateLayout)
    this.f_updateLayout()
  },

  destroyed () {
    clearInterval(this.tmTick)
    window.removeEventListener('resize', this.f_updateLayout)
  },

  methods: {
    async updateLayout () {
      const el = document.scrollingElement
      const w = el.clientWidth
      const h = el.clientHeight
      this.vertical = h > w
      this.boxLength = this.vertical ? Math.min(w, h / 2) : Math.min(w / 2, h)

      // wait for container element's size is updated
      // there should be better way tho...
      await new Promise(resolve => setTimeout(resolve, 1))

      this.updateDigitalClockScale()
    },

    updateDigitalClockScale () {
      const elClock = this.$refs.digitalClock.$el
      const elContainer = this.$refs.digitalClockContainer

      const wScale = elContainer.clientWidth / elClock.clientWidth
      const hScale = elContainer.clientHeight / elClock.clientHeight
      this.digitalClockScale = Math.min(wScale, hScale)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
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

.multiPanel
  display: grid
  grid-template-columns: 1fr, 1fr
  grid-template-rows: 1fr, 1fr

.topLine
  grid-column: 1 / 3
  grid-row: 1

.leftBottom
  grid-column: 1
  grid-row: 2

.rightBottom
  grid-column: 2
  grid-row: 2
</style>
