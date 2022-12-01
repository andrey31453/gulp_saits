{
	const form = document.getElementsByClassName('js__ff__form')[0]
	if (form) {
		// проверка на обязательные поля
		form.onsubmit = () => {
			let dostup
			const required = form.querySelectorAll('[data-required="true"]')

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
		}

		// антибот
		let antirobotInternal = document.createElement('input')
		antirobotInternal.type = 'hidden'
		antirobotInternal.name = 'antirobotpro'
		antirobotInternal.value = 'VNVqVLIIlRwn'
		form.appendChild(antirobotInternal)
	}
}
