{
	const goTopBtn = document.getElementsByClassName('go-top__quadr')[0]
	if (goTopBtn) {
		const trackScroll = () => {
			const scrolled = window.pageYOffset

			if (scrolled > 600) {
				goTopBtn.classList.add('__active')
			}
			if (scrolled < 600) {
				goTopBtn.classList.remove('__active')
			}
		}

		const backToTop = () => {
			if (window.pageYOffset > 0) {
				window.scrollBy(0, -80)
				setTimeout(backToTop, 10)
			}
		}

		window.addEventListener('scroll', trackScroll)
		goTopBtn.addEventListener('click', backToTop)
	}
}
