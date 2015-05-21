$(document).ready(function() {
	var $container = $('.content_outer_block');

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20
		});
	});

	$(document)
		.on('mouseup touchstart', function(event) {
			var $container = $('.image_preview');

			if (!$container.is(event.target)
					&& $container.has(event.target).length === 0)
			{
					$('.column_main_inner').removeClass('stop_scroll');
					$('.images_preview_block').remove();
			}
		})


		.on('click', '.exhibit', function(event) {
			var id = $(this).attr('class').split(' ')[2];
			var exhibit = exhibits.filter(function(exhibit) {
				return exhibit._id == id;
			})[0];

			var $images = exhibit.images.map(function(image) {
				return $('<img/>', { 'src': image.original, 'class': 'image_preview' });
			});

			var $preview = $('<div/>', {'class': 'images_preview_block'});

			$('.main_block').prepend($preview.append($images));
			$('.column_main_inner').addClass('stop_scroll');

		})


		.on('click', '.image_preview', function(event) {
			var length = $('.images_preview_block').children('.image_preview').length - 1;
			index = $(this).index();

			index != length
				? $(this).fadeOut(300).next().fadeIn(300)
				: $('.image_preview').fadeOut(300).eq(0).fadeIn(300);
		})

});