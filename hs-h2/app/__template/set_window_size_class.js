{
	const hd_size = 1400
	const m_size = 976
	const sm_size = 500

	const hd_class_name = '--hd'
	const d_class_name = '--d'
	const m_class_name = '--m'
	const sm_class_name = '--sm'

	const set_window_size_class = () => {
		const window_width = document.documentElement.clientWidth

		// sm window
		window_width <= sm_size
			? document.body.classList.add(sm_class_name)
			: document.body.classList.remove(sm_class_name)

		window_width >= hd_size
			? document.body.classList.add(hd_class_name)
			: document.body.classList.remove(hd_class_name)

		// m window
		if (window_width <= m_size) {
			document.body.classList.remove(d_class_name)
			document.body.classList.add(m_class_name)
		}
		// d window
		else {
			document.body.classList.add(d_class_name)
			document.body.classList.remove(m_class_name)
		}

		return
	}

	set_window_size_class()
	window.addEventListener('resize', set_window_size_class)
}
