<template lang="pug">
	div.AnalogClock(:style="wrapperStyle")
		div.clockBoard
			div.clockHand.minuteHand(:style="minuteHandStyle")
			div.clockHand.hourHand(:style="hourHandStyle")
			div.clockHand.secondHand(:style="secondHandStyle")
</template>

<style lang="sass" scoped>

	.clockBoard
		border: 1px solid tomato
		border-radius: 50%
		height: 100%
		position: relative
		width: 100%

	.clockHand
		border-radius: 10px
		left: calc(50% - var(--width) / 2)
		position: absolute
		top: 50%
		transform-origin: 50% 0
		// transition: transform 50ms ease-out  // problematic when 59 sec -> 0 sec
		width: var(--width)

	.minuteHand
		--width: 2%

		background-color: skyblue
		height: 50%

	.hourHand
		--width: 5%

		background-color: green
		height: 30%

	.secondHand
		--width: 1%

		background-color: tomato
		height: 50%

</style>

<script>
	module.exports = {
		props: [
			'height',
			'time',
			'width',
		],

		computed: {
			hours(){
				return this.time && this.time.getHours() % 12 + this.minutes / 60
			},

			minutes(){
				return this.time && this.time.getMinutes() + this.seconds / 60
			},

			seconds(){
				return this.time && this.time.getSeconds()
					// + this.time.getMilliseconds() / 1000
			},

			wrapperStyle() {
				return {
					height: this.height + 'px',
					width: this.width + 'px',
				}
			},

			minuteHandStyle() {
				return {
					transform: `rotate(${this.rotate(this.minutes, 60)})`
				}
			},

			hourHandStyle() {
				return {
					transform: `rotate(${this.rotate(this.hours, 12)})`
				}
			},

			secondHandStyle() {
				return {
					transform: `rotate(${this.rotate(this.seconds, 60)})`
				}
			},
		},

		methods: {
			rotate(progress, total) {
				return `${progress / total * 360 - 180}deg`
			},
		},
	}
</script>
