// catalog__tab
{
	const ct = document.getElementsByClassName('__ct')[0]
	if (ct) {
		// табы
		const heading = document.getElementsByClassName('ct__heading')
		const content = document.getElementsByClassName('ct__item')
		const contentInner =
			document.getElementsByClassName('ct__item-inner')

		let targetFunCAT = false
		let newActive = 0
		let oldActive

		// задание высоты контент иннера
		const contentInnerHeightChange = (i) => {
			contentInner[0].style.height = `calc(${content[i].clientHeight}px + 2rem)`
		}
		contentInnerHeightChange(0)
		// листенер на ресайз
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

		for (let i = 0; i < heading.length; i++) {
			heading[i].addEventListener('click', () => {
				checkActiveTab()
			})
		}

		// добавление пробелов в цифры "все включено"
		const priceValue = document.getElementsByClassName(
			'ct__item__service-price'
		)
		for (let elem of priceValue) {
			const priceValueAddSpace = elem.innerHTML
				.toString()
				.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + '&nbsp')
			elem.innerHTML = `<span class="__ramka">[</span> ${priceValueAddSpace} <span class="cod-rubl">&nbsp</span><span class="__ramka">]</span>`
		}

		// блок индивидуальный тариф
		const serviceCheck = document.getElementsByClassName(
			'ct__item__service-check'
		)
		const priceInner = document.getElementsByClassName(
			'__individual__price'
		)
		const itemService = document.getElementsByClassName(
			'ct__item__service'
		)
		const itemPrice =
			document.getElementsByClassName('ct__item-price')

		// слушатели на кнопки чекед
		const listenerForPrice = () => {
			for (let i = 0; i < serviceCheck.length; i++) {
				serviceCheck[i].addEventListener('click', () => {
					toggleClass(i)
				})
			}
		}
		// генерация блоков content
		const getContent = (data) => {
			let i = data.length - 1

			let itemContainerLeft = document.createElement('div')
			itemContainerLeft.classList.add('ct__item-container')
			itemContainerLeft.classList.add('ct__item__description')
			itemContainerLeft.insertAdjacentHTML(
				'beforeend',
				`
					${data[i].img_svg}
					${data[i].description}
				`
			)

			let itemContainerRight = document.createElement('div')
			itemContainerRight.classList.add('ct__item-container')

			for (let k = 0; k < data[i].services.length; k++) {
				let serviceName = document.createElement('div')
				serviceName.classList.add('ct__item__service-name')
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
					service.classList.add('ct__item__service')
					service.classList.add('__choise')
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
						<div type='checkbox' class='ct__item__service-check' data-i='${
							i + 1
						}' data-price='${
							data[i].services[k].serviceOptions[e].price
						}'>
						<svg class="ctc__icon ctc__icon--check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M8094 16424l-4948-4948c-297-297-297-779 0-1076l1076-1076c297-297 779-297 1076 0l3333 3333 7139-7139c297-297 779-297 1076 0l1076 1076c297 297 297 779 0 1076l-8753 8753c-297 297-779 297-1076 0z"/></svg>
						<svg class="ctc__icon ctc__icon--choise" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M18753 20995H2253C1010 20995 3 19988 3 18745V2245C3 1002 1010-5 2253-5h16500c1243 0 2250 1007 2250 2250v16500c0 1243-1007 2250-2250 2250zm-9595-4597l8625-8625c293-293 293-768 0-1061l-1061-1061c-293-293-768-293-1061 0l-7034 7034-3284-3284c-293-293-768-293-1061 0l-1061 1061c-293 293-293 768 0 1061l4875 4875c293 293 768 293 1061 0z"></svg>
						</div>
						<div class='ct__item__service-options'>${
							data[i].services[k].serviceOptions[e].name
						}</div>
						<div class='ct__item__service-price'>${priceValue}</div>
					`
					)
					itemContainerRight.appendChild(service)
				}
			}
			itemContainerRight.insertAdjacentHTML(
				'beforeend',
				`
			<div class='ct__item-price'></div>
			<button class='frm__external-button __tarif'><span class=" __btn-anim">Отправить заявку</span></button>
		`
			)

			priceInner[0].appendChild(itemContainerLeft)
			priceInner[0].appendChild(itemContainerRight)

			listenerForPrice()
			calculatePrice(i + 1)
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
			itemPrice[0].innerHTML = `<span class='ct__item-price__border'>${priceValue}<span class='cod-rubl'></span></span>`
		}
		window.addEventListener('load', () => {
			contentInnerHeightChange(newActive)
		})
	}
}
