$(document).ready(function() {
	var $container = $('.content_outer_block');

	$container.masonry({
		columnWidth: 60,
		gutter: 20,
		itemSelector: '.news',
	});
});