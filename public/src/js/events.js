$(document).ready(function() {
	$('.content_columns_block').swingScroll({
		factor: 3.5,
		engine: 'scroll'
	});

	var $container = $('.content_outer_block').masonry({
		columnWidth: 60,
		gutter: 20
	});
});