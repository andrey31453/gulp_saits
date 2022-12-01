{
	const tc = document.getElementsByClassName('js__tc')[0]
	if (tc) {
		const heading = tc.getElementsByClassName('tc__heading')
		const content = tc.getElementsByClassName('tc__item')
		const contentInner = tc.getElementsByClassName('tc__item-inner')
		const priceValue = tc.getElementsByClassName('js__price-value')

		let targetFunCAT = false
		let newActive = 0
		let oldActive = 0

		// вставка пробела в price
		for (let i = 0; i < priceValue.length; i++) {
			if (priceValue[i].innerHTML != 'бесплатно') {
				priceValue[i].innerHTML = priceValue[i].innerHTML // содержимое див
					.toString() // превратить в строку
					.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + '&nbsp') // вставка пробелов
			}
		}

		// задание высоты контент иннера
		const contentInnerHeightChange = (i) => {
			contentInner[0].style.height = `${content[i].clientHeight}px`
		}
		contentInnerHeightChange(0)
		window.addEventListener('DOMCOntentLoad', () => {
			contentInnerHeightChange(0)
		})
		window.addEventListener('resize', () => {
			contentInnerHeightChange(newActive)
		})
		// смена активного таба
		const changeActiveTab = () => {
			for (let i = 0; i < heading.length; i++) {
				if (heading[i].classList.contains('__active')) {
					oldActive = i
				}
			}

			contentInnerHeightChange(newActive)

			heading[oldActive].classList.remove('__active')
			heading[newActive].classList.add('__active')

			content[oldActive].classList.remove('__active')
			content[oldActive].classList.add('__outing')
			content[newActive].classList.add('__inting')

			setTimeout(() => {
				content[oldActive].classList.remove('__outing')
				content[newActive].classList.remove('__inting')
				content[newActive].classList.add('__active')
				targetFunCAT = false
			}, 300)
		}

		const checkActiveTab = () => {
			// проверка на то что уже не запущена другая смена окна
			if (!targetFunCAT) {
				targetFunCAT = true

				// поиск евент таргета
				for (let i = 0; i < heading.length; i++) {
					// проверка на то что евент таргет не активное окно
					if (event.target == heading[i]) {
						if (!event.target.classList.contains('__active')) {
							newActive = i
							changeActiveTab()
						} else {
							targetFunCAT = false
						}
					}
				}
			}
		}

		// листенеры на заголовки
		for (let i = 0; i < heading.length; i++) {
			heading[i].addEventListener('click', () => {
				checkActiveTab()
			})
		}

		//
		// прямые ссылки для метрики
		//

		// переход к заданному элементу
		const goToHref = (x) => {
			window.scrollTo(pageXOffset, x.getBoundingClientRect().y - 150)
		}

		// смена активного пункта меню
		const change_active_tab = (i) => {
			newActive = i
			changeActiveTab()
			goToHref(heading[0])
			window.addEventListener('load', () => {
				contentInnerHeightChange(newActive)
			})
		}

		// прямые ссылки для метрики
		if (window.location.href.includes('arenda-kassy-s-ip'))
			change_active_tab(0)
		else if (window.location.href.includes('arenda-kassy-s-ooo'))
			change_active_tab(0)
		else if (window.location.href.includes('arenda-kassy'))
			change_active_tab(0)
		else if (window.location.href.includes('arenda-ekvairing-s-ip'))
			change_active_tab(1)
		else if (window.location.href.includes('arenda-ekvairing-s-ooo'))
			change_active_tab(1)
		else if (window.location.href.includes('arenda-ekvairing'))
			change_active_tab(1)
		else if (
			window.location.href.includes('arenda-rasschetniy-schet-s-ip')
		)
			change_active_tab(2)
		else if (
			window.location.href.includes('arenda-rasschetniy-schet-s-ooo')
		)
			change_active_tab(2)
		else if (
			window.location.href.includes('arenda-rasschetniy-schet')
		)
			change_active_tab(2)
		else if (window.location.href.includes('arenda-ip-s-kassa'))
			change_active_tab(3)
		else if (window.location.href.includes('arenda-ip-s-ekvairing'))
			change_active_tab(3)
		else if (
			window.location.href.includes('arenda-ip-s-rasschetniy-schet')
		)
			change_active_tab(3)
		else if (window.location.href.includes('arenda-ip'))
			change_active_tab(3)
		else if (window.location.href.includes('arenda-ooo-s-kassa'))
			change_active_tab(4)
		else if (window.location.href.includes('arenda-ooo-s-ekvairing'))
			change_active_tab(4)
		else if (
			window.location.href.includes('arenda-ooo-s-rasschetniy-schet')
		)
			change_active_tab(4)
		else if (window.location.href.includes('arenda-ooo'))
			change_active_tab(4)

		//
		// reviions
		//
		const links = document.getElementsByClassName('js__link')
		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', () => change_active_tab(i))
		}
	}
}
