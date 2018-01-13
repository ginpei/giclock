<template>
  <div class="DigitalClock">
    <span class="hours">{{sHours}}</span>
    <span class="delimiter">:</span>
    <span class="minutes">{{sMinutes}}</span>
    <span class="delimiter">:</span>
    <span class="seconds">{{sSeconds}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      now: new Date()
    }
  },

  computed: {
    sHours () {
      const n = this.now.getHours()
      const s = n < 10 ? `0${n}` : String(n)
      return s
    },

    sMinutes () {
      const n = this.now.getMinutes()
      const s = n < 10 ? `0${n}` : String(n)
      return s
    },

    sSeconds () {
      const n = this.now.getSeconds()
      const s = n < 10 ? `0${n}` : String(n)
      return s
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

<style>
.DigitalClock {
  font-family: monospace;
}
</style>
