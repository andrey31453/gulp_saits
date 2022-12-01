// class Explosition_gallery
class Explosion_gallery {
	// constructor
	constructor(element_node, options) {
		// options
		this.options = {
			...default_options,
			...options,
		}

		// node
		this.element_node = element_node
		this.link_nodes = element_node.getElementsByClassName(
			this.options.node.link
		)
		this.image_nodes = element_node.getElementsByClassName(
			this.options.node.image
		)

		// params
		this.min_width = this.options.params.min_width
		this.min_height = this.options.params.min_height
		this.padding = this.options.params.padding
		this.showing_count = this.options.params.showing_count
		this.length = this.link_nodes.length
		this.current_index = 0

		// init_modal
		this.init_modal()

		// modal nodes
		this.controls_node = this.modal_node.getElementsByClassName(
			this.options.classes.controls
		)[0]
		this.counter_node = this.modal_node.getElementsByClassName(
			this.options.classes.nav_counter
		)[0]
		this.content_node = this.modal_node.getElementsByClassName(
			this.options.classes.summary_content
		)[0]
		this.title_node = this.modal_node.getElementsByClassName(
			this.options.classes.summary_title
		)[0]
		this.description_node = this.modal_node.getElementsByClassName(
			this.options.classes.summary_description
		)[0]
		// event
		this.event()
		this.set_windows_params()
	}

	// init_modal
	init_modal() {
		this.modal_node = document.createElement('section')
		this.modal_node.dataset.close = true
		this.modal_node.classList.add(this.options.classes.modal)
		this.modal_node.classList.add(this.options.classes.clickable)

		// summary
		this.modal_node.innerHTML = `
				<div class="${this.options.classes.summary} ${this.options.classes.clickable}" data-close="false">
					<div class="${this.options.classes.summary_content}">
						<h2 class="${this.options.classes.summary_title}"></h2>
						<p class="${this.options.classes.summary_description}"></p>
					</div>
				</div>
			`
		// controls
		this.modal_node.innerHTML += `
				<div class="${this.options.classes.controls} __fcol">
					<button class="${this.options.classes.nav} ${this.options.classes.nav_close} ${this.options.classes.clickable}" data-close="true">
						<svg viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
					</button>

					<div class="${this.options.classes.navs} ${this.options.classes.clickable} __fcol" data-close="false">
						<button
							class="${this.options.classes.nav} ${this.options.classes.nav_prev}  ${this.options.classes.clickable}" data-close="false"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5200 5200"><path d="M2794.33 1173.33l2225.2 2225.19c107.32,107.32 107.32,281.31 0,388.62l-259.53 259.54c-107.14,107.13 -280.78,107.34 -388.17,0.46l-1771.81 -1763.51 -1771.81 1763.52c-107.39,106.88 -281.03,106.67 -388.16,-0.46l-259.54 -259.54c-107.32,-107.32 -107.32,-281.31 0,-388.62l2225.2 -2225.19c107.31,-107.32 281.3,-107.32 388.62,-0.01l0 0z"/></svg>
						</button>
						<div class="${this.options.classes.nav} ${this.options.classes.nav_counter} ${this.options.classes.clickable} __fcolc" data-close="false">
							<div>1<span>&nbsp;/&nbsp;${this.length}</span></div>
						</div>
						<button
							class="${this.options.classes.nav} ${this.options.classes.nav_next} ${this.options.classes.clickable}"
							data-close="false"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5200 5200"><path d="M2405.67 4036.68l-2225.2 -2225.22c-107.32,-107.32 -107.32,-281.31 0,-388.62l259.53 -259.53c107.14,-107.14 280.78,-107.34 388.17,-0.46l1771.81 1763.52 1771.81 -1763.52c107.39,-106.88 281.03,-106.68 388.17,0.46l259.53 259.54c107.32,107.32 107.32,281.31 0,388.61l-2225.19 2225.22c-107.32,107.31 -281.31,107.31 -388.63,0l0 0z"/></svg>
						</button>
					</div>
				</div>
			`
		// images
		this.content_data = []
		this.modal_node.innerHTML += `
				<div class="${this.options.classes.images}">
					${[...this.link_nodes]
						.map((link_node) => {
							this.content_data.push({
								title: link_node.dataset.title,
								description: link_node.dataset.description,
							})

							return `
							<img
								class="${this.options.classes.image} ${this.options.classes.clickable}"
								src="${link_node.href}"
								alt="${link_node.dataset.title}"
								data-title="${link_node.dataset.title}"
								data-description="${link_node.dataset.description}"
								data-close="false"
								>
						`
						})
						.join('')}
				</div>
			`

		document.body.appendChild(this.modal_node)
		this.set_modal_images_nodes()
	}

