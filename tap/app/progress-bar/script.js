// Progress Bar
{
	const progressBar =
		document.getElementsByClassName('progress-bar')[0]
	if (progressBar) {
		window.addEventListener('scroll', function () {
			const yMax =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight
			const yOnline = window.scrollY
			progressBar.style.width = (100 * yOnline) / yMax + '%'
		})
	}
}
