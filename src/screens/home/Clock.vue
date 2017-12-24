<template lang="pug">
	div.Clock
		AnalogClock(:time="time" width="200" height="200")
		DigitalClock(:hours="hours" :minutes="minutes" :seconds="seconds")
</template>

<style lang="sass" scoped>
	.Clock
		border: 1px solid tomato
</style>

<script>
	const AnalogClock = require('./AnalogClock.vue')
	const DigitalClock = require('./DigitalClock.vue')

	module.exports = {
		components: {
			AnalogClock,
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
