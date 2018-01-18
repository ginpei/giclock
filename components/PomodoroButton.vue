<template lang="pug">
  span.PomodoroButton
    button.mainButton(v-show="working" @click="pauseButton_onClick" :style="mainButtonStyle")
      | {{sRestTime}}
      br
      i.fa.fa-pause-circle
    button.subButton(v-show="working" @click="stopButton_onClick" :style="subButtonStyle" disabled)
      i.fa.fa-stop-circle
      |  Reset
    button.mainButton(v-show="!working" @click="startButton_onClick" :style="mainButtonStyle")
      | {{sLength}}
      br
      i.fa.fa-play-circle
    button.subButton(v-show="!working" @click="configButton_onClick" :style="subButtonStyle")
      i.fa.fa-stopwatch
      |  Set time
</template>

<script>
export default {
  props: [
    'length',
    'now',
    'restTime',
    'working',
  ],

  computed: {
    mainButtonStyle () {
      return {
        color: this.exceeded ? '#f00' : this.$store.state.preferences.fgColor,
      }
    },

    subButtonStyle () {
      return {
        color: this.exceeded ? '#f00' : this.$store.state.preferences.fgColor,
      }
    },

    exceeded () {
      return this.restTime < 0
    },

    sLength () {
      const min = Math.floor(this.length / 1000 / 60) // ms -> m
      return `${min}m`
    },

    /**
     * @returns {string}
     */
    sRestTime () {
      //  0     -> '0:00'
      //  0.001 -> '0:01'
      // 60.000 -> '1:00'
      // 59.001 -> '1:00'
      // 59.000 -> '0:59'

      const restTimeInSeconds = Math.ceil(this.restTime / 1000)
      if (isNaN(restTimeInSeconds)) {
        return '0m 0s'
      }

      let restSeconds = restTimeInSeconds % 60
      const restMinutes = Math.floor((restTimeInSeconds - restSeconds) / 60)

      if (restMinutes < 0) {
        restSeconds = -restSeconds
      }

      const sRestTime = `${restMinutes}m ${restSeconds}s`
      return sRestTime
    },
  },

  methods: {
    startButton_onClick (event) {
      console.log('# start')
      this.$emit('press', event)
    },

    pauseButton_onClick (event) {
      this.$emit('press', event)
    },

    stopButton_onClick (event) {
      this.$emit('press', event)
    },

    configButton_onClick (event) {
      this.$emit('press', event)
    },
  },
}
</script>

<style lang="sass" scoped>
.PomodoroButton

.mainButton
  font-size: 5rem
  height: 70%
  width: 100%

.subButton
  font-size: 3rem
  height: 30%
  width: 100%
</style>
