# Usage

You have to specify value with `.sync`.

```
SettingCheckbox(:model.sync="ringWhenStart") Ring
```

<template lang="pug">
  label.SettingLayout-input
    input.originalCheckbox(@change="onChange" :checked="checked" type="checkbox")
    i.far.fa-square.checkbox(v-show="!checked")
    i.far.fa-check-square.checkbox(v-show="checked")
    slot
</template>

<script>
  export default {
    props: [
      'model',
    ],

    data () {
      return {
        checked: this.model,
      }
    },

    watch: {
      model (model) {
        this.checked = model
      },
    },

    methods: {
      onChange (event) {
        this.$emit('update:model', event.target.checked)
      },
    },
  }
</script>

<style lang="sass" scoped>
.SettingCheckbox

.originalCheckbox
  display: none

.checkbox
  margin-right: 0.3em
</style>

