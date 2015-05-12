$(document).ready(function() {
	var $container = $('.content_outer_block');

	$container.masonry({
		columnWidth: 60,
		gutter: 20,
		itemSelector: '.news',
	});

	$('.fold').on('click', function() {
		$(this).data('clicked', !$(this).data('clicked'));

		if ($(this).data('clicked')) {
			$('.etc').hide();
			$('.hide').show();
		} else {
			$('.etc').show();
			$('.hide').hide();
		}
		$container.masonry('layout');
	});
});