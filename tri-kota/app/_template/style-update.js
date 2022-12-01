{
	const body = document.querySelector('body')
	const styleUpdate = () => {
		body.insertAdjacentHTML(
			'beforeend',
			`
		<style>
			*, ::after, ::before {
				-webkit-transition:
								width 300ms linear,
								max-width 300ms linear,
								height 300ms linear,
								max-height 300ms linear,
								color 300ms linear,
								border 300ms linear,
								box-shadow 300ms linear,
								background 300ms linear,
								margin 300ms linear,
								padding 300ms linear,
								transform 300ms linear,
								opacity 300ms linear,
								left 300ms linear,
								top 300ms linear,
								bottom 300ms linear,
								right 300ms linear,
								z-index 300ms linear,
								fill 300ms linear;
				-moz-transition:
								width 300ms linear,
								max-width 300ms linear,
								height 300ms linear,
								max-height 300ms linear,
								color 300ms linear,
								border 300ms linear,
								box-shadow 300ms linear,
								background 300ms linear,
								margin 300ms linear,
								padding 300ms linear,
								transform 300ms linear,
								opacity 300ms linear,
								left 300ms linear,
								top 300ms linear,
								bottom 300ms linear,
								right 300ms linear,
								z-index 300ms linear,
								fill 300ms linear;
				-o-transition:
								width 300ms linear,
								max-width 300ms linear,
								height 300ms linear,
								max-height 300ms linear,
								color 300ms linear,
								border 300ms linear,
								box-shadow 300ms linear,
								background 300ms linear,
								margin 300ms linear,
								padding 300ms linear,
								transform 300ms linear,
								opacity 300ms linear,
								left 300ms linear,
								top 300ms linear,
								bottom 300ms linear,
								right 300ms linear,
								z-index 300ms linear,
								fill 300ms linear;
				-ms-transition:
								width 300ms linear,
								max-width 300ms linear,
								height 300ms linear,
								max-height 300ms linear,
								color 300ms linear,
								border 300ms linear,
								box-shadow 300ms linear,
								background 300ms linear,
								margin 300ms linear,
								padding 300ms linear,
								transform 300ms linear,
								opacity 300ms linear,
								left 300ms linear,
								top 300ms linear,
								bottom 300ms linear,
								right 300ms linear,
								z-index 300ms linear,
								fill 300ms linear;
				transition: width 300ms linear,
								max-width 300ms linear,
								height 300ms linear,
								max-height 300ms linear,
								color 300ms linear,
								border 300ms linear,
								box-shadow 300ms linear,
								background 300ms linear,
								margin 300ms linear,
								padding 300ms linear,
								transform 300ms linear,
								opacity 300ms linear,
								left 300ms linear,
								top 300ms linear,
								bottom 300ms linear,
								right 300ms linear,
								z-index 300ms linear,
								fill 300ms linear;
			}
		</style>
	`
		)
	}
	window.addEventListener('load', styleUpdate)
}
