<template lang="pug">
  section.container
    AnalogClock(:now="now")
    DigitalClock(:now="now")
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
      now: new Date()
    }
  },

  mounted () {
    this.tmTick = setInterval(() => {
      this.now = new Date()
    }, 100)
  },

  destroyed () {
    console.log('destroyed')
    clearInterval(this.tmTick)
  }
}
</script>

<style lang="sass">
.container
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center
</style>
