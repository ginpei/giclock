<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="sass">
body
  box-sizing: border-box
  margin: 0

body,
button
  font-family: "Share Tech Mono", monospace

button
  background-color: transparent
  border-color: initial
  border-style: solid
  border-width: 1px
  box-sizing: border-box

  &:disabled
    border-color: transparent
    color: #063 !important

.pinCenter
  align-items: center
  display: flex
  justify-content: center
  text-align: center

</style>
