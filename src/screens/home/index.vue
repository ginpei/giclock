<template lang="pug">
	Wrapper
		h1 Hello World!
		ul
			li
				router-link(to="/settings") Settings
</template>

<style lang="sass" scoped>
</style>

<script>
	const Wrapper = require('../../components/base-layout/index.vue')

	module.exports = {
		components: {
			Wrapper,
		},

		data() {
			return {
			}
		},

		computed: {
		},

		methods: {
		},
	}
</script>
