// default_options
const default_options = {
	params: {
		min_width: 1000, // min modal window width
		min_height: 750, // min modal window height
		padding: 32, // modal window padding
		showing_count: 4, // modal window showing images
	},
	node: {
		link: 'ge__card-link',
		image: 'ge__card-image',
	},
	classes: {
		// modal
		modal: 'gallery--explosion__modal',
		modal_opened: 'gallery--explosion__modal--opened',
		modal_opening: 'gallery--explosion__modal--opening',

		// controls
		controls: 'gem__controls',

		controls_prev_disabled: 'gem__controls--prev-disabled',
		controls_next_disabled: 'gem__controls--next-disabled',

		// navs
		navs: 'gem__navs',

		nav: 'gem__nav',
		nav_close: 'gem__nav--close',
		nav_prev: 'gem__nav--prev',
		nav_counter: 'gem__nav--counter',
		nav_next: 'gem__nav--next',

		// summary
		summary: 'gem__summary',
		summary_content: 'gem__summary-content',
		summary_title: 'gem__summary-title',
		summary_description: 'gem__summary-description',

		// images
		images: 'gem__images',
		image: 'gem__image',

		// clickable
		clickable: 'js__clickable',
	},
}
