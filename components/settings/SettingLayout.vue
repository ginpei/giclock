<template lang="pug">
  article.SettingLayout
    header.SettingLayout-header
      div.SettingLayout-header-inner
        router-link.SettingLayout-back(to="/")
          i.fa.fa-arrow-left
          | Done
        h1.SettingLayout-title {{title}}

    main.SettingLayout-main
      slot
</template>

<script>
  export default {
    props: [
      'title',
    ],
  }
</script>

<style lang="sass">
.SettingLayout

.SettingLayout-header
  background-color: var(--color-bg)
  border-bottom-width: 1px
  border-bottom-style: solid
  left: 0
  position: sticky
  top: 0

.SettingLayout-header-inner
  padding: 1rem
  max-width: 600px
  margin: 0 auto

.SettingLayout-back
  border-style: solid
  border-width: 1px
  display: inline-block
  margin-right: 1rem
  padding: .5em 1em
  vertical-align: baseline

  & > .fa
    margin-right: 0.2rem

.SettingLayout-title
  display: inline
  font-size: 1em
  margin: 0

.SettingLayout-main
  padding: 1em
  max-width: 600px
  margin: 0 auto

.SettingLayout-input
  box-sizing: border-box
  width: 100%
</style>

