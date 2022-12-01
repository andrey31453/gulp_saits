// Progress Bar
{
	let progressBar = document.getElementsByClassName('progress-bar')
	window.addEventListener('scroll', function () {
		let yMax =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight
		let yOnline = window.scrollY
		progressBar[0].style.width = (100 * yOnline) / yMax + '%'
	})
}
