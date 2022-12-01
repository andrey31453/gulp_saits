{
	const faq = document.getElementsByClassName('js__faq')[0]
	if (faq) {
		//
		// change active
		//

		// dom-s
		const item = faq.getElementsByClassName('faq__item')
		const item_header = faq.getElementsByClassName('faq__item-header')

		// f
		const change_active = () => {
			for (let i = 0; i < item_header.length; i++) {
				if (
					event.target == item_header[i] ||
					event.target.closest('.faq__item-header') == item_header[i]
				) {
					item[i].classList.toggle('faq--active')
				} else {
					item[i].classList.remove('faq--active')
				}
			}
		}

		// listeners
		for (let i = 0; i < item_header.length; i++) {
			item_header[i].addEventListener('click', change_active)
		}

		//
		// add icons
		//

		// dom-s
		const item_icons = faq.getElementsByClassName('js__item-icons')

		// f
		const add_icon = (el) => {
			el.innerHTML = `
					<svg class="--minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000" ><path d="M19500 8250H1500C672 8250 0 8922 0 9750v1500c0 828 672 1500 1500 1500h18000c828 0 1500-672 1500-1500V9750c0-828-672-1500-1500-1500z"/></svg>
					<svg class="--plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M19500 8250h-6750V1500c0-828-672-1500-1500-1500H9750c-828 0-1500 672-1500 1500v6750H1500C672 8250 0 8922 0 9750v1500c0 828 672 1500 1500 1500h6750v6750c0 828 672 1500 1500 1500h1500c828 0 1500-672 1500-1500v-6750h6750c828 0 1500-672 1500-1500V9750c0-828-672-1500-1500-1500z"/></svg>
				`
		}

		// call f
		;[...item_icons].forEach((el) => {
			add_icon(el)
		})
	}
}
