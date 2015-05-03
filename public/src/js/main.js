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


	var $container = $('.content_outer_block');

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20,
			isOriginLeft: false
		});
	});

	function getItemElement() {
		var elem = document.createElement('div');
		var hRand = Math.random();
		var heightClass = hRand > 0.85 ? 'important' : hRand > 0.6 ? 'h1' : hRand > 0.35 ? 'h2' : '';
		elem.className = 'content_item event ' + heightClass;
		return elem;
	}

	$('.content_column.main').on('scroll', function() {
		var $content_outer = $('.content_outer_block');
		var $column_main = $('.content_column.main');

		var outer_offset_bottom = $content_outer.offset().top + $content_outer.height();
		var column_height = $column_main.height();

		if (outer_offset_bottom - column_height <= $column_main.scrollTop()) {
			var elems = [getItemElement(), getItemElement(), getItemElement()];
			$container.append(elems).masonry('appended', elems);
		}
	});
});