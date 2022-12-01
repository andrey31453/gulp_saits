{
	const dnd = document.getElementsByClassName('__dnd')[0]
	if (dnd) {
		const items = dnd.getElementsByClassName('__item')
		const placeholders = dnd.getElementsByClassName('__placeholder')

		let current_item

		//
		//	functions
		//

		//	placeholders
		const drag_over = () => {
			event.preventDefault()
			event.target
				.closest('.__placeholder')
				.classList.add('__hovered')
		}
		const drag_leave = () => {
			event.target
				.closest('.__placeholder')
				.classList.remove('__hovered')
		}
		const drag_drop = () => {
			event.target
				.closest('.__placeholder')
				.classList.remove('__hovered')
			event.target.closest('.__placeholder').append(current_item)
		}

		//	drags
		const drag_start = () => {
			current_item = event.target
			event.target.classList.add('__draggable')
			setTimeout(() => event.target.classList.add('__hide'), 100)
		}
		const drag_end = () => {
			event.target.classList.remove('__draggable', '__hide')
		}

		//
		//	events
		//

		//	placeholders
		;[...placeholders].forEach((item) => {
			item.addEventListener('dragover', drag_over)
			item.addEventListener('dragleave', drag_leave)
			item.addEventListener('drop', drag_drop)
		})

		//	items
		;[...items].forEach((item) => {
			item.addEventListener('dragstart', drag_start)
			item.addEventListener('dragend', drag_end)
		})
	}
}
