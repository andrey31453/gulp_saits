{
	const squares_col_numbers = 20 // кол-во колонок square
	const squares_row_numbers = 20 // кол-во рядов square

	const square_bg = '#1d1d1d'
	const square_shadow = '#000000'

	const board = document.getElementsByClassName('__board')[0]
	if (board) {
		//
		// add squares in to board
		//
		const set_color = (square) => {
			const random_color = `rgb(
						${Math.floor(Math.random() * 256)},
						${Math.floor(Math.random() * 256)},
						${Math.floor(Math.random() * 256)}
				)`
			square.style.backgroundColor = random_color
			square.style.boxShadow = `0 0 2px ${random_color}, 0 0 10px ${random_color}`

			setTimeout(() => delete_color(square), 300)
		}
		const delete_color = (square) => {
			square.classList.add('__passed')
			square.style.backgroundColor = ``
			square.style.boxShadow = ``
		}
		// set & delete color

		// add event listener for square
		const add_event_listener = (square) => {
			square.addEventListener('mouseover', () => set_color(square))
		}
		// add one square
		const add_square = (row) => {
			const square = document.createElement('div')
			square.classList.add('bg__square')
			row.append(square)

			return square
		}
		// add squares for row
		const add_squares_for_row = (row) => {
			for (let e = 0; e < squares_col_numbers; e++) {
				const square = add_square(row)
				add_event_listener(square)
			}
		}
		// add row
		const add_square_row = () => {
			const row = document.createElement('div')
			row.classList.add('bg__row')
			board.append(row)

			return row
		}
		// upgrade styles for row
		const upgrade_styles_for_row = (row) => {
			row.classList.add('__f')
			row.classList.add('__fc')
		}

		// template function for add all squares
		const add_squares = () => {
			for (let i = 0; i < squares_row_numbers; i++) {
				const row = add_square_row()
				add_squares_for_row(row)
				upgrade_styles_for_row(row)
			}
		}
		add_squares()
	}
}
