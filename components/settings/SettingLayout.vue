<template lang="pug">
  article.layout
    header.header
      div.header-inner
        router-link.back(to="/")
          i.fa.fa-arrow-left
          | Done
        h1.title {{title}}

    main.main
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
  .layout

  .header
    background-color: var(--color-bg)
    border-bottom-width: 1px
    border-bottom-style: solid
    left: 0
    position: sticky
    top: 0

  .header-inner
    padding: 1rem
    max-width: 600px
    margin: 0 auto

  .back
    border-style: solid
    border-width: 1px
    display: inline-block
    margin-right: 1rem
    padding: .5em 1em
    vertical-align: baseline

    & > .fa
      margin-right: 0.2rem

  .title
    display: inline
    font-size: 1em
    margin: 0

  .main
    padding: 1em
    max-width: 600px
    margin: 0 auto
</style>