	// event
	event() {
		this.throttled_resize = throttle(this.resize, 200)
		window.addEventListener('resize', this.throttled_resize)
		for (let i = 0; i < this.link_nodes.length; i++) {
			this.link_nodes[i].addEventListener('click', () => {
				// prevent default
				event.preventDefault()

				if (
					!this.modal_node.classList.contains(
						this.options.classes.modal_opening
					) &&
					!this.modal_node.classList.contains(
						this.options.classes.modal_opened
					)
				) {
					this.current_index = i
					this.gallery_activated()
				}
			})
		}
	}

	// resize
	resize = () => {
		if (
			this.modal_node.classList.contains(
				this.options.classes.modal_opened
			)
		) {
			this.set_windows_params()
			this.set_init_sizes_to_images()
			this.switch_changes()
		}
	}

	// check_click
	check_click = (event) => {
		event.preventDefault()
		const click_node = event.target.closest(
			`.${this.options.classes.clickable}`
		)

		if (click_node.dataset.close == 'true') {
			this.close_gallery()
		} else if (
			click_node.classList.contains(this.options.classes.nav_prev) &&
			this.current_index > 0
		) {
			this.prev_slides()
		} else if (
			click_node.classList.contains(this.options.classes.nav_next) &&
			this.current_index < this.length - 1
		) {
			this.next_slides()
		}
	}

	// prev_slides
	prev_slides() {
		this.current_index--
		this.switch_changes()
	}
	// next_slides
	next_slides() {
		this.current_index++
		this.switch_changes()
	}

	// check_keydown
	check_keydown = (event) => {
		if (event.key == 'Escape' || event.key == 'Delete') {
			this.close_gallery()
		} else if (
			(event.key == 'ArrowRight' ||
				event.key == 'ArrowDown' ||
				event.key == 'Space' ||
				event.key == 'Enter') &&
			this.current_index < this.length - 1
		) {
			this.next_slides()
		} else if (
			(event.key == 'ArrowLeft' ||
				event.key == 'ArrowUp' ||
				event.key == 'Backspace') &&
			this.current_index > 0
		) {
			this.prev_slides()
		}
	}

	// set_windows_params
	set_windows_params() {
		// check load link node
		if (
			this.image_nodes !== undefined &&
			this.image_nodes[0].offsetWidth !== 0 &&
			this.image_nodes[0].naturalWidth !== 0 &&
			this.image_nodes[0].offsetWidth !==
				this.image_nodes[0].naturalWidth
		) {
			// set window_rect
			this.window_rect = {
				// image
				image_width: Math.round(
					Math.min(this.image_nodes[0].naturalWidth, 660)
				),
				image_height: Math.round(
					Math.min(this.image_nodes[0].naturalHeight, 550)
				),
				// image node
				image_node_width: Math.round(this.image_nodes[0].offsetWidth),
				image_node_height: Math.round(
					this.image_nodes[0].offsetHeight
				),
				// modal
				modal_width: Math.round(
					Math.max(this.options.params.min_width, window.innerWidth)
				),
				modal_height: Math.round(
					Math.max(this.options.params.min_height, window.innerHeight)
				),
				// scale_factor
				scale_factor: (
					Math.min(this.image_nodes[0].naturalWidth, 660) /
					this.image_nodes[0].offsetWidth
				).toFixed(2),
			}

			console.log('this.window_rect: ', this.window_rect)

			this.set_gallery_styles()
		} else {
			setTimeout(() => {
				this.set_windows_params()
			}, 100)
		}
	}

