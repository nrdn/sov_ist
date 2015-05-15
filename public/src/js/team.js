$(document).ready(function() {
	var $container = $('.content_outer_block');

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20
		});
	});

	$('.column_main_inner').on('scroll', function(event) {
		$('.content_scroll_items').scrollTop($(this).scrollTop())
	});




	function sortfil1() {
		$('.people_info, .content_item').removeClass('current');
		$(this).addClass('current');
		console.log($(this).attr('data-fil'));
		$('.people_info[data-fil='+ $(this).attr('data-fil') +']').addClass('current');
	}

	function sortfil2() {
		$('.people_info, .content_item').removeClass('current');
		$(this).addClass('current');
		console.log($(this).attr('data-fil'));
		$('.content_item[data-fil='+ $(this).attr('data-fil') +']').addClass('current');
	}

		$('.content_item').on('mouseover', sortfil1);
		$('.people_info').on('mouseover', sortfil2);

});