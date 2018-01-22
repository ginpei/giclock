<template lang="pug">
  SettingLayout(title="Preferences")

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
  SettingInput,
  SettingLayout,
  SettingTable,
} from '~/components/settings/index.js'

export default {
  components: {
    SettingColumn,
    SettingInput,
    SettingLayout,
    SettingTable,
  },
}
</script>

<style lang="sass" scoped>
</style>
