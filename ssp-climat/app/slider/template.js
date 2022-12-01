// banner__slider
{
	const slider = document.getElementsByClassName('js__slider')[0]
	if (slider) {
		//
		// основная программа баннера
		//

		const slide_change_timeout = 5000 // время авто-листания слайда

		const slide_items = slider.getElementsByClassName('js__slider-item') // слайдеры
		const prev = slider.getElementsByClassName('js__prev')[0] // btn-s
		const next = slider.getElementsByClassName('js__next')[0] // btn-s

		let i_active_slide = 0 // номер активного слайда
		let timeout

		// догрузка бакгроундов
		const background_update = () => {
			for (let i = 1; i < slide_items.length; i++) {
				slide_items[
					i
				].style.backgroundImage = `url('${slide_items[i].dataset.imgSrc}')`
			}
		}
		const figure_update = () => {
			const figure = document.getElementsByClassName('js__figure')

			;[...figure].forEach((item) => (item.src = item.dataset.figureSrc))
		}

		//  смена слайда
		const change_slide = () => {
			const indicator_item = slider.getElementsByClassName('js__indicator-item')
			for (let i = 0; i < slide_items.length; i++) {
				if (i > i_active_slide) {
					slide_items[i].classList.remove('--active')
					slide_items[i].classList.remove('--left')
					indicator_item[i].classList.remove('--active')
				} else if (i == i_active_slide) {
					slide_items[i].classList.add('--active')
					slide_items[i].classList.remove('--left')
					indicator_item[i].classList.add('--active')
				} else {
					slide_items[i].classList.remove('--active')
					slide_items[i].classList.add('--left')
					indicator_item[i].classList.remove('--active')
				}
			}
		}

		// функции прев и некст слайд
		const prev_slide = () => {
			i_active_slide == 0
				? (i_active_slide = slide_items.length - 1)
				: i_active_slide--
			change_slide()
		}
		const next_slide = () => {
			i_active_slide == slide_items.length - 1
				? (i_active_slide = 0)
				: i_active_slide++
			change_slide()
		}

		// апдейт стилей для кнопок
		const unload_style_remove = () => {
			const top_line = document.getElementsByClassName('js__top-line')[0]

			top_line.classList.remove('--unload')
			next.classList.remove('--unload')
			prev.classList.remove('--unload')
		}

		// добавление итемов для индикатор листа
		const add_indicator_items = (list) => {
			for (let i = 1; i < slide_items.length; i++) {
				list.insertAdjacentHTML(
					'beforeend',
					`
				<div class='slider__indicator-item js__indicator-item'></div>
			`
				)
			}
		}

		// добавление индикатор листа
		const add_indicator_list = () => {
			const list = document.createElement('div')
			list.classList.add(`slider__indicator-list`)
			list.classList.add(`__f`)
			list.insertAdjacentHTML(
				'beforeend',
				`
			<div class='slider__indicator-item js__indicator-item --active'></div>
		`
			)
			add_indicator_items(list)
			slider.appendChild(list)
		}

		// добавление левого отступа для индикатор листа
		const indicator_list_style_update = () => {
			const indicator_list = slider.getElementsByClassName(
				'slider__indicator-list'
			)[0]
			const indicator_list_width = indicator_list.clientWidth
			indicator_list.style.left = `10%`
		}

		// добавление евентов для индиктор итемов
		const indicator_list_event_add = () => {
			const indicator_item = slider.getElementsByClassName(
				'slider__indicator-item'
			)
			for (let i = 0; i < indicator_item.length; i++) {
				indicator_item[i].addEventListener('click', () => {
					i_active_slide = i
					change_slide()
					clearTimeout(timeout)
					timeout_add()
				})
			}
		}

		// добавление таймаута для автомат. листания слайдера
		const timeout_add = () => {
			timeout = setInterval(next_slide, slide_change_timeout)
		}

		// онлоад функция
		const onload_update = async () => {
			// догрузка слайдеров
			await background_update()
			await figure_update()

			// убирание опасити с бтн-ов
			unload_style_remove()

			// добавление индикатор-листа
			add_indicator_list()
			indicator_list_style_update()
			indicator_list_event_add()

			// таимаут на листаниe слайдера
			timeout_add()
		}

		// эвенты на листание с бтн-ов
		prev.addEventListener('click', () => {
			prev_slide()
			clearTimeout(timeout)
			timeout_add()
		})
		next.addEventListener('click', () => {
			next_slide()
			clearTimeout(timeout)
			timeout_add()
		})
		// эвент на загрузку окна
		window.addEventListener('load', onload_update)
	}
}
