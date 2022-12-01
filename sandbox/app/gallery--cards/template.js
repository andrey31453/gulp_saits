{
	const gc = document.getElementsByClassName('__gc')[0]
	if (gc) {
		const slides = gc.getElementsByClassName('__slide')

		const change_active_slide = (new_active_slide) => {
			;[...slides].forEach((elem) => {
				if (elem == new_active_slide)
					elem.classList.add('__active__gc')
				else elem.classList.remove('__active__gc')
			})
		}

		;[...slides].forEach((elem) => {
			elem.addEventListener('click', () => {
				change_active_slide(elem)
			})
		})
	}
}
