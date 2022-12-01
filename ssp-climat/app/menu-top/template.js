// открытие / закрытие мобильного меню
{
	const mt = document.getElementsByClassName('js__mt')[0]
	if (mt) {
		const m_menu_button = document.getElementsByClassName(
			'js__m-menu-button'
		)[0]

		const mobile_menu_open = () => {
			mt.classList.add('--active')
			disable_scroll()
			m_menu_button.removeEventListener('click', mobile_menu_open)
			m_menu_button.addEventListener('click', mobile_menu_close)
			window.addEventListener('click', mobile_menu_listener)
			window.addEventListener('keydown', mobile_menu_listener)
		}
		const mobile_menu_close = () => {
			mt.classList.remove('--active')
			enable_scroll()
			m_menu_button.removeEventListener('click', mobile_menu_close)
			m_menu_button.addEventListener('click', mobile_menu_open)
			window.removeEventListener('click', mobile_menu_listener)
			window.removeEventListener('keydown', mobile_menu_listener)
		}

		const mobile_menu_listener = () => {
			if (
				event.key == 'Escape' ||
				event.target.classList.contains('--substrate')
			) {
				mobile_menu_close()
			}
		}

		if (window.innerWidth < 751) {
			m_menu_button.addEventListener('click', mobile_menu_open)
		}
	}
}
