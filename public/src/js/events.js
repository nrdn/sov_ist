$(document).ready(function() {
	var context = {
		type: $('.content_title').attr('class').split(' ')[1],
		categorys: [],
		subsidiarys: []
	};

	var $container = $('.content_outer_block');

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20
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


	$('.navigate_item').on('click', function() {
		var context_item = $(this).closest('.content_navigate_block').attr('class').split(' ')[1];
		var nav_item = $(this).attr('class').split(' ')[1];

		if (context[context_item].indexOf(nav_item) !== -1) context[context_item].splice(context[context_item].indexOf(nav_item), 1);
		else context[context_item].push(nav_item);

		var current_elems = document.getElementsByClassName('event');

		$.ajax({url: '/events', method: 'POST', data: {context: context, skip: 0, limit: 6}, async: false }).done(function(elems) {
			if (elems != 'out') {
				$elems = $(elems);
				$container.masonry('remove', current_elems).append($elems).masonry('appended', $elems).imagesLoaded(function() {
					$container.masonry('layout');
				});
			}
		});
	});



});