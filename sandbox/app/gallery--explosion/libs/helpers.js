// Helpers

// throttle
function throttle(callback, delay = 200) {
	let is_waiting = false
	let saved_args = null
	let saved_this = null

	return function wrapper(...args) {
		if (is_waiting) {
			saved_args = args
			saved_this = this
			return
		}

		callback.apply(this, args)

		is_waiting = true
		setTimeout(() => {
			is_waiting = false
			if (saved_this) {
				wrapper.apply(saved_this, saved_args)
				saved_this = null
				saved_args = null
			}
		}, delay)
	}
}

// fade_in
const fade_in = (element, callback) => {
	animation()

	function animation() {
		let opacity = Number(element.style.opacity)

		if (opacity < 1) {
			element.style.opacity = opacity + 0.05
			window.requestAnimationFrame(animation)
			return
		}

		if (callback) {
			callback()
		}
	}
}

// fade_out
const fade_out = (element, callback) => {
	animation()

	function animation() {
		let opacity = Number(element.style.opacity)

		if (opacity > 0) {
			opacity = opacity - 0.04
			element.style.opacity = opacity
			window.requestAnimationFrame(animation)
			return
		}

		if (callback) {
			callback()
		}
	}
}
