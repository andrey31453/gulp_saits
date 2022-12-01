{
	const navbar = document.getElementsByClassName('js__navbar')[0]
	if (navbar) {
		const navbar_links = navbar.getElementsByClassName(
			'js__navbar-links'
		)[0]
		const overlay =
			document.getElementsByClassName('js__overlay-nav')[0]
		const links = navbar.getElementsByClassName('js__link')

		// close_menu
		const close_menu = () => {
			navbar_links.classList.remove('active')
			overlay.classList.add('hidden')
		}

		// listener for close menu if click in link (need then link is inner page link)
		;[...links].forEach((link) => {
			link.addEventListener('click', close_menu)
		})

		// mark active link --select class
		const all_links = navbar.querySelectorAll('a')
		;[...all_links].forEach((link) => {
			if (
				link.href ==
				`https://${location.hostname}${location.pathname}`
			)
				link.classList.add('--select')
		})
	}
}
