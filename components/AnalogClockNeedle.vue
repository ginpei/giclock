<template lang="pug">
  rect(:width="width" :height="length" :fill="fill" :transform="transform" x="0" y="0" opacity="0.5")
</template>

<script>
export default {
  props: [
    'fill',
    'length',
    'progress',
    'size',
    'width',
  ],

  computed: {
    center () {
      return this.size / 2 - this.width / 2
    },

    rotate () {
      return this.progress * 360 - 180
    },

    transform () {
      return `translate(${this.center}, ${this.center}) rotate(${this.rotate}, ${this.width / 2}, ${this.width / 2})`
    },
  },
}
</script>
