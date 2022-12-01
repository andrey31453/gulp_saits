{
	const slider = document.getElementsByClassName('js__slider')[0]
	if (slider) {
		// doms
		const slides = slider.getElementsByClassName('js__swiper-slide')

		//
		// function
		//

		// get_window_status
		const get_window_status = () => {
			const window_width = document.documentElement.clientWidth

			// hd window
			if (window_width >= hd_size) {
				return {
					image_prefix: hd_image_prefix,
					width_height_ratio: hd_ratio,
				}
			}
			// m window
			if (window_width <= m_size) {
				return {
					image_prefix: m_image_prefix,
					width_height_ratio: m_ratio,
				}
			}

			// d window
			return {
				image_prefix: d_image_prefix,
				width_height_ratio: d_ratio,
			}
		}

		// set_slider_images
		const set_slider_images = (image_prefix) => {
			// отработка псевдо слайда перед основным слайдером
			slides[0].style.backgroundImage = `url('/images/banner/banners/${image_prefix}-${
				slides.length - 1 - 2 // за 2 псевдоэлемента
			}.jpg')`

			// отработка основного слайдера
			for (let i = 1; i < slides.length - 1; i++) {
				slides[
					i
				].style.backgroundImage = `url('/images/banner/banners/${image_prefix}-${
					i - 1
				}.jpg')`
			}

			// отработка псевдо слайда после основного слайдера
			slides[
				slides.length - 1
			].style.backgroundImage = `url('/images/banner/banners/${image_prefix}-${0}.jpg')`
		}

		// set_slider_height
		const set_slider_height = (width_height_ratio) => {
			const width = slider.offsetWidth
			slider.style.height = `${Math.floor(
				width_height_ratio * width
			)}px`
		}

		// set_params_for_slider
		const set_params_for_slider = () => {
			const window_status = get_window_status()

			set_slider_images(window_status.image_prefix)
			set_slider_height(window_status.width_height_ratio)
		}
		set_params_for_slider()

		// listeners
		window.addEventListener('load', set_params_for_slider)
		window.addEventListener('resize', set_params_for_slider)
	}
}