	// set_gallery_styles
	set_gallery_styles() {
		this.gallery_styles = [
			// prev_hidden
			{
				top_m: -1,
				top_i: 0,
				left_m: 0.5,
				left_i: -0.5,
				opacity: 0.1,
				z_index: 150,
				scale: 0.3,
				close: true,
			},
			// prev_showing 3
			{
				top_m: 0.05,
				top_i: -0.5,
				left_m: 0.35,
				left_i: -0.5,
				opacity: 0.2,
				z_index: 155,
				scale: 0.4,
				close: true,
			},
			// prev_showing 2
			{
				top_m: 0.3,
				top_i: -0.5,
				left_m: 0.2,
				left_i: -0.5,
				opacity: 0.3,
				z_index: 160,
				scale: 0.45,
				close: true,
			},
			// prev_showing 1
			{
				top_m: 0.6,
				top_i: -0.5,
				left_m: 0.02,
				left_i: 0,
				opacity: 0.4,
				z_index: 165,
				scale: 0.5,
				close: true,
			},
			// prev_showing 0
			{
				top_m: 0.9,
				top_i: -1,
				left_m: 0.45,
				left_i: -1,
				opacity: 0.5,
				z_index: 170,
				scale: 0.55,
				close: true,
			},
			// active
			{
				top_m: 0.5,
				top_i: -0.5,
				left_m: 0.5,
				left_i: -0.5,
				opacity: 1,
				z_index: 180,
				scale: 1,
				close: false,
			},
			// next_showing 0
			{
				top_m: 0.1,
				top_i: 0,
				left_m: 0.55,
				left_i: 0,
				opacity: 0.5,
				z_index: 170,
				scale: 0.55,
				close: true,
			},
			// next_showing 1
			{
				top_m: 0.4,
				top_i: -0.5,
				left_m: 0.98,
				left_i: -1,
				opacity: 0.4,
				z_index: 165,
				scale: 0.5,
				close: true,
			},
			// next_showing 2
			{
				top_m: 0.7,
				top_i: -0.5,
				left_m: 0.8,
				left_i: -0.5,
				opacity: 0.3,
				z_index: 160,
				scale: 0.45,
				close: true,
			},
			// next_showing 3
			{
				top_m: 0.95,
				top_i: -0.5,
				left_m: 0.65,
				left_i: -0.5,
				opacity: 0.2,
				z_index: 155,
				scale: 0.4,
				close: true,
			},
			// next_hidden
			{
				top_m: 2,
				top_i: -1,
				left_m: 0.5,
				left_i: -0.5,
				opacity: 0.1,
				z_index: 150,
				scale: 0.3,
				close: true,
			},
		]

		this.gallery_styles.map(
			(obj, i) =>
				(this.gallery_styles[i] = this.correct_gallery_styles(obj))
		)
	}
	// correct_gallery_styles
	correct_gallery_styles(obj) {
		const scale = (obj.scale * this.window_rect.scale_factor).toFixed(
			2
		)
		return {
			top: this.set_top_params(obj.top_m, obj.top_i, scale),
			left: this.set_left_params(obj.left_m, obj.left_i, scale),
			opacity: obj.opacity,
			z_index: obj.z_index,
			scale: scale,
			close: obj.close,
		}
	}

	// set top params
	set_top_params(a, b, c) {
		return Math.round(
			// высота окна
			a * this.window_rect.modal_height +
				// высота картинки
				this.window_rect.image_node_height *
					// высота картинки
					(b * c +
						// поправка на изменение высоты картинки из-за скалирования
						0.5 * (c - 1))
		)
	}

	// set left params
	set_left_params(a, b, c) {
		return Math.round(
			// высота окна
			a * this.window_rect.modal_width +
				this.window_rect.image_node_width *
					// высота картинки
					(b * c +
						// поправка на изменение высоты картинки из-за скалирования
						0.5 * (c - 1))
		)
	}

	// gallery_activated
	gallery_activated() {
		// add modal_opening
		this.modal_node.classList.add(this.options.classes.modal_opening)
		// call fade_in

		this.set_init_sizes_to_images()
		this.set_init_position_to_images()

		fade_in(this.modal_node, () => {
			// remove modal_opening
			this.modal_node.classList.remove(
				this.options.classes.modal_opening
			)
			// add modal_opened
			this.modal_node.classList.add(this.options.classes.modal_opened)
			this.switch_changes()
			disable_scroll()
		})

		this.modal_node.addEventListener('click', this.check_click)
		window.addEventListener('keydown', this.check_keydown)
	}

	// switch_changes
	switch_changes() {
		this.set_images_pos()
		this.set_controll_styles()
		this.check_controll_buttons_state()
		this.set_counter_value()
		this.set_summary()
	}

