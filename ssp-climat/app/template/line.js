{
	const cart_btn = document.getElementsByClassName('js__cart-btn')
	if (cart_btn) {
		const del_other_btn_style = (el) => {
			const btns = el
				.closest('.buy-btn-wrapper')
				.getElementsByClassName('js__cart-btn')
			console.log(btns)
			;[...btns].forEach((elem) => {
				if (elem !== event.target) {
					elem.removeAttribute('style')
				} else {
					elem.setAttribute('style', 'display: none')
				}
			})
		}

		;[...cart_btn].forEach((elem) =>
			elem.addEventListener('click', () => {
				del_other_btn_style(elem)
			})
		)
	}
}
