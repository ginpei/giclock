<template lang="pug">
	div.DigitalClock
		| {{hours | digi2}}:{{minutes | digi2}}:{{seconds | digi2}}
</template>

<style lang="sass" scoped>
</style>

<script>
	module.exports = {
		props: [
			'hours',
			'minutes',
			'seconds',
		],

		computed: {
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