	// sort images for arrays
	set_images_pos() {
		// sort image nodes
		;[...this.modal_images_nodes].forEach(
			(modal_image_node, index) => {
				let number = index - this.current_index + 5
				number = this.set_correct_number(number)

				this.set_image_styles(modal_image_node, number)
			}
		)
	}

	// set_correct_number
	set_correct_number(number) {
		if (number < 0) return 0
		else if (number > 10) return 10
		else return number
	}

	// set_image_styles
	set_image_styles(node, index) {
		node.dataset.close = this.gallery_styles[index].close

		node.style.opacity = this.gallery_styles[index].opacity

		node.style.transform = `
				translate(
					${this.gallery_styles[index].left}px,
					${this.gallery_styles[index].top}px
				) scale(${this.gallery_styles[index].scale})
			`
		setTimeout(() => {
			node.style.zIndex = this.gallery_styles[index].z_index
		}, 200)
	}

	// set status controll buttons
	set_controll_styles() {
		const scale = this.window_rect.scale_factor
		// pos
		this.controls_node.style.top = `${Math.round(
			// высота окна
			0.5 * this.window_rect.modal_height -
				// высота картинки
				0.5 *
					this.window_rect.scale_factor *
					this.window_rect.image_node_height
		)}px`
		this.controls_node.style.left = `${Math.round(
			// высота окна
			0.5 * this.window_rect.modal_width +
				// высота картинки
				0.5 *
					this.window_rect.scale_factor *
					this.window_rect.image_node_width
		)}px`

		// other styles
		this.controls_node.style.height = `${this.window_rect.image_height}px`
		this.controls_node.style.opacity = 1
	}

	// set status controll buttons
	check_controll_buttons_state() {
		// clear modificated classes
		this.controls_node.classList.remove(
			this.options.classes.controls_prev_disabled
		)
		this.controls_node.classList.remove(
			this.options.classes.controls_next_disabled
		)

		// check and add modofocaed classes
		if (this.current_index === 0) {
			this.controls_node.classList.add(
				this.options.classes.controls_prev_disabled
			)
		} else if (this.current_index === this.length - 1) {
			this.controls_node.classList.add(
				this.options.classes.controls_next_disabled
			)
		}
	}

	// set counter value
	set_counter_value() {
		this.counter_node.innerHTML = `<div>${
			this.current_index + 1
		}<span>&nbsp;/&nbsp;${this.length}</span></div>`
	}

	// set summary
	set_summary() {
		this.content_node.style.opacity = 0

		setTimeout(() => {
			this.title_node.innerHTML = `${
				this.content_data[this.current_index].title
			}`
			this.description_node.innerHTML = `${
				this.content_data[this.current_index].description
			}`
			this.content_node.style.opacity = 1
		}, 300)
	}

	// set_modal_images_nodes
	set_modal_images_nodes() {
		this.modal_images_nodes = this.modal_node.getElementsByClassName(
			this.options.classes.image
		)
	}

	// set_init_sizes_to_images
	set_init_sizes_to_images() {
		;[...this.link_nodes].forEach((link_node, index) => {
			const data = link_node.getBoundingClientRect()

			this.modal_images_nodes[index].style.width = `${data.width}px`
		})
	}

	// set_init_position_to_images
	set_init_position_to_images() {
		;[...this.link_nodes].forEach((link_node, index) => {
			const data = link_node.getBoundingClientRect()

			this.set_position(
				this.modal_images_nodes[index],
				data.left,
				data.top
			)
		})
	}

	// set_position
	set_position(elem, x, y) {
		elem.style.transform = `translate(
			${x.toFixed(0)}px,
			${y.toFixed(0)}px)`
	}

	// close_gallery
	close_gallery() {
		this.modal_node.removeEventListener('click', this.check_click)
		window.removeEventListener('keydown', this.check_keydown)

		this.set_init_sizes_to_images()
		this.set_init_position_to_images()
		this.controls_node.style.top = `100vh`
		;[...this.modal_images_nodes].forEach(
			(modal_images_node) => (modal_images_node.style.opacity = 1)
		)

		setTimeout(() => {
			this.modal_node.classList.remove(
				this.options.classes.modal_opened
			)
			setTimeout(() => {
				enable_scroll()
			}, 200)
		}, 400)
	}
}
