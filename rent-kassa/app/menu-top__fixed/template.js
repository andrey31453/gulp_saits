// открытие / закрытие мобильного меню
{
	const mtf = document.getElementsByClassName('js__mtf')[0]
	if (mtf) {
		const m_menu_button = document.getElementsByClassName(
			'js__m-menu-button'
		)[0]

		const mobile_menu_open = () => {
			mtf.classList.add('__active')
			// disable_scroll()
			m_menu_button.removeEventListener('click', mobile_menu_open)
			m_menu_button.addEventListener('click', mobile_menu_close)
			window.addEventListener('click', mobile_menu_listener)
			window.addEventListener('keydown', mobile_menu_listener)
		}
		const mobile_menu_close = () => {
			mtf.classList.remove('__active')
			// enable_scroll()
			m_menu_button.removeEventListener('click', mobile_menu_close)
			m_menu_button.addEventListener('click', mobile_menu_open)
			window.removeEventListener('click', mobile_menu_listener)
			window.removeEventListener('keydown', mobile_menu_listener)
		}

		const mobile_menu_listener = () => {
			if (
				event.key == 'Escape' ||
				event.target.classList.contains('__substrate') ||
				event.target.closest('.mtf__menu__item')
			) {
				mobile_menu_close()
			}
		}

		if (window.innerWidth < 851) {
			m_menu_button.addEventListener('click', mobile_menu_open)
		}
	}
}
