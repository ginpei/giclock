<template lang="pug">
  span.PomodoroButton
    button.mainButton(v-show="working" @click="pauseButton_onClick" :style="mainButtonStyle")
      | {{sRestTime}}
      br
      i.fa.fa-pause-circle(v-show="!exceeded")
      i.fa.fa-stop-circle(v-show="exceeded")
    button.subButton(v-show="working" @click="resetButton_onClick" disabled)
      i.fa.fa-stop-circle
      |  Reset
    button.mainButton(v-show="paused" @click="startButton_onClick" :style="mainButtonStyle")
      | {{sRestTime}}
      br
      i.fa.fa-play-circle
    button.subButton(v-show="paused" @click="resetButton_onClick")
      i.fa.fa-stop-circle
      |  Reset
    button.mainButton(v-show="stopped" @click="startButton_onClick" :style="mainButtonStyle")
      | {{sLength}}
      br
      i.fa.fa-play-circle
    button.subButton(v-show="stopped" @click="configButton_onClick")
      i.fa.fa-stopwatch
      |  Set time
</template>

<script>
import { sTimeRange } from '~/middleware/time.js'

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
        color: this.exceeded ? '#f00' : null,
      }
    },

    paused () {
      return !this.working && this.restTime > 0
    },

    stopped () {
      return !this.working && !this.restTime // <= 0
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
      return sTimeRange(this.restTime)
    },
  },

  methods: {
    startButton_onClick (event) {
      this.$emit('start', event)
    },

    pauseButton_onClick (event) {
      this.$emit('pause', event)
    },

    resetButton_onClick (event) {
      this.$emit('reset', event)
    },

    configButton_onClick (event) {
      this.$emit('config', event)
    },
  },
}
</script>

<style lang="sass" scoped>
.PomodoroButton

.mainButton,
.subButton
  font-family: inherit

.mainButton
  font-size: 5rem
  height: 70%
  width: 100%

.subButton
  font-size: 3rem
  height: 30%
  width: 100%
</style>
