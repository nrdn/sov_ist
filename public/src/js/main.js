$(document).ready(function() {
	$('.content_columns_block').swingScroll({
		factor: 3.5,
		engine: 'scroll'
		// engine: function() {
		// 	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		// 		return 'scroll';
		// 	else
		// 		return 'wheel';
		// }
	});

	$('.option.search').on('click', function(event) {
		$('.search_block').toggle().find('.search_input').focus();
	});

	$(document).on('mouseup', function(event) {
		var container = $('.search_block');

		!container.is(event.target
			&& container.has(event.target).length === 0)
				&& container.hide();

	});
});