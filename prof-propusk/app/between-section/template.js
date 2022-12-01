// between-section
{
	const bsItem = document.getElementsByClassName('between-section')
	if (bsItem) {
		const getHeight = () => {
			for (let i = 0; i < bsItem.length; i++) {
				bsItem[i].style.marginTop = `${-bsItem[i].clientHeight / 2}px`
			}
		}
		getHeight()

		window.addEventListener('load', getHeight)
	}
}
