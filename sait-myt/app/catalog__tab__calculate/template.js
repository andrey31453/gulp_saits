// catalog__tab
{
	const ctc = document.getElementsByClassName('__ctc')[0]
	if (ctc) {
		// табы
		const heading = document.getElementsByClassName('ctc__heading')
		const content = document.getElementsByClassName('ctc__item')
		const contentInner =
			document.getElementsByClassName('ctc__item-inner')
		const itemService = document.getElementsByClassName(
			'ctc__item__service'
		)
		const serviceCheck = document.getElementsByClassName(
			'ctc__item__service-check'
		)
		const itemPrice =
			document.getElementsByClassName('ctc__item-price')

		let newActive = 2
		let oldActive

		// проверка на переход по якорям
		if (window.location.href.includes('saiting-creating#cutaway')) {
			newActive = 0
		} else if (
			window.location.href.includes('saiting-creating#landing')
		) {
			newActive = 1
		} else if (
			window.location.href.includes('saiting-creating#sait-catalog')
		) {
			newActive = 2
		} else if (
			window.location.href.includes(
				'saiting-creating#internet-magazin'
			)
		) {
			newActive = 3
		}

		// задание высоты контент иннера
		const contentInnerHeightChange = () => {
			contentInner[0].style.height = `calc(${content[newActive].clientHeight}px + 2rem)`
		}

		// смена активного таба
		const changeActiveTab = () => {
			for (let i = 0; i < heading.length; i++) {
				if (heading[i].classList.contains('__active')) {
					oldActive = i
				}
			}

			contentInnerHeightChange()

			heading[oldActive].classList.remove('__active')
			heading[newActive].classList.add('__active')

			content[oldActive].classList.remove('__active')
			content[oldActive].classList.add('__outing')
			content[newActive].classList.add('__inting')

			setTimeout(() => {
				content[oldActive].classList.remove('__outing')
				content[newActive].classList.remove('__inting')
				content[newActive].classList.add('__active')
			}, 300)
		}

		// евенты на кнопки хидинга
		for (let i = 0; i < heading.length; i++) {
			heading[i].addEventListener('click', () => {
				newActive = i
				changeActiveTab()
			})
		}

		// генерация блоков content
		const getContent = (data) => {
			for (let i = 0; i < data.length - 1; i++) {
				let itemContainerLeft = document.createElement('div')
				itemContainerLeft.classList.add('ctc__item-container')
				itemContainerLeft.classList.add('ctc__item__description')
				itemContainerLeft.insertAdjacentHTML(
					'beforeend',
					`
					${data[i].img_svg}
					${data[i].description}
				`
				)

				let itemContainerRight = document.createElement('div')
				itemContainerRight.classList.add('ctc__item-container')

				for (let k = 0; k < data[i].services.length; k++) {
					let serviceName = document.createElement('div')
					serviceName.classList.add('ctc__item__service-name')
					serviceName.insertAdjacentHTML(
						'beforeend',
						`<span>${data[i].services[k].serviceName}</span>`
					)
					itemContainerRight.appendChild(serviceName)

					for (
						let e = 0;
						e < data[i].services[k].serviceOptions.length;
						e++
					) {
						let service = document.createElement('div')
						service.classList.add('ctc__item__service')
						let tempClassName =
							data[i].services[k].serviceOptions[e].class
						service.classList.add(tempClassName)
						const priceValue = data[i].services[k].serviceOptions[
							e
						].price
							.toString()
							.replace(
								/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
								'$1' + '&nbsp'
							)

						service.insertAdjacentHTML(
							'beforeend',
							`
									<div type='checkbox' class='ctc__item__service-check' data-i='${i}' data-price='${data[i].services[k].serviceOptions[e].price}'>
									<svg class="ctc__icon ctc__icon--check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M8094 16424l-4948-4948c-297-297-297-779 0-1076l1076-1076c297-297 779-297 1076 0l3333 3333 7139-7139c297-297 779-297 1076 0l1076 1076c297 297 297 779 0 1076l-8753 8753c-297 297-779 297-1076 0z"/></svg>
									<svg class="ctc__icon ctc__icon--choise" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M18753 20995H2253C1010 20995 3 19988 3 18745V2245C3 1002 1010-5 2253-5h16500c1243 0 2250 1007 2250 2250v16500c0 1243-1007 2250-2250 2250zm-9595-4597l8625-8625c293-293 293-768 0-1061l-1061-1061c-293-293-768-293-1061 0l-7034 7034-3284-3284c-293-293-768-293-1061 0l-1061 1061c-293 293-293 768 0 1061l4875 4875c293 293 768 293 1061 0z"></svg>
									</div>
									<div class='ctc__item__service-options'>${data[i].services[k].serviceOptions[e].name}</div>
									<div class='ctc__item__service-price'>${priceValue}</div>
								`
						)
						itemContainerRight.appendChild(service)
					}
				}
				itemContainerRight.insertAdjacentHTML(
					'beforeend',
					`
					<div class='ctc__item-price'></div>
					</div>
				`
				)

				let item = document.createElement('div')
				item.classList.add('ctc__item')
				if (i == newActive) item.classList.add('__active')
				item.appendChild(itemContainerLeft)
				item.appendChild(itemContainerRight)
				contentInner[0].appendChild(item)
			}
			contentInnerHeightChange()
			for (let i = 0; i < data.length - 1; i++) {
				calculatePrice(i)
			}
			listenerForPrice()
		}

		// загрузка джсон объекта
		const downloadContent = () => {
			fetch('/design/template/json/catalog__tab__calculate/data.json')
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					getContent(data)
				})
		}
		downloadContent()

		// задание активного пункта хидинга
		heading[newActive].classList.add('__active')

		// переключение классов на строчках прайса
		const toggleClass = (i) => {
			itemService[i].classList.toggle('__checked')
			itemService[i].classList.toggle('__choise')
			let k = serviceCheck[i].getAttribute('data-i')

			calculatePrice(k)
		}

		//пересчет суммы
		const calculatePrice = (k) => {
			let checkedServices = 0

			for (let i = 0; i < serviceCheck.length; i++) {
				if (
					serviceCheck[i].getAttribute('data-i') == k &&
					!itemService[i].classList.contains('__checked')
				) {
					checkedServices +=
						+serviceCheck[i].getAttribute('data-price')
				}
			}
			// добавление пробелов в сумму
			const priceValue = checkedServices
				.toString()
				.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + '&nbsp')
			itemPrice[
				k
			].innerHTML = `<span class='ctc__item-price__border'>${priceValue}<span class='cod-rubl'></span></span>`
		}

		// слушатели на кнопки чекед
		const listenerForPrice = () => {
			for (let i = 0; i < serviceCheck.length; i++) {
				serviceCheck[i].addEventListener('click', () => {
					toggleClass(i)
				})
			}
		}
		window.addEventListener('resize', () => {
			contentInnerHeightChange()
		})

		//REVISIONS
		// слушатели на кнопки-якоря
		const hrefItem = document.getElementsByClassName('fpl__link')
		window.addEventListener('load', () => {
			for (let i = 0; i < hrefItem.length; i++) {
				hrefItem[i].addEventListener('click', () => {
					if (i == 0) {
						newActive = 0
						changeActiveTab()
					}
					if (i == 1) {
						newActive = 1
						changeActiveTab()
					}
					if (i == 2) {
						newActive = 2
						changeActiveTab()
					}
					if (i == 3) {
						newActive = 3
						changeActiveTab()
					}
				})
			}
		})
	}
}
