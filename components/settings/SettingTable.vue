<template lang="pug">
  section
    h2.setting-heading {{heading}}
    table.setting-table
      tbody
        slot
</template>

<script>
  export default {
    props: [
      'heading',
    ],
  }
</script>

<style lang="sass" scoped>
  .setting-heading
    border-style: solid
    border-width: 1px
    font-size: 1em
    font-weight: normal
    padding: .5em 1em

  table.setting-table
    width: 100%
</style>

