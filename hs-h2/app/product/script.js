{
	const product = document.getElementsByClassName('js__product')[0]
	if (product) {
		// doms
		const mini_images_cont =
			product.getElementsByClassName('js__mini-images')[0]
		const images_cont =
			product.getElementsByClassName('js__images')[0]

		// vars
		const folder_name = product.dataset.folderName
		const quantity = product.dataset.quantity

		let mini_images
		let images
		let active_number = 0

		//
		// functions
		//

		// add_mini_images
		const add_mini_images = () => {
			for (let i = 0; i < quantity; i++) {
				mini_images_cont.insertAdjacentHTML(
					'beforeend',
					`
						<img class="product__mini-image js__mini-image" src="/images/product/images/${folder_name}/mini/${
						i + 1
					}.jpg">
					`
				)
			}
		}

		// add_images
		const add_images = () => {
			for (let i = 0; i < quantity; i++) {
				images_cont.insertAdjacentHTML(
					'beforeend',
					`
					<img class="product__image js__image" src="/images/product/images/${folder_name}/full/${
						i + 1
					}.jpg">
					`
				)
			}
		}

		// init_gallery
		const init_gallery = () => {
			add_mini_images()
			add_images()
		}

		// node_definition
		const node_definition = () => {
			mini_images = product.getElementsByClassName('js__mini-image')
			images = product.getElementsByClassName('js__image')
		}

		// change_active_image
		const change_active_image = () => {
			for (let i = 0; i < quantity; i++) {
				if (i == active_number) {
					mini_images[i].classList.add('--active')
					images[i].classList.add('--active')
				} else {
					mini_images[i].classList.remove('--active')
					images[i].classList.remove('--active')
				}
			}

			set_images_cont_sizes()
		}

		// set_images_cont_sizes
		const set_images_cont_sizes = () => {
			const height = images[active_number].clientHeight
			images_cont.style.minHeight = `${height + 2 * image_padding}px`
		}

		// add_listener
		const add_listener = () => {
			for (let i = 0; i < quantity; i++) {
				mini_images[i].addEventListener('click', () => {
					active_number = i
					change_active_image()
				})
			}
		}

		// init
		init_gallery()
		node_definition()
		change_active_image()
		add_listener()

		// listener
		set_images_cont_sizes()
		window.addEventListener('DOMContentLoaded', set_images_cont_sizes)
		window.addEventListener('load', set_images_cont_sizes)
		window.addEventListener('resize', set_images_cont_sizes)
	}
}
