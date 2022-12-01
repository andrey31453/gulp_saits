// go-top__quadr
;(function () {
	let $upButton = $('.go-top')
	$(window).on('ready scroll', function (event) {
		let curScrollValueY = event.currentTarget.scrollY
			? event.currentTarget.scrollY
			: $(window).scrollTop()
		if (curScrollValueY > 600) {
			$upButton.addClass('__active')
		} else {
			$upButton.removeClass('__active')
		}
	})

	$upButton.on('click', function (event) {
		$('html,body').animate(
			{
				scrollTop: 0,
			},
			1000
		)

		return event.preventDefault()
	})
})
