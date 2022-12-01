{
	//
	// модульные формы
	//
	const franshiza =
		document.getElementsByClassName('js__franshiza')[0]

	if (franshiza) {
		const form = franshiza.getElementsByClassName(
			'js__franshiza__form'
		)[0]
		const fbRequired = form.querySelectorAll('[data-required="true"]')
		const agreement = form.getElementsByClassName('js__agreement')[0]

		form.onsubmit = () => {
			let dostup_phone = true
			for (let i = 0; i < fbRequired.length; i++) {
				if (fbRequired[i].value.length == 0 || !fbRequired[i].value) {
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
