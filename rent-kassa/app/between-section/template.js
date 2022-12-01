// between-section
{
	const bs_s = document.getElementsByClassName('js__bs')
	if (bs_s) {
		// add bs__prev-line in item.previousSibling
		const previous_sibling_update = () => {
			;[...bs_s].forEach((item) => {
				item.previousSibling.classList.add('bs__prev-section')
			})
		}
		previous_sibling_update()

		// bs_s style update
		const add_margin_top = () => {
			;[...bs_s].forEach((item) => {
				const heading =
					document.getElementsByClassName('js__heading')[0]
				item.style.marginTop = `${-Math.round(
					heading.clientHeight
				)}px`
			})
		}

		// listener for load and resize
		window.addEventListener('DOMContentLoaded', add_margin_top)
		window.addEventListener('resize', add_margin_top)
	}
}
