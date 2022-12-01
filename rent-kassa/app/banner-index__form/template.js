{
	const bif = document.getElementsByClassName('js__bif')[0]
	if (bif) {
		const form_in_page = bif.getElementsByClassName('js__form')[0]

		// проверка на обязательные поля
		form_in_page.addEventListener('submit', () => {
			let dostup
			const required = bif.querySelectorAll('[data-required="true"]')

			for (let i = 0; i < required.length; i++) {
				if (required[i].value.length == 0) {
					required[i].classList.add('__error')
					required[i].setAttribute(
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
		const antirobot = document.createElement('input')
		antirobot.type = 'hidden'
		antirobot.name = 'antirobotpro'
		antirobot.value = 'gdfg56FG423er'
		form_in_page.appendChild(antirobot)
	}
}
