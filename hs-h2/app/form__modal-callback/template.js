{
	//
	// модульные формы
	//

	const fmc = document.getElementsByClassName('js__fmc')[0]

	if (fmc) {
		const form = fmc.getElementsByClassName('js__fmc__form')[0]
		const cfb = document.getElementsByClassName('js__cfb')[0]

		const btn_call_form = document.getElementsByClassName(
			'js__btn-call-form'
		)
		const agreement = form.getElementsByClassName('js__agreement')[0]

		// event на открытие модульной формы
		const addTimeoutForListener = () => {
			for (let i = 0; i < btn_call_form.length; i++) {
				btn_call_form[i].addEventListener('click', () => {
					event.preventDefault()
					fmc.classList.add('--active')
					disable_scroll()
					cfb.style = 'display: none'
				})
			}
		}
		addTimeoutForListener()

		// event на закрытие модульной формы
		fmc.addEventListener('click', (event) => {
			if (event.target.getAttribute('data-close') == 'true') {
				fmc.classList.remove('--active')
				enable_scroll()
				cfb.style = ''
			}
		})
		window.addEventListener('keydown', (event) => {
			if (event.key == 'Escape') fmc.classList.remove('--active')
		})

		form.onsubmit = () => {
			const fbRequired = form.querySelectorAll(
				'[data-required="true"]'
			)
			let dostup_phone = true
			for (let i = 0; i < fbRequired.length; i++) {
				if (fbRequired[i].value.length == 0) {
					fbRequired[i].setAttribute(
						'placeholder',
						'Впишите, пожалуйста, свой номер телефона'
					)
					dostup_phone = false
				}
			}
			if (!dostup_phone || !agreement.checked) {
				event.preventDefault()
			}
		}

		// антибот
		const antirobot = document.createElement('input')
		antirobot.type = 'hidden'
		antirobot.name = 'antirobotpro'
		antirobot.value = 'gdfg56FG423er'
		form.appendChild(antirobot)
	}
}
