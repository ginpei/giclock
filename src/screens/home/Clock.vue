<template lang="pug">
	div.Clock
		p {{hours}}:{{minutes | digi2}}:{{seconds}}
</template>

<style lang="sass" scoped>
	.Clock
		border: 1px solid tomato
</style>

<script>
	module.exports = {
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

		filters: {
			/**
			 * Make the number in 2 digits.
			 * @param {number} n 0 to 99.
			 * @returns {string}
			 */
			digi2(n) {
				if (typeof n === 'number' && !isNaN(n)) {
					return n < 10 ? '0' + n : n.toString()
				} else {
					return ''
				}
			},
		},
	}
</script>
