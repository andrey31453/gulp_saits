{
	const body = document.querySelector('body')
	const styleUpdate = () => {
		body.insertAdjacentHTML(
			'beforeend',
			`
		<style>
			*, ::after, ::before {
				-webkit-transition:
								width 120ms linear,
								max-width 120ms linear,
								height 120ms linear,
								max-height 120ms linear,
								color 120ms linear,
								border 120ms linear,
								box-shadow 120ms linear,
								background 120ms linear,
								margin 120ms linear,
								padding 120ms linear,
								transform 120ms linear,
								opacity 120ms linear,
								left 120ms linear,
								top 120ms linear,
								bottom 120ms linear,
								right 120ms linear,
								z-index 120ms linear,
								fill 120ms linear;
				-moz-transition:
								width 120ms linear,
								max-width 120ms linear,
								height 120ms linear,
								max-height 120ms linear,
								color 120ms linear,
								border 120ms linear,
								box-shadow 120ms linear,
								background 120ms linear,
								margin 120ms linear,
								padding 120ms linear,
								transform 120ms linear,
								opacity 120ms linear,
								left 120ms linear,
								top 120ms linear,
								bottom 120ms linear,
								right 120ms linear,
								z-index 120ms linear,
								fill 120ms linear;
				-o-transition:
								width 120ms linear,
								max-width 120ms linear,
								height 120ms linear,
								max-height 120ms linear,
								color 120ms linear,
								border 120ms linear,
								box-shadow 120ms linear,
								background 120ms linear,
								margin 120ms linear,
								padding 120ms linear,
								transform 120ms linear,
								opacity 120ms linear,
								left 120ms linear,
								top 120ms linear,
								bottom 120ms linear,
								right 120ms linear,
								z-index 120ms linear,
								fill 120ms linear;
				-ms-transition:
								width 120ms linear,
								max-width 120ms linear,
								height 120ms linear,
								max-height 120ms linear,
								color 120ms linear,
								border 120ms linear,
								box-shadow 120ms linear,
								background 120ms linear,
								margin 120ms linear,
								padding 120ms linear,
								transform 120ms linear,
								opacity 120ms linear,
								left 120ms linear,
								top 120ms linear,
								bottom 120ms linear,
								right 120ms linear,
								z-index 120ms linear,
								fill 120ms linear;
				transition: width 120ms linear,
								max-width 120ms linear,
								height 120ms linear,
								max-height 120ms linear,
								color 120ms linear,
								border 120ms linear,
								box-shadow 120ms linear,
								background 120ms linear,
								margin 120ms linear,
								padding 120ms linear,
								transform 120ms linear,
								opacity 120ms linear,
								left 120ms linear,
								top 120ms linear,
								bottom 120ms linear,
								right 120ms linear,
								z-index 120ms linear,
								fill 120ms linear;
			}
		</style>
	`
		)
	}
	window.addEventListener('load', styleUpdate)
}
