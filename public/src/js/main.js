$(document).ready(function() {
	var context = [];
	var skip = 6;

	var $container = $('.content_outer_block');
	var news_stamp = document.getElementsByClassName('content_news_block')[0];

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20,
			itemSelector: '.event',
			isInitLayout: false
		}).masonry('stamp', news_stamp).masonry('layout');
	});

	var scrollLoad = function() {
		var $content_outer = $('.content_outer_block');
		var $column_main = $('.column_main_inner');

		var outer_offset_bottom = $content_outer.offset().top + $content_outer.height();
		var column_height = $column_main.height();

		if (outer_offset_bottom - column_height <= $column_main.scrollTop()) {
			var limit = skip + 5;

			$.ajax({ url: '/', method: 'POST', async: false, data: {context: context, skip: skip, limit: limit} }).done(function(elems) {

				if (elems != 'out') {
					$elems = $(elems);
					$container.append($elems).masonry('appended', $elems).imagesLoaded(function() {
						$container.masonry('layout');
					});
				} else {
					$('.column_main_inner').off('scroll');
				}

				skip+= 5;
			});

		}
	}

	$('.column_main_inner').on('scroll', scrollLoad);

	$('.navigate_item').on('click', function() {
		skip = 6;
		var type = $(this).attr('class').split(' ')[1];

		$('.column_main_inner').on('scroll', scrollLoad);

		context.indexOf(type) !== -1
			? context.splice(context.indexOf(type), 1)
			: context.push(type);

		var current_elems = document.getElementsByClassName('event');

		$.ajax({url: '/', method: 'POST', data: {context: context, skip: 0, limit: 6}, async: false }).done(function(elems) {
			if (elems != 'out') {
				$elems = $(elems);
				$container.masonry('remove', current_elems).append($elems).masonry('appended', $elems).imagesLoaded(function() {
					$container.masonry('layout');
				});
			}
		});
	});
});