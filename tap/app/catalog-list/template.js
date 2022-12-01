{
	const cl = document.getElementsByClassName('__cl')[0]
	if (cl) {
		const item_price = cl.getElementsByClassName('__item-price')
		for (let i = 0; i < item_price.length; i++) {
			item_price[i].innerHTML = item_price[i].innerHTML.replace(
				/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
				'$1' + '&nbsp'
			)
		}
	}
}
