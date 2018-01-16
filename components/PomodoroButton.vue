<template lang="pug">
  button.PomodoroButton(@click="onClick" :style="style")
    span(v-if="working")
      | {{sRestTime}}
    span(v-else)
      | Start
      br
      | {{sLength}}
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
    style () {
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
        return ''
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
    onClick (event) {
      this.$emit('press', event)
    },
  },
}
</script>

<style lang="sass" scoped>
.PomodoroButton
  background-color: transparent
  border-color: initial
  border-style: solid
  border-width: 1px
  box-sizing: border-box
  font-size: 5rem
</style>
