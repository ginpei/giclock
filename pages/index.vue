<template lang="pug">
  section.container.pinCenter
    div.layoutBox.pinCenter
      AnalogClock.analogClock(:now="now")
    div.layoutBox.multiPanel
      FullfillView.pinCenter.topLine(ref="digitalClockContainer")
        DigitalClock(:now="now" ref="digitalClock")
      div.leftBottom
        PomodoroButton.pomodoroButton(@start="pomodoro_onStart" @pause="pomodoro_onPause" @reset="pomodoro_onReset" :working="pomodoroWorking" :now="now" :restTime="pomodoroRestTime" :length="pomodoroLength")
      div.rightBottom.pinCenter
        a.pinCenter.preferencesLink(href="/preferences")
          i.fas.fa-cog
    div.sounds
      audio(ref="chimeSound" src="/D0002011518_00000_A_001.m4a")
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
    pomodoroWorking () {
      return this.$store.getters['pomodoro/working']
    },

    /**
     * @returns {number} Rest time in ms.
     */
    pomodoroRestTime () {
      return this.$store.getters['pomodoro/getRemainingTime'](this.now.getTime())
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

    playChime () {
      this.stopChime()

      const el = this.$refs.chimeSound
      el.play()
    },

    stopChime () {
      const el = this.$refs.chimeSound
      el.pause()
      el.currentTime = 0
    },

    notify (message) {
      if (Notification.permission !== 'granted') {
        console.warn(`Notification hasn't been granted for message "${message}"`)
        return
      }

      const notification = new Notification(message) // eslint-disable-line no-unused-vars
    },

    stopPomodoro () {
      this.stopChime()
      this.$store.dispatch('pomodoro/stop')
    },

    startPomodoro () {
      this.playChime()
      this.askNotificationPermission()
      this.$store.dispatch('pomodoro/start', {
        onComplete: () => {
          this.playChime()
          this.notify('Done!')
        },
      })
    },

    pomodoro_onStart () {
      this.startPomodoro()
    },

    pomodoro_onPause () {
      this.stopPomodoro()
    },

    pomodoro_onReset () {
      this.$store.dispatch('pomodoro/reset')
    },
  },
}
</script>

<style lang="sass" scoped>
.container
  min-height: 100vh

.layoutBox
  height: 50rem
  width: 50rem

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

.preferencesLink
  font-size: 3rem
  height: 100%
  text-decoration: none
  width: 100%
</style>
