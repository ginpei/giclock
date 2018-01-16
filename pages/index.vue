<template lang="pug">
  section.container.pinCenter(:style="style")
    div.layoutBox.pinCenter
      AnalogClock.analogClock(:now="now")
    div.layoutBox.multiPanel
      FullfillView.pinCenter.topLine(ref="digitalClockContainer")
        DigitalClock(:now="now" ref="digitalClock")
      div.leftBottom
        PomodoroButton.pomodoroButton(@press="onPress_pomodoro" :working="pomodoroWorking" :now="now" :restTime="pomodoroRestTime" :length="pomodoroLength")
      div.rightBottom.pinCenter
        p Lorem aperiam facere ipsam nemo necessitatibus Dolorem aliquam sint molestias expedita repellendus? Perspiciatis facere tempore dignissimos sed ipsum Dolorem totam magnam alias nulla obcaecati ea quam, dolor? Aliquid incidunt consectetur
</template>

<script>
import AnalogClock from '~/components/AnalogClock.vue'
import DigitalClock from '~/components/DigitalClock.vue'
import FullfillView from '~/components/FullfillView.vue'
import PomodoroButton from '~/components/PomodoroButton.vue'
import baseFontSize from '~/middleware/baseFontSize.js'

export default {
  components: {
    AnalogClock,
    DigitalClock,
    FullfillView,
    PomodoroButton,
  },

  data () {
    return {
      now: new Date(),
      pomodoroStartedAt: 0,
    }
  },

  computed: {
    style () {
      return {
        backgroundColor: this.$store.state.preferences.bgColor,
        color: this.$store.state.preferences.fgColor,
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
    },
  },

  mounted () {
    this.tmTick = setInterval(() => {
      this.now = new Date()
    }, 100)

    baseFontSize.activate()

    this.f_updateLayout = () => this.updateLayout()
    baseFontSize.on('change', this.f_updateLayout)
    this.f_updateLayout()
  },

  destroyed () {
    baseFontSize.off('change', this.f_updateLayout)
    baseFontSize.deactivate()
    clearInterval(this.tmTick)
  },

  methods: {
    updateLayout () {
      this.updateRootFontSize()
    },

    updateRootFontSize () {
      const el = document.scrollingElement
      const w = el.clientWidth
      const h = el.clientHeight
      const length = h > w ? Math.min(w, h / 2) : Math.min(w / 2, h)

      // affects rem unit
      document.documentElement.style.fontSize = `${length / 50}px`
    },

    askNotificationPermission () {
      if (Notification.permission === 'denied') {
        console.warn('Notification is not granted.')
      }
      else if (Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },

    notify (message) {
      if (Notification.permission !== 'granted') {
        console.warn(`Notification hasn't been granted for message "${message}"`)
        return
      }

      const notification = new Notification(message) // eslint-disable-line no-unused-vars
    },

    onPress_pomodoro () {
      if (this.pomodoroWorking) {
        this.$store.dispatch('pomodoro/stop')
      }
      else {
        this.askNotificationPermission()
        this.$store.dispatch('pomodoro/start', {
          onComplete: () => {
            this.notify('Done!')
          },
        })
      }
    },
  },
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
