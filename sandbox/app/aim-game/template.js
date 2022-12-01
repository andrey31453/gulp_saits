{
	const ag = document.getElementsByClassName('js__ag')[0]
	if (ag) {
		const screens = document.getElementsByClassName('js__screen')
		let time = 10

		//
		// start screen
		//
		const start = document.getElementsByClassName('js__start')[0]

		start.addEventListener('click', () => {
			screens[0].classList.add('__up')
		})

		//
		// time-list screen
		//
		const time_btns = document.getElementsByClassName('js__time-btn')

		const time_choice = () => {
			time = event.target.dataset.time
			screens[1].classList.add('__up')
			start_game()
		}

		;[...time_btns].forEach((btn) => {
			btn.addEventListener('click', time_choice)
		})

		//
		// game screen
		//
		const timer = document.getElementsByClassName('js__time')[0]
		const board = document.getElementsByClassName('js__board')[0]
		const heading = document.getElementsByClassName('js__heading')[0]
		let score = 0

		// stop game
		const stop_game = () => {
			board.innerHTML = ``
			heading.textContent = ``

			const end_game_text = document.createElement('div')
			end_game_text.classList.add('ag__heading')
			end_game_text.innerHTML = `
				ваш счет: ${score}
			`
			board.appendChild(end_game_text)
		}

		// set time
		const correct_time_string = (time_string) => {
			const text_for_replace = /(00:)([0-9])$/
			if (time_string.match(text_for_replace))
				time_string = time_string.replace(text_for_replace, '$10$2')
			return time_string
		}
		const write_time = () => {
			time_string = `00:${time}`
			time_string = correct_time_string(time_string)

			timer.textContent = time_string
			setTimeout(set_time, 1000)
		}

		const set_time = () => {
			if (time > -1) {
				write_time()
				time--
			} else stop_game()
		}

		// circle
		const circle_style_update = (circle) => {
			let random_circle_pos = 100 * Math.random()
			if (random_circle_pos < 12) random_circle_pos = 12
			circle.style.top = `calc(${random_circle_pos}% - 50px)`

			random_circle_pos = 100 * Math.random()
			if (random_circle_pos < 12) random_circle_pos = 12
			circle.style.left = `calc(${random_circle_pos}% - 50px)`
			const random_circle_size = Math.floor(30 * Math.random() + 20)
			circle.style.width = `${random_circle_size}px`
			circle.style.height = `${random_circle_size}px`
		}
		const create_circle = () => {
			const circle = document.createElement('div')
			circle.classList.add('ag__board__circle')
			board.appendChild(circle)

			circle_style_update(circle)

			return circle
		}
		const delete_circle = (circle) => {
			board.removeChild(circle)
		}
		const add_listener_for_circle = (circle) => {
			circle.addEventListener('click', () => {
				delete_circle(circle)
				score++
				generate_circle()
			})
		}
		const generate_circle = () => {
			const circle = create_circle()
			add_listener_for_circle(circle)
		}

		// start game
		const start_game = () => {
			set_time()
			generate_circle()
		}
	}
}
