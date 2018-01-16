<template lang="pug">
  div.FullfillView(ref="container")
    div(:style="contentStyle" ref="content")
      slot
</template>

<script>
import baseFontSize from '~/middleware/baseFontSize.js'

export default {
  data () {
    return {
      contentScale: 1
    }
  },

  computed: {
    contentStyle () {
      return {
        transform: `scale(${this.contentScale})`
      }
    }
  },

  mounted () {
    this.f_updateLayout = () => this.updateLayout()
    baseFontSize.on('change', this.f_updateLayout)
    this.f_updateLayout()
  },

  destroyed () {
    baseFontSize.off('change', this.f_updateLayout)
  },

  methods: {
    updateLayout () {
      const elContainer = this.$refs.container
      const elContent = this.$refs.content

      const wScale = elContainer.clientWidth / elContent.clientWidth
      const hScale = elContainer.clientHeight / elContent.clientHeight
      this.contentScale = Math.min(wScale, hScale)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
