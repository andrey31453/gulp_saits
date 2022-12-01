{
	const themes_btn =
		document.getElementsByClassName('js__themes-btn')[0]

	if (themes_btn) {
		const body = document.querySelector('body')
		const html = document.querySelector('html')
		const favicon = document.querySelector(
			'link[rel="shortcut icon"]'
		)
		let theme

		// check day theme
		const check_day_theme = () => {
			if (localStorage.getItem('theme') == 'day') on_day_theme()
			else on_night_theme()
		}

		// on day theme
		const on_day_theme = () => {
			html.classList.add('--day')
			body.classList.add('--day')
			theme = 'day'
			favicon.href =
				'design/template/images/__template/template-icon/favicon--day.ico'
		}
		// on night theme
		const on_night_theme = () => {
			html.classList.add('--night')
			body.classList.add('--night')
			theme = 'night'
			favicon.href =
				'design/template/images/__template/template-icon/favicon--night.ico'
		}

		// change day theme
		const change_theme = () => {
			// preventDefault
			event.preventDefault()

			// style-update
			body.insertAdjacentHTML(
				'beforeend',
				`
					<style class="js__style-update_temp">
						*, ::after, ::before {
							-webkit-transition:
											color 0ms linear,
											box-shadow 0ms linear,
											opacity 0ms linear,
											fill 0ms linear !important;
							-moz-transition:
											color 0ms linear,
											box-shadow 0ms linear,
											opacity 0ms linear,
											fill 0ms linear !important;
							-o-transition:
											color 0ms linear,
											box-shadow 0ms linear,
											opacity 0ms linear,
											fill 0ms linear !important;
							-ms-transition:
											color 0ms linear,
											box-shadow 0ms linear,
											opacity 0ms linear,
											fill 0ms linear !important;
							transition:
											color 0ms linear,
											box-shadow 0ms linear,
											opacity 0ms linear,
											fill 0ms linear !important;
						}
						ymaps * {
							transition: all 0ms;
						}
					</style>
				`
			)

			// classList toggle
			html.classList.toggle('--day')
			html.classList.toggle('--night')
			body.classList.toggle('--day')
			body.classList.toggle('--night')

			// style-update
			setTimeout(() => {
				document
					.getElementsByClassName('js__style-update_temp')[0]
					.remove()
			}, 1000)

			// localStorage
			if (localStorage.getItem('theme') == 'day') {
				localStorage.setItem('theme', 'night')
				// change favicon
				favicon.href =
					'design/template/images/_template/template-icon/favicon--night.ico'
			} else {
				localStorage.setItem('theme', 'day')
				// change favicon
				favicon.href =
					'design/template/images/_template/template-icon/favicon--day.ico'
			}
		}

		// listeners
		check_day_theme()
		themes_btn.addEventListener('click', change_theme)
	}
}
