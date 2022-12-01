// menu-top
{
	const mt = document.getElementsByClassName('__mt')[0]
	if (mt) {
		//
		// основная программа мобильного меню
		//

		// включение программы мобильного меню для мобильных дисплеев
		if (document.documentElement.clientWidth < 850) {
			const mobile_btn =
				document.getElementsByClassName('__mobile__btn')[0]

			// листенеры когда мобильное меню открыто
			const mobile_menu_open_listener_click = () => {
				if (event.target.dataset.close && event.target != mobile_btn)
					toggle_mobile_sub_menu()
			}
			const mobile_menu_open_listener_keydown = () => {
				if (event.key == 'Escape') toggle_mobile_sub_menu()
			}

			// переключение состояния мобильного меню
			const toggle_mobile_sub_menu = () => {
				if (!mt.className.includes('__active')) {
					mt.classList.add('__active')
					window.addEventListener(
						'click',
						mobile_menu_open_listener_click
					)
					window.addEventListener(
						'keydown',
						mobile_menu_open_listener_keydown
					)
				} else {
					mt.classList.remove('__active')
					window.removeEventListener(
						'click',
						mobile_menu_open_listener_click
					)
					window.removeEventListener(
						'keydown',
						mobile_menu_open_listener_keydown
					)
				}
			}

			// листенер на кнопку мобильного меню
			mobile_btn.addEventListener('click', toggle_mobile_sub_menu)
		}
		//
		// апдейт стилей для топ меню
		//
		const header_style_update = () => {
			if (window.location.pathname == '/') {
				// апдейт стилей для топ меню на главной странице
				mt.classList.add('__index')
			} else {
				// отодвигаем div#main на высоту топ меню на всех страницах кроме главной
				const main = document.getElementById('main')
				main.style.paddingTop = `${mt.clientHeight}px`
			}
		}
		header_style_update()

		// листенер на изменение ресаиза
		window.addEventListener('resize', header_style_update)
	}
}
