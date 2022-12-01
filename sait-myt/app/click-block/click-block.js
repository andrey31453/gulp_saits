// click-block
{
	let button = document.getElementsByClassName('cb__text')
	let modal = document.getElementsByClassName('cb__modal')

	// эвент на закрытие
	const listener = () => {
		if (
			event.target.getAttribute('data-close') == 'true' ||
			event.key == 'Escape'
		) {
			modal[0].classList.remove('__active')

			// удаление евента на закрытие
			modal[0].removeEventListener('click', listener)
			window.removeEventListener('keydown', listener)
		}
	}

	// event на открытие
	for (let i = 0; i < button.length; i++) {
		button[i].addEventListener('click', () => {
			event.preventDefault()
			modal[0].classList.add('__active')

			// добавление event на закрытие
			modal[0].addEventListener('click', listener)
			window.addEventListener('keydown', listener)
		})
	}
}
