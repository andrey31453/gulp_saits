{
	const compare = document.getElementsByClassName('js__compare')[0]
	if (compare) {
		// doms
		const car = compare.getElementsByClassName('js__car')[0]
		const fuel = compare.getElementsByClassName('js__fuel')[0]
		const consumption =
			compare.getElementsByClassName('js__consumption')[0]
		const saved = compare.getElementsByClassName('js__saved')[0]
		const payback = compare.getElementsByClassName('js__payback')[0]

		const doms = [car, fuel, consumption, saved, payback]

		// vars
		let active_number = -1
		let rewrite_status = false
		let first_data_check = true
		let items
		let check_pos_interval

		// data
		data = [
			{
				car: 'Легковой',
				fuel: 'АИ95',
				consumption: '7 200 л (360 000 ₽)',
				saved: '30% (108 000 ₽)',
				payback: '6 мес',
				image: '/images/okupaemost/images/2.jpg',
			},
			{
				car: 'Внедорожник',
				fuel: 'ДТ',
				consumption: '10 800 л (550 800 ₽)',
				saved: '30% (165 000 ₽)',
				payback: '3 мес',
				image: '/images/okupaemost/images/3.jpg',
			},

			{
				car: 'Грузовой',
				fuel: 'ДТ',
				consumption: '74 000 л (3 774 000 ₽)',
				saved: '30% (1 125 000 ₽)',
				payback: '2 мес',
				image: '/images/okupaemost/images/4.jpg',
			},
			{
				car: 'Автобус',
				fuel: 'ДТ',
				consumption: '50 000 л (1 785 000 ₽)',
				saved: '30% (750 000 ₽)',
				payback: '1 мес',
				image: '/images/okupaemost/images/5.jpg',
			},
		]

		//
		// functions
		//

		// compare_init
		const compare_init = async () => {
			for (let i = 0; i < data.length; i++) {
				compare.insertAdjacentHTML(
					'beforeend',
					`
						<div class="okupaemost__compare__item __fcolc js__item" data-num="${i}">
							<div class="okupaemost__compare__image-bg  __bi" style="background-image: url('${data[i].image}')"></div>
							<span>${data[i].car}</span>
						</div>
					`
				)
			}

			items = compare.getElementsByClassName('js__item')
			await change_data_item(0)
		}

		// write_data_max_length
		const write_data_max_length = () => {
			data.forEach((elem) => {
				let max_length = 0
				for (const string in elem) {
					if (string !== 'image') {
						max_length = Math.max(max_length, elem[string].length)
					}
				}
				elem.max_length = max_length
			})
		}

		// get_dom_max_length_string
		const get_dom_max_length_string = () => {
			let res = 0

			doms.forEach(
				(elem) => (res = Math.max(res, elem.innerHTML.length))
			)

			return res
		}

		// get_data_max_length_string
		const get_data_max_length_string = () => {
			// check for first
			if (first_data_check) write_data_max_length()
			first_data_check = false

			return data[active_number].max_length
		}

		// write_strings
		const write_strings = (length) => {
			doms.forEach(
				(elem) =>
					(elem.innerHTML = data[active_number][
						elem.dataset.name
					].substring(0, length))
			)
		}

		// change_string
		const reduce_strings = (length) => {
			doms.forEach(
				(elem) =>
					(elem.innerHTML = elem.innerHTML.substring(0, length))
			)
		}

		// timeout
		const timeout = (time) => {
			return new Promise((resolve) => setTimeout(resolve, time))
		}

		// rewrite_data
		const rewrite_data = async () => {
			compare.classList.add('--rewrite-active')
			await timeout(200)
			await delete_data()
			await timeout(200)
			await write_data()
			await timeout(200)
			compare.classList.remove('--rewrite-active')
		}

		// delete_data
		const delete_data = async () => {
			let dom_length = get_dom_max_length_string()

			if (dom_length === 0) return
			else {
				dom_length--
				reduce_strings(dom_length)

				return new Promise((resolve) => setTimeout(resolve, 50)).then(
					async () => {
						await delete_data()
					}
				)
			}
		}

		// write_data
		const write_data = async () => {
			let dom_length = get_dom_max_length_string()
			let data_length = get_data_max_length_string()

			if (dom_length === data_length) return true
			else {
				dom_length++
				write_strings(dom_length)

				return new Promise((resolve) => setTimeout(resolve, 50)).then(
					async () => {
						await write_data()
					}
				)
			}
		}

		// change_active_item
		const change_active_item = () => {
			for (let i = 0; i < items.length; i++) {
				if (i == active_number) items[i].classList.add('--active')
				else items[i].classList.remove('--active')
			}
		}

		// change_data_item
		const change_data_item = async (i) => {
			// check for double
			if (i === active_number || rewrite_status) return

			rewrite_status = true
			active_number = i
			await change_active_item()
			await rewrite_data()
			rewrite_status = false
		}

		// check_mouse_move_pos
		const check_mouse_move_pos = (event) => {
			if (event.target.closest('.js__item') !== null) {
				change_data_item(
					+event.target.closest('.js__item').dataset.num
				)
			}
		}

		// check_mouse_pos_auto
		const check_mouse_pos_auto = () => {
			const node = document.querySelectorAll(':hover')

			for (let i = 0; i < node.length; i++) {
				if (node[i].classList.contains('js__item'))
					change_data_item(+node[i].dataset.num)
			}
		}

		// compare_add_listeners
		const compare_add_listeners = () => {
			compare.addEventListener('mouseover', () => {
				compare.addEventListener('mousemove', check_mouse_move_pos)
				;[...items].forEach((item) =>
					item.addEventListener('click', check_mouse_move_pos)
				)
				check_pos_interval = setInterval(check_mouse_pos_auto, 300)
			})
			compare.addEventListener('mouseout', () => {
				compare.removeEventListener('mousemove', check_mouse_move_pos)
				clearInterval(check_pos_interval)
			})
		}

		// template
		compare_init()
		compare_add_listeners()

		// listeners
	}
}
