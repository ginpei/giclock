<template lang="pug">
  button.PomodoroButton(@click="onClick" :style="style")
    span(v-if="startedAt === 0")
      | Start
      br
      | {{length}}m
    span(v-else)
      | {{sRestTime}}
</template>

<script>
export default {
  props: [
    'length',
    'now',
    'startedAt'
  ],

  computed: {
    style () {
      return {
        color: this.$store.state.preferences.fgColor
      }
    },

    /**
     * @returns {number} Rest time in ms.
     */
    restTime () {
      if (this.startedAt === 0) {
        return NaN
      }

      const length = this.length * 60 * 1000
      const restTime = this.startedAt + length - this.now
      return restTime
    },

    /**
     * @returns {string}
     */
    sRestTime () {
      const restTime = this.restTime
      if (isNaN(restTime)) {
        return ''
      }

      let restSeconds = Math.floor(restTime / 1000) % 60
      const restMinutes = Math.floor((restTime / 1000 - restSeconds) / 60)

      if (restMinutes < 0) {
        restSeconds = -restSeconds
      }

      const sRestTime = `${restMinutes}m ${restSeconds}s`
      return sRestTime
    }
  },

  methods: {
    onClick (event) {
      this.$emit('press', event)
    }
  }
}
</script>

<style lang="sass" scoped>
.PomodoroButton
  background-color: transparent
  border-color: initial
  border-style: solid
  border-width: 1px
  box-sizing: border-box
  font-size: 5vw
</style>
