// gallery-catalog
{
	const gc = document.getElementsByClassName('__gc')[0]
	if (gc) {
		const folder = '/design/template/images/gallery-catalog/our-work' // путь к папкам с images
		const items = gc.getElementsByClassName('__item')

		//
		// download images min in each item
		//

		// вставка изобажения в elem
		const set_img_in_item = (elem) => {
			const img = document.createElement('img')
			img.classList.add('gc__item-img')
			img.src = `${folder}/min/${elem.dataset.name}.png` // генерация src из elem data-name
			elem.appendChild(img)
		}

		// template
		const get_min_images = () => {
			;[...items].forEach((elem) => {
				set_img_in_item(elem) // вставка изобажения в elem
			})
		}
		get_min_images()

		//
		// модальная галлерея
		//

		const modal = gc.getElementsByClassName('__modal')[0]

		//
		// переключение типа модального окна
		//

		const change_type = modal.getElementsByClassName('__change-type')

		let folder_for_images = 'desktop' // папка из которой нужно брать  images

		// template
		const change_modal_type = () => {
			;[...change_type].forEach((item) => {
				if (item.className.includes('__active')) {
					item.classList.remove('__active')
					folder_for_images = item.dataset.folder_name
					modal.classList.add(`__${item.dataset.folder_name}`)
				} else {
					item.classList.add('__active')
					modal.classList.remove(`__${item.dataset.folder_name}`)
				}
			})
			add_modal_image()
		}

		// листенер на смену типа модального окна
		;[...change_type].forEach((item) =>
			item.addEventListener('click', change_modal_type)
		)

		//
		// основная программа модального окна
		//
		const name = modal.getElementsByClassName('__name')[0]

		let active_number = -1 // номер активного окна
		let modal_window_dont_use = true // флаг того, что модальное окно еще ни разу не запускалось
		let modal_img // якорь для img

		//
		// добавление изображения
		//

		// добавление src
		const add_src = () => {
			const src_name = items[active_number].dataset.name
			const url = `/design/template/images/gallery-catalog/our-work/${folder_for_images}/${src_name}.png`
			modal_img.src = url
		}
		// добавление slider name
		const add_slider_name = () => {
			const active_item_text =
				items[active_number].getElementsByClassName(
					'gc__item-text'
				)[0]
			const text = active_item_text.innerHTML
			name.innerHTML = `${text}<div class="gc__close-slaider" data-close="true">&times;</div>`
		}

		// template
		const add_modal_image = () => {
			add_src() // добавление src
			add_slider_name() // добавление slider name
		}
		// переключение слайда
		const prev_slaid = () => {
			active_number === 0
				? (active_number = items.length - 1)
				: active_number--

			add_modal_image()
		}
		const next_slaid = () => {
			active_number === items.length - 1
				? (active_number = 0)
				: active_number++

			add_modal_image()
		}

		// листенеры на то время пока модальное окно открыто
		const slaider_click_listener = () => {
			if (event.target.closest('.gc__prev-slaid')) prev_slaid()
			else if (event.target.closest('.gc__next-slaid')) next_slaid()
			else if (event.target.dataset.close) close_modal_slider()
		}
		const slaider_keydown_listener = () => {
			if (event.key == 'Escape') close_modal_slider()
			if (event.keyCode == '37') prev_slaid()
			if (event.keyCode == '39') next_slaid()
		}

		// включение / выключение листенеров пока модальное окно открыто
		const add_modal_listener = () => {
			window.addEventListener('click', slaider_click_listener)
			window.addEventListener('keydown', slaider_keydown_listener)
		}
		const remove_modal_listener = () => {
			window.removeEventListener('click', slaider_click_listener)
			window.removeEventListener('keydown', slaider_keydown_listener)
		}

		// создание img элемента
		const create_modal_image = () => {
			const img_container = modal.getElementsByClassName(
				'gc__modal-image-container'
			)[0]

			const img = document.createElement('img')
			img.classList.add('gc__modal-img')
			img_container.appendChild(img)

			modal_img = modal.getElementsByClassName('gc__modal-img')[0]
			modal_window_dont_use = false
		}

		// открытие / закрытие модального окна
		const open_modal_slider = () => {
			modal.classList.add('__active')
			disable_scroll()
			if (modal_window_dont_use) create_modal_image() // создание элемента img
			add_modal_image()
			add_modal_listener()
		}
		const close_modal_slider = () => {
			modal.classList.remove('__active')
			enable_scroll()
			remove_modal_listener()
		}

		// листенер на открытие модального окна
		for (let i = 0; i < items.length; i++) {
			items[i].addEventListener('click', () => {
				active_number = i
				open_modal_slider()
			})
		}
	}
}
