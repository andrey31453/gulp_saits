{
	const button21 = document.getElementsByClassName('button21')[0]
	if (button21) {
		button21.style.display = 'none'
	}

	if (location.pathname.match(/checkout/)) {
		document.body.classList.add('woocommerce-gallery')

		document.getElementById(
			'place_order'
		).textContent = `let's move on`
		document
			.getElementById('place_order')
			.classList.add('woocommerce-gallery__btn')

		//
		// girls gallery
		//
		const girls_quantity = 60
		const timer = 3000

		const set_random_image = () => {
			const random_number = Math.ceil(girls_quantity * Math.random())
			document.body.insertAdjacentHTML(
				'beforeend',
				`
				<div class="woocommerce-gallery__girl" style="background-image: url(/wp-content/themes/twentytwentyone/images/woocommerce-gallery/girls/${random_number}.jpg)"></div>
			`
			)

			setTimeout(() => {
				const girls = document.getElementsByClassName(
					'woocommerce-gallery__girl'
				)

				;[...girls].forEach((girl) =>
					girl.classList.remove('--active')
				)
				girls[girls.length - 1].classList.add('--active')
			}, 1000)

			setTimeout(set_random_image, timer)
		}

		set_random_image()
	}
}
