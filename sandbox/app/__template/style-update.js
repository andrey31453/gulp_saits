{
	const body = document.querySelector('body')
	const styleUpdate = () => {
		body.insertAdjacentHTML(
			'beforeend',
			`
		<style>
			*, ::after, ::before {
				-webkit-transition:
								width 400ms linear,
								max-width 400ms linear,
								height 400ms linear,
								max-height 400ms linear,
								color 400ms linear,
								border 400ms linear,
								box-shadow 400ms linear,
								background 400ms linear,
								margin 400ms linear,
								padding 400ms linear,
								transform 400ms linear,
								opacity 400ms linear,
								left 400ms linear,
								top 400ms linear,
								bottom 400ms linear,
								right 400ms linear,
								z-index 400ms linear,
								fill 400ms linear;
				-moz-transition:
								width 400ms linear,
								max-width 400ms linear,
								height 400ms linear,
								max-height 400ms linear,
								color 400ms linear,
								border 400ms linear,
								box-shadow 400ms linear,
								background 400ms linear,
								margin 400ms linear,
								padding 400ms linear,
								transform 400ms linear,
								opacity 400ms linear,
								left 400ms linear,
								top 400ms linear,
								bottom 400ms linear,
								right 400ms linear,
								z-index 400ms linear,
								fill 400ms linear;
				-o-transition:
								width 400ms linear,
								max-width 400ms linear,
								height 400ms linear,
								max-height 400ms linear,
								color 400ms linear,
								border 400ms linear,
								box-shadow 400ms linear,
								background 400ms linear,
								margin 400ms linear,
								padding 400ms linear,
								transform 400ms linear,
								opacity 400ms linear,
								left 400ms linear,
								top 400ms linear,
								bottom 400ms linear,
								right 400ms linear,
								z-index 400ms linear,
								fill 400ms linear;
				-ms-transition:
								width 400ms linear,
								max-width 400ms linear,
								height 400ms linear,
								max-height 400ms linear,
								color 400ms linear,
								border 400ms linear,
								box-shadow 400ms linear,
								background 400ms linear,
								margin 400ms linear,
								padding 400ms linear,
								transform 400ms linear,
								opacity 400ms linear,
								left 400ms linear,
								top 400ms linear,
								bottom 400ms linear,
								right 400ms linear,
								z-index 400ms linear,
								fill 400ms linear;
				transition: width 400ms linear,
								max-width 400ms linear,
								height 400ms linear,
								max-height 400ms linear,
								color 400ms linear,
								border 400ms linear,
								box-shadow 400ms linear,
								background 400ms linear,
								margin 400ms linear,
								padding 400ms linear,
								transform 400ms linear,
								opacity 400ms linear,
								left 400ms linear,
								top 400ms linear,
								bottom 400ms linear,
								right 400ms linear,
								z-index 400ms linear,
								fill 400ms linear;
			}
		</style>
	`
		)
	}
	window.addEventListener('load', styleUpdate)
}
