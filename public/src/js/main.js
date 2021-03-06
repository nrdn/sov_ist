$(document).ready(function() {


/*$('.top_banner_counter span').eq(0).html('●');
function topSlider() {
	$('.top_banner').eq(0).appendTo('.top_banner_outer');
	$('.top_banner_counter span').eq(0).appendTo('.top_banner_counter');
}
//-var bannerSlider = setInterval(topSlider, 5000);
*/

if ($('.top_banner').length > 0) {
	var rnd = Math.floor(Math.random() * ($('.top_banner').length - 0)) + 0;
	$('.top_banner').hide().eq(rnd).show().css({'z-index':'10','opacity':'1'});
}

if ($('.middle_banner').length > 0) {
	var rnd = Math.floor(Math.random() * ($('.middle_banner').length - 0)) + 0;
	$('.middle_banner').hide().eq(rnd).show().css({'z-index':'10','opacity':'1'});
}

function overlay_remove() {
	Cookies.set('overlay_closed', 'closed', { expires: 15 });
	$('.overlay_block').remove();
}

function vk_open() {
	overlay_remove();
	window.open("https://vk.com/widget_community.php?act=a_subscribe_box&oid=-40818390&state=1","","width=400,height=350")
}
function fb_open() {
	overlay_remove();
}
function tw_open() {
	overlay_remove();
}


if (Cookies.get('overlay_closed')) {
	overlay_remove()
}
else {
	$('.overlay_block').css({'display':'block'});
}


$('.overlay_close, .overlay_close_block').on('click', overlay_remove);

$('.subscribe_vk').on('click', vk_open);
$('.subscribe_fb').on('click', fb_open);
$('.subscribe_tw').on('click', tw_open);
//- cookie block --//



	var context = {
		skip: 12,
		types: [],
		categorys: []
	};

	var $container = $('.content_outer_block');
	var $column_main = $('.column_main_inner');
	var news_stamp = document.getElementsByClassName('content_news_block')[0];

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20,
			itemSelector: '.event',
			isInitLayout: false
		}).masonry('stamp', news_stamp).masonry('layout').css('opacity', 1);

		/*if (!window.history.state || (window.history.state.types.length == 0 && window.history.state.categorys.length == 0)) {
			window.history.pushState(context, 'context');
		} else {*/
			//context = window.history.state;
			context.types.forEach(function(item) {
				$('.' + item).addClass('selected').data('clicked', true);
			});
			context.categorys.forEach(function(item) {
				$('.' + item).addClass('selected').data('clicked', true);
			});
			// getData();
		//}
	});

	function scrollLoad(event) {
		console.log('main scroll load >>>');
		var outer_offset_bottom = $container.offset().top + $container.height();
		var column_height = $column_main.height();

		if (outer_offset_bottom - column_height <= $column_main.scrollTop()) {
			$column_main.off('scroll.load').promise().done(function() {
				$.ajax({ url: '/', method: 'POST', data: {context: context, skip: context.skip, limit: 6} }).done(function(elems) {

					if (elems != 'out') {
						$elems = $(elems);
						$container.append($elems).masonry('appended', $elems).imagesLoaded(function() {
							context.skip+= 6;
							$container.masonry('layout');
							$column_main.on('scroll.load', scrollLoad);
						});
					}
				});
			});
		}
	};

	function getData() {
		console.log('main get data >>>');
		var current_elems = document.getElementsByClassName('event');

		$column_main.off('scroll.load').promise().done(function() {
			$.ajax({url: '/', method: 'POST', data: {context: context, skip: 0, limit: 12} }).done(function(elems) {
				if (elems != 'out') {
					$elems = $(elems);
					$container.masonry('remove', current_elems).append($elems).masonry('appended', $elems).imagesLoaded(function() {
						$container.masonry('layout');
						$column_main.on('scroll.load', scrollLoad);
					});
				} else {
					$container.masonry('remove', current_elems).masonry('layout');
				}
			});
		});
	}

	function clickLoader() {
		$.ajax({ url: '/', method: 'POST', data: {context: context, skip: context.skip, limit: 6} }).done(function(elems) {

			if (elems != 'out') {
				$elems = $(elems);
				$container.append($elems).masonry('appended', $elems).imagesLoaded(function() {
					context.skip+= 6;
					$container.masonry('layout');
					// $column_main.on('scroll.load', scrollLoad);
				});
			} else {
				$('.navigate_item').css({'display':'none'});
			}
		});
	}

	// $column_main.on('scroll.load', scrollLoad);
	$('.navigate_item').on('click', clickLoader);

});