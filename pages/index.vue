<template lang="pug">
  section.container.pinCenter
    div.layoutBox.pinCenter(:style="layoutBoxStyle")
      AnalogClock.analogClock(:now="now")
    div.layoutBox.multiPanel(:style="layoutBoxStyle")
      div.pinCenter.topLine(ref="digitalClockContainer")
        DigitalClock(:now="now" ref="digitalClock")
      div.leftBottom
        PomodoroButton.pomodoroButton(@start="pomodoro_onStart" @pause="pomodoro_onPause" @reset="pomodoro_onReset" @config="pomodoro_onConfig" :working="pomodoroWorking" :now="now" :restTime="pomodoroRestTime" :length="pomodoroLength")
      div.rightBottom.pinCenter
        a.pinCenter.preferencesLink(href="/preferences")
          i.fas.fa-cog
    div.sounds
      audio(:src="soundUrl" ref="chimeSound")
</template>

<script>
import AnalogClock from '~/components/AnalogClock.vue'
import DigitalClock from '~/components/DigitalClock.vue'
import PomodoroButton from '~/components/PomodoroButton.vue'
import baseFontSize from '~/middleware/baseFontSize.js'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    AnalogClock,
    DigitalClock,
    PomodoroButton,
  },

  data () {
    return {
      length: '',
      now: new Date(),
      pomodoroStartedAt: 0,
      rotation: '',
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
      const min = parseInt(this.length)
      const pomodoroLength = min * 60 * 1000
      return pomodoroLength
    },

    layoutBoxStyle () {
      const rotationKey = this.$store.state.preferences.rotation
      const rotation = rotationKey === 'right' ? '-90deg' : rotationKey === 'left' ? '90deg' : '0deg'
      const transform = `rotate(${rotation})`

      return { transform }
    },

    notificationSupported () {
      return typeof Notification === 'object'
    },

    ...mapState('preferences', [
      'notifyWhenFinish',
      'ringWhenStart',
      'soundName',
    ]),

    ...mapGetters('preferences', [
      'soundUrl',
    ]),
  },

  mounted () {
    this.tmTick = setInterval(() => {
      this.now = new Date()
    }, 100)

    baseFontSize.activate()

    this.load()
  },

  destroyed () {
    baseFontSize.deactivate()

    clearInterval(this.tmTick)
  },

  methods: {
    async load () {
      await this.loadPreferences()
      const { running } = await this.$store.dispatch('pomodoro/load')
      if (running) {
        this.startPomodoro({ silent: true })
      }
    },

    loadPreferences () {
      this.$store.dispatch('preferences/load')
      this.length = this.$store.state.preferences.length
      this.rotation = this.$store.state.preferences.rotation
    },

    askNotificationPermission () {
      if (!this.notificationSupported) {
        return
      }

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
      if (el.networkState !== el.NETWORK_NO_SOURCE) {
        el.play()
      }
    },

    stopChime () {
      const el = this.$refs.chimeSound
      el.pause()
      el.currentTime = 0
    },

    notify (message) {
      if (!this.notificationSupported) {
        return
      }

      if (Notification.permission !== 'granted') {
        console.warn(`Notification hasn't been granted for message "${message}"`)
        return
      }

      const notification = new Notification(message) // eslint-disable-line no-unused-vars
    },

    startPomodoro ({ sLength: _sLength, silent } = {}) {
      const sLength = _sLength || this.$store.state.preferences.length

      if (this.ringWhenStart && !silent) {
        this.playChime()
      }

      if (this.notifyWhenFinish) {
        this.askNotificationPermission()
      }

      if (!sLength.match(/^\d+m?$/)) {
        throw new Error('Invalid time length')
      }
      const length = parseInt(sLength) * 60 * 1000
      this.$store.dispatch('pomodoro/start', {
        length,
        onComplete: () => {
          this.playChime()
          if (this.notifyWhenFinish) {
            this.notify('Done!')
          }
        },
      })
    },

    stopPomodoro () {
      this.stopChime()
      this.$store.dispatch('pomodoro/stop')
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

    pomodoro_onConfig () {
      const sLength = prompt('How long? (minutes)', this.$store.state.preferences.length)
      if (sLength.match(/^\d+m?$/)) {
        this.startPomodoro({ sLength })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.container
  min-height: 100vh

  @media (orientation: portrait)
    &
      flex-direction: column

  @media (orientation: landscape)
    &
      flex-direction: row

.layoutBox
  height: 50rem
  width: 50rem

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
