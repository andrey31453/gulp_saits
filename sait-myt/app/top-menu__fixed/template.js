// открытие / закрытие мобильного меню
const tmf_menuButton = document.getElementsByClassName(
	'tmf__menu-button'
)
const tmf = document.getElementsByClassName('top-menu__fixed')

const tmf_mobileMenuOpen = () => {
	tmf[0].classList.add('__active')
	disable_scroll()
	tmf_menuButton[0].removeEventListener('click', tmf_mobileMenuOpen)
	tmf_menuButton[0].addEventListener('click', tmf_mobileMenuClose)
	window.addEventListener('click', tmf_mobileMenuLestener)
	window.addEventListener('keydown', tmf_mobileMenuLestener)
}
const tmf_mobileMenuClose = () => {
	tmf[0].classList.remove('__active')
	enable_scroll()
	tmf_menuButton[0].addEventListener('click', tmf_mobileMenuOpen)
	window.removeEventListener('click', tmf_mobileMenuLestener)
	window.removeEventListener('keydown', tmf_mobileMenuLestener)
}

const tmf_mobileMenuLestener = () => {
	if (
		event.key == 'Escape' ||
		event.target.classList.contains('substrate')
	) {
		tmf_mobileMenuClose()
	}
}

if (window.innerWidth < 851) {
	tmf_menuButton[0].addEventListener('click', tmf_mobileMenuOpen)
}

// всплытие модалки с контактами
const tmf_contactButton = document.getElementsByClassName(
	'__contact-button'
)
const tmf_modal = document.getElementsByClassName('tmf__modal')
const tmf_modalWindow = document.getElementsByClassName(
	'tmf__modal__window'
)
const tmf_mapOpenLink = document.getElementsByClassName(
	'tmf__modal__addres'
)
const tmf_modalMap =
	document.getElementsByClassName('tmf__modal__map')

// октрытие модалки
const tmf_modalOpen = () => {
	event.preventDefault()
	disable_scroll()
	tmf[0].classList.remove('__active')
	tmf_modal[0].classList.add('__active')
}
// закрытие модалки
const tmf_modalClose = () => {
	event.preventDefault()
	enable_scroll()
	tmf_modal[0].classList.remove('__active')
	window.removeEventListener('keydown', tmf_modalOpenListener)
	window.removeEventListener('click', tmf_modalOpenListener)
}

// разворачивание карты
const tmf_modalMapOpen = () => {
	event.preventDefault()
	tmf_mapOpenLink[0].classList.toggle('__active')
	tmf_modalMap[0].classList.toggle('__active')
}

// листенер внутри модалки
const tmf_modalOpenListener = () => {
	if (
		event.key == 'Escape' ||
		event.target.closest('.tmf__modal__close-button') ||
		event.target.classList.contains('substrate')
	) {
		tmf_modalClose()
	}
}
const tmf_modalListener = () => {
	window.addEventListener('keydown', tmf_modalOpenListener)
	window.addEventListener('click', tmf_modalOpenListener)
	tmf_mapOpenLink[0].addEventListener('click', tmf_modalMapOpen)
}

// внешнии листенер
for (let i = 0; i < tmf_contactButton.length; i++) {
	tmf_contactButton[i].addEventListener('click', () => {
		tmf_modalOpen()
		tmf_modalListener()
	})
}
