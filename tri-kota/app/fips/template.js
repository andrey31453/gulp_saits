{
	const fips = document.getElementsByClassName('js__fips')[0]
	if (fips) {
		//
		// dom elements
		//
		const heading = fips.getElementsByClassName('js__heading')
		const items = fips.getElementsByClassName('js__items')[0]
		const item = fips.getElementsByClassName('js__item')

		let active_item = 0

		// change_active_tab
		const change_active_tab = () => {
			for (let i = 0; i < heading.length; i++) {
				if (i === active_item) {
					heading[i].classList.add('--active')
					item[i].classList.add('--active')
				} else {
					heading[i].classList.remove('--active')
					item[i].classList.remove('--active')
				}
			}
		}

		// change_items_height
		const change_items_height = () => {
			items.style.height = `${item[active_item].clientHeight}px`
		}

		// template
		change_items_height()
		window.addEventListener('load', change_items_height)

		//
		// listeners
		//
		for (let i = 0; i < heading.length; i++) {
			heading[i].addEventListener('click', () => {
				active_item = i
				change_active_tab()
				change_items_height()
			})
		}
	}
}
