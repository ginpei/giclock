<template lang="pug">
  tr
    th {{title}}
    td
      slot
</template>

<script>
  export default {
    props: [
      'title',
    ],
  }
</script>

<style lang="sass" scoped>
  table.setting-table > tbody > tr > th
    font-weight: normal
    padding: .5em 1em
    text-align: left
    width: 50%
</style>

