{
	const body = document.querySelector('body')
	if (body) {
		const append_child = (cls) => {
			const elem = document.createElement('div')
			elem.classList.add(`${cls}`)
			body.appendChild(elem)
		}

		append_child('bg-img')
		append_child('bg-color')
		append_child('bg-linear-gradient')
	}
}
