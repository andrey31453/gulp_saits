{
	const gvs = document.getElementsByClassName('__gvs')[0]
	if (gvs) {
		const up_btn = gvs.getElementsByClassName('__up')[0]
		const down_btn = gvs.getElementsByClassName('__down')[0]
		const sidebar = gvs.getElementsByClassName('__sidebar')[0]
		const main_sliders_container = gvs.getElementsByClassName(
			'__main-sliders-container'
		)[0]
		const main_slides = gvs.getElementsByClassName('__main-slide')

		let active_slide_index = 0 // номер активного слайда

		//	update saidbar style
		sidebar.style.top = `-${(main_slides.length - 1) * 100}vh`

		//
		//	functions
		//
		const correct_slide_index = () => {
			if (active_slide_index < 0)
				active_slide_index = main_slides.length - 1
			else if (active_slide_index === main_slides.length)
				active_slide_index = 0
		}

		const change_slide = () => {
			main_sliders_container.style.transform = `translateY(${
				-100 * active_slide_index
			}vh)`
			sidebar.style.transform = `translateY(${
				100 * active_slide_index
			}vh)`
		}

		//	change slide listener functions
		const next_slide = () => {
			active_slide_index++
			correct_slide_index()
			change_slide()
		}
		const prev_slide = () => {
			active_slide_index--
			correct_slide_index()
			change_slide()
		}
		const listener_for_change_slide = (event) => {
			if (event.code === 'ArrowRight' || event.code === 'ArrowUp')
				next_slide()
			else if (
				event.code === 'ArrowLeft' ||
				event.code === 'ArrowDown'
			)
				prev_slide()
		}

		//
		//	events
		//
		up_btn.addEventListener('click', next_slide)
		down_btn.addEventListener('click', prev_slide)
		window.addEventListener('keydown', () => {
			listener_for_change_slide(event)
		})
	}
}
