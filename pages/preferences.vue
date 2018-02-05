<template lang="pug">
  SettingLayout(@change="onChange" :style="style" title="Preferences")

    SettingTable(heading="Timer")
      SettingColumn(title="Length")
        input.SettingLayout-input(v-model="length" @change="length_onChange")
      SettingColumn(title="Sound")
        select.SettingLayout-input(v-model="soundName")
          option(value="schoolChime") School Chime
          option(value="none") None
      SettingColumn(title="Ring when start")
        SettingCheckbox(:model.sync="ringWhenStart") Ring
      SettingColumn(title="Notify when finish")
        SettingCheckbox(:model.sync="notifyWhenFinish") Notify besides ringing

    SettingTable(heading="Visual")
      SettingColumn(title="Title")
        select.SettingLayout-input(v-model="titleType")
          option(value="static") Static ("Clock")
          option(value="currentTime") Current time
          option(value="remainingTime") Remaining time (while running)
      SettingColumn(title="Rotation")
        select.SettingLayout-input(v-model="rotation")
          option(value="none") None
          option(value="right") Right
          option(value="left") Left

    SettingTable(heading="Data")
      SettingColumn(title="Revert changes")
        button(@click="revert_onClick") Revert
      SettingColumn(title="Reset to default")
        button(@click="reset_onClick") Reset

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
  SettingCheckbox,
} from '~/components/settings/index.js'

export default {
  components: {
    SettingColumn,
    SettingLayout,
    SettingTable,
    SettingCheckbox,
  },

  head () {
    return {
      title: 'Preferences - Clock',
    }
  },

  data () {
    return {
      length: '',
      notifyWhenFinish: false,
      ringWhenStart: false,
      rotation: '',
      pastLength: '',
      pastNotifyWhenFinish: false,
      pastRingWhenStart: false,
      pastRotation: '',
      pastSoundName: '',
      soundName: '',
      titleType: '',
    }
  },

  computed: {
    style () {
      return {
        display: this.$store.state.preferences.loaded ? 'block' : 'none',
      }
    },
  },

  mounted () {
    this.load()
  },

  methods: {
    save () {
      const data = {
        initialized: false,
        length: this.length,
        notifyWhenFinish: this.notifyWhenFinish,
        ringWhenStart: this.ringWhenStart,
        rotation: this.rotation,
        soundName: this.soundName,
        titleType: this.titleType,
      }
      this.$store.dispatch('preferences/save', data)
    },

    load () {
      this.$store.dispatch('preferences/load')
      this.length = this.$store.state.preferences.length
      this.notifyWhenFinish = this.$store.state.preferences.notifyWhenFinish
      this.ringWhenStart = this.$store.state.preferences.ringWhenStart
      this.rotation = this.$store.state.preferences.rotation
      this.soundName = this.$store.state.preferences.soundName
      this.titleType = this.$store.state.preferences.titleType

      if (!this.initialized) {
        this.pastLength = this.$store.state.preferences.length
        this.pastNotifyWhenFinish = this.$store.state.preferences.notifyWhenFinish
        this.pastRingWhenStart = this.$store.state.preferences.ringWhenStart
        this.pastRotation = this.$store.state.preferences.rotation
        this.pastTitleType = this.$store.state.preferences.titleType
      }

      this.initialized = true
    },

    onChange (event) {
      this.save()
    },

    length_onChange (event) {
      if (this.length.match(/^\d+$/)) {
        this.length = `${this.length}m`
      }
      else if (!this.length.match(/^\d+m$/)) {
        this.length = this.$store.state.preferences.length
      }
    },

    revert_onClick (event) {
      this.length = this.pastLength
      this.notifyWhenFinish = this.pastNotifyWhenFinish
      this.rotation = this.pastRotation
      this.ringWhenStart = this.pastRingWhenStart
      this.soundName = this.pastSoundName
      this.save()
    },

    reset_onClick (event) {
      this.$store.dispatch('preferences/reset')
      this.load()
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
