<template>
  <section class="container">
    <DigitalClock />
  </section>
</template>

<script>
import DigitalClock from '~/components/DigitalClock.vue'

export default {
  components: {
    DigitalClock
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
