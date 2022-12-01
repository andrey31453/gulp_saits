{
	const footer = document.getElementsByClassName('js__footer')[0]
	if (footer) {
		// mark active link --select class
		const all_links = footer.querySelectorAll('a')
		;[...all_links].forEach((link) => {
			if (
				link.href ==
				`https://${location.hostname}${location.pathname}`
			)
				link.classList.add('--select')
		})
	}
}
