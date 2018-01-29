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
button,
input,
select
  background-color: transparent
  border-color: initial
  border-width: 1px
  color: var(--color-fg)

button
  border-style: solid
  box-sizing: border-box
  padding: .5rem 1rem

input,
select
  border-style: none none solid
  padding: .5rem 0

a,
button,
input,
select
  &:active,
  &.active
    background-color: var(--color-fg)
    color: var(--color-bg)

  &:disabled,
  &.disabled
    border-color: transparent
    color: var(--color-fg-disabled)

option
  background-color: var(--color-bg)

.pinCenter
  align-items: center
  display: flex
  justify-content: center
  text-align: center

</style>
