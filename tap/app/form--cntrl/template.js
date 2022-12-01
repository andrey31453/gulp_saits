{
	// form__cntrl
	// форма в теле страницы
	let formInternal = document.getElementsByClassName(
		'__form__internal'
	)

	// проверка на обязательные поля
	formInternal[0].addEventListener('submit', () => {
		let dostup
		let fbRequired = formInternal[0].querySelectorAll(
			'[data-required="true"]'
		)

		for (let i = 0; i < fbRequired.length; i++) {
			if (fbRequired[i].value.length == 0) {
				fbRequired[i].classList.add('__error')
				fbRequired[i].setAttribute(
					'placeholder',
					'Впишите, пожалуйста, свой номер телефона'
				)
				dostup = 'off'
			}
		}

		if (dostup == 'off') {
			event.preventDefault()
		}
	})

	// антибот
	let antirobotInternal = document.createElement('input')
	antirobotInternal.type = 'hidden'
	antirobotInternal.name = 'antirobotpro'
	antirobotInternal.value = 'gdfg56FG423er'
	formInternal[0].appendChild(antirobotInternal)

	// модульные формы
	let modal = document.getElementsByClassName('__modal')
	let externalButton = document.getElementsByClassName(
		'__external-button'
	)

	// event на открытие модульной формы
	const addTimeoutForListener = () => {
		for (let i = 0; i < externalButton.length; i++) {
			externalButton[i].addEventListener('click', () => {
				modal[0].classList.add('__active')
			})
		}
	}
	addTimeoutForListener()

	// event на закрытие модульной формы
	modal[0].addEventListener('click', (event) => {
		if (event.target.getAttribute('data-close') == 'true') {
			modal[0].classList.remove('__active')
		}
	})
	window.addEventListener('keydown', (event) => {
		if (event.key == 'Escape') modal[0].classList.remove('__active')
	})

	// проверка на обязательные поля
	let formExternal = document.getElementsByClassName(
		'__form__external'
	)

	formExternal[0].onsubmit = () => {
		let dostup
		let fbRequired = formExternal[0].querySelectorAll(
			'[data-required="true"]'
		)

		for (let i = 0; i < fbRequired.length; i++) {
			if (fbRequired[i].value.length == 0) {
				fbRequired[i].classList.add('__error')
				fbRequired[i].setAttribute(
					'placeholder',
					'Впишите, пожалуйста, свой номер телефона'
				)
				dostup = 'off'
			}
		}

		if (dostup == 'off') {
			event.preventDefault()
		}
	}

	// антибот
	let antirobotExternal = document.createElement('input')
	antirobotExternal.type = 'hidden'
	antirobotExternal.name = 'antirobotpro'
	antirobotExternal.value = 'gdfg56FG423er'
	formExternal[0].appendChild(antirobotExternal)
}
