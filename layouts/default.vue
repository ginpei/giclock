<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="sass">
html
  --color-bg: #000
  --color-fg: #0f9
  --color-fg-disabled: #063

body
  background-color: var(--color-bg)
  box-sizing: border-box
  color: var(--color-fg)
  margin: 0

body,
button
  font-family: "Share Tech Mono", monospace

a,
button
  color: var(--color-fg)

  &:active
    background-color: var(--color-fg)
    color: var(--color-bg)

button
  background-color: transparent
  border-color: initial
  border-style: solid
  border-width: 1px
  box-sizing: border-box

  &:disabled
    border-color: transparent
    color: var(--color-fg-disabled)

.pinCenter
  align-items: center
  display: flex
  justify-content: center
  text-align: center

</style>
