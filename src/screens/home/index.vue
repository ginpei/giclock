<template lang="pug">
	Wrapper
		h1 Hello World!
		ul
			li
				router-link(to="/settings") Settings

		Clock(:time="time")
</template>

<style lang="sass" scoped>
</style>

<script>
	const Wrapper = require('../../components/base-layout/index.vue')
	const Clock = require('./Clock.vue')

	module.exports = {
		components: {
			Wrapper,
			Clock,
		},

		data() {
			return {
				time: null,
			}
		},

		computed: {
		},

		mounted() {
			this.tmUpdateTime = setInterval(() => {
				this.time = new Date()
			}, 10)
		},

		destroyed() {
			clearInterval(this.tmUpdateTime)
		},

		methods: {
		},
	}
</script>
