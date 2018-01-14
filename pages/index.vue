<template lang="pug">
  section.container.pinCenter(:style="style")
    div.layoutBox.pinCenter
      AnalogClock.analogClock(:now="now")
    div.layoutBox.multiPanel
      div.pinCenter.topLine(ref="digitalClockContainer")
        DigitalClock(:now="now" :style="digitalClockStyle" ref="digitalClock")
      div.leftBottom
        PomodoroButton.pomodoroButton(@press="onPress_pomodoro" :working="pomodoroWorking" :now="now" :restTime="pomodoroRestTime" :length="pomodoroLength")
      div.rightBottom.pinCenter
        p Lorem aperiam facere ipsam nemo necessitatibus Dolorem aliquam sint molestias expedita repellendus? Perspiciatis facere tempore dignissimos sed ipsum Dolorem totam magnam alias nulla obcaecati ea quam, dolor? Aliquid incidunt consectetur
</template>

<script>
import AnalogClock from '~/components/AnalogClock.vue'
import DigitalClock from '~/components/DigitalClock.vue'
import PomodoroButton from '~/components/PomodoroButton.vue'

export default {
  components: {
    AnalogClock,
    DigitalClock,
    PomodoroButton
  },

  data () {
    return {
      digitalClockScale: 0,
      now: new Date(),
      pomodoroStartedAt: 0
    }
  },

  computed: {
    style () {
      return {
        backgroundColor: this.$store.state.preferences.bgColor,
        color: this.$store.state.preferences.fgColor
      }
    },

    digitalClockStyle () {
      return {
        transform: `scale(${this.digitalClockScale})`
      }
    },

    pomodoroWorking () {
      return this.$store.getters['pomodoro/working']
    },

    /**
     * @returns {number} Rest time in ms.
     */
    pomodoroRestTime () {
      return this.$store.getters['pomodoro/getRestTime'](this.now.getTime())
    },

    pomodoroLength () {
      return this.$store.state.pomodoro.length
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
    updateLayout () {
      this.updateRootFontSize()
      this.updateDigitalClockScale()
    },

    updateRootFontSize () {
      const el = document.scrollingElement
      const w = el.clientWidth
      const h = el.clientHeight
      const length = h > w ? Math.min(w, h / 2) : Math.min(w / 2, h)

      // affects rem unit
      document.documentElement.style.fontSize = `${length / 50}px`
    },

    updateDigitalClockScale () {
      const elClock = this.$refs.digitalClock.$el
      const elContainer = this.$refs.digitalClockContainer

      const wScale = elContainer.clientWidth / elClock.clientWidth
      const hScale = elContainer.clientHeight / elClock.clientHeight
      this.digitalClockScale = Math.min(wScale, hScale)
    },

    onPress_pomodoro () {
      if (this.pomodoroWorking) {
        this.$store.dispatch('pomodoro/stop')
      } else {
        this.$store.dispatch('pomodoro/start')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  min-height: 100vh

  &,
  & button
    font-family: "Share Tech Mono", monospace

.layoutBox
  height: 50rem
  width: 50rem

.pinCenter
  display: flex
  justify-content: center
  align-items: center
  text-align: center

  @media (orientation: portrait)
    &
      flex-direction: column

  @media (orientation: landscape)
    &
      flex-direction: row

.analogClock
  height: 100%
  width: 100%

.multiPanel
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr

.topLine
  grid-column: 1 / 3
  grid-row: 1

.leftBottom
  grid-column: 1
  grid-row: 2

.rightBottom
  grid-column: 2
  grid-row: 2

.pomodoroButton
  height: 100%
  width: 100%
</style>
