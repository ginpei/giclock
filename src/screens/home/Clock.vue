<template lang="pug">
	div.Clock
		DigitalClock(:hours="hours" :minutes="minutes" :seconds="seconds")
</template>

<style lang="sass" scoped>
	.Clock
		border: 1px solid tomato
</style>

<script>
	const DigitalClock = require('./DigitalClock.vue')

	module.exports = {
		components: {
			DigitalClock,
		},

		props: [
			'time',
		],

		computed: {
			available(){
				return Boolean(this.time)
			},

			hours(){
				return this.time && this.time.getHours()
			},

			minutes(){
				return this.time && this.time.getMinutes()
			},

			seconds(){
				return this.time && this.time.getSeconds()
			},
		},
	}
</script>
