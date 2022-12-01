// banner__slider
{
	const bs = document.getElementsByClassName('__bs')[0]
	if (bs) {
		//
		// основная программа баннера
		//

		const slide_change_timeout = 5000 // время авто-листания слайда

		const slide_items = bs.getElementsByClassName('__slider-item') // слайдеры
		const prev = bs.getElementsByClassName('__prev')[0] // btn-s
		const next = bs.getElementsByClassName('__next')[0] // btn-s

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

		//  смена слайда
		const change_slide = () => {
			const indicator_item = bs.getElementsByClassName(
				'__indicator-item'
			)
			for (let i = 0; i < slide_items.length; i++) {
				if (i > i_active_slide) {
					slide_items[i].classList.remove('__active')
					slide_items[i].classList.remove('__left')
					indicator_item[i].classList.remove('__active')
				} else if (i == i_active_slide) {
					slide_items[i].classList.add('__active')
					slide_items[i].classList.remove('__left')
					indicator_item[i].classList.add('__active')
				} else {
					slide_items[i].classList.remove('__active')
					slide_items[i].classList.add('__left')
					indicator_item[i].classList.remove('__active')
				}
			}
		}

		// функции прев и некст слайд
		const prev_slide = () => {
			i_active_slide == 0
				? (i_active_slide = slide_items.length - 1)
				: i_active_slide__
			change_slide()
		}
		const next_slide = () => {
			i_active_slide == slide_items.length - 1
				? (i_active_slide = 0)
				: i_active_slide++
			change_slide()
		}

		// апдейт стилей для кнопок
		const btn_style_update = () => {
			next.classList.remove('__unload')
			prev.classList.remove('__unload')
		}

		// добавление итемов для индикатор листа
		const add_indicator_items = (list) => {
			for (let i = 1; i < slide_items.length; i++) {
				list.insertAdjacentHTML(
					'beforeend',
					`
				<div class='bs__indicator-item __indicator-item'></div>
			`
				)
			}
		}

		// добавление индикатор листа
		const add_indicator_list = () => {
			const list = document.createElement('div')
			list.classList.add(`bs__indicator-list`)
			list.classList.add(`__flex`)
			list.insertAdjacentHTML(
				'beforeend',
				`
			<div class='bs__indicator-item __indicator-item __active'></div>
		`
			)
			add_indicator_items(list)
			bs.appendChild(list)
		}

		// добавление левого отступа для индикатор листа
		const indicator_list_style_update = () => {
			const indicator_list = bs.getElementsByClassName(
				'bs__indicator-list'
			)[0]
			const indicator_list_width = indicator_list.clientWidth
			indicator_list.style.left = `calc(50% - ${
				indicator_list_width / 2
			}px)`
		}

		// добавление евентов для индиктор итемов
		const indicator_list_event_add = () => {
			const indicator_item = bs.getElementsByClassName(
				'bs__indicator-item'
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
		const bi_onload_update = async () => {
			// догрузка слайдеров
			await background_update()

			// убирание опасити с бтн-ов
			btn_style_update()

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
		window.addEventListener('load', bi_onload_update)

		// делаем для текста топ паддинг на высоту топ меню
		const top_menu = document.getElementsByClassName('menu__top')[0]
		const slider_item_content = document.getElementsByClassName(
			'bs__slider-item__content'
		)

		for (let i = 0; i < slider_item_content.length; i++) {
			slider_item_content[
				i
			].style.paddingTop = `${top_menu.clientHeight}px`
		}
		prev.style.marginTop = `${top_menu.clientHeight}px`
		next.style.marginTop = `${top_menu.clientHeight}px`
		prev.style.height = `calc(100% - ${top_menu.clientHeight}px)`
		next.style.height = `calc(100% - ${top_menu.clientHeight}px)`
	}
}
