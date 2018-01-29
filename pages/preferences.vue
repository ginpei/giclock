<template lang="pug">
  SettingLayout(@change="onChange" :style="style" title="Preferences")

    SettingTable(heading="Timer")
      SettingColumn(title="Length")
        input.SettingLayout-input(v-model="length" @change="length_onChange")

    SettingTable(heading="Visual")
      SettingColumn(title="Rotation")
        select.SettingLayout-input(v-model="rotation")
          option(value="none") None
          option(value="right") Right
          option(value="left") Left

    SettingTable(heading="Resources")
      SettingColumn(title="Chime sound")
        a(href="https://www1.nhk.or.jp/archives/creative/material/view.html?m=D0002011518_00000") NHKクリエイティブ・ライブラリー

    SettingTable(heading="About")
      SettingColumn(title="Author")
        a(href="https://ginpei.info/") Ginpei Takanashi
      SettingColumn(title="GitHub")
        a(href="https://github.com/ginpei/giclock") ginpei/giclock
</template>

<script>
import {
  SettingColumn,
  SettingLayout,
  SettingTable,
} from '~/components/settings/index.js'

export default {
  components: {
    SettingColumn,
    SettingLayout,
    SettingTable,
  },

  data () {
    return {
      length: this.$store.state.preferences.length,
      rotation: this.$store.state.preferences.rotation,
    }
  },

  computed: {
    style () {
      return {
        display: this.$store.state.preferences.loaded ? 'block' : 'none',
      }
    },
  },

  async mounted () {
    await this.$store.dispatch('preferences/load')
    this.length = this.$store.state.preferences.length
    this.rotation = this.$store.state.preferences.rotation
  },

  methods: {
    onChange (event) {
      const data = {
        length: this.length,
        rotation: this.rotation,
      }
      this.$store.dispatch('preferences/save', data)
    },

    length_onChange (event) {
      if (!this.length.match(/^\d+m$/)) {
        this.length = this.$store.state.preferences.length
      }
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
