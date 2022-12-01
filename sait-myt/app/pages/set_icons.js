{
	const pages = document.getElementsByClassName('js__page')
	if (pages) {
		const set_icons = (page) => {
			const icons = page.getElementsByClassName('js__check-icon')

			;[...icons].forEach((icon) => {
				icon.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 21000"><path d="M18753 20995H2253C1010 20995 3 19988 3 18745V2245C3 1002 1010-5 2253-5h16500c1243 0 2250 1007 2250 2250v16500c0 1243-1007 2250-2250 2250zm-9595-4597l8625-8625c293-293 293-768 0-1061l-1061-1061c-293-293-768-293-1061 0l-7034 7034-3284-3284c-293-293-768-293-1061 0l-1061 1061c-293 293-293 768 0 1061l4875 4875c293 293 768 293 1061 0z"></svg>
				`
			})
		}

		;[...pages].forEach((page) => set_icons(page))
	}
}
