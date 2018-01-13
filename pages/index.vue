<template lang="pug">
  section.container
    DigitalClock
</template>

<script>
import DigitalClock from '~/components/DigitalClock.vue'

export default {
  components: {
    DigitalClock
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
