$(document).ready(function() {

var menu_navigation = function menu_navigation() {
	//console.log('ty');
	 var scroll_top = $('.container_block.left_block.scrolled_block').scrollTop();

	 	console.log(scroll_top);
	 		//console.log(scroll_top);

		 		$('.itemFullText h4').each(function(i,elem) {
					if ($(this).offset().top > 0) {
						$(this).parent('.period_container').addClass('animated');
						$('.history_left_block_inner a').eq(i).addClass('active');
						$('.history_left_stripe').removeClass('red_stripe');
					return false;
					}

					else {
						$('.period_container').removeClass('animated');
						$('.history_left_block_inner a').removeClass('active');
						$('.history_left_stripe').addClass('red_stripe');
					}
			});
		}
		menu_navigation();
jQuery('.container_block.left_block.scrolled_block').on('scroll', menu_navigation)

	$('.history_left_block_inner a').click(function(event) {
		//console.log($(this).index());
		//console.log('Номер: ' + $(this).index() + ',' + (parseInt($('.itemFullText h4:eq(' + $(this).index() + ')').offset().top) - parseInt($('.column_inner_2').offset().top)));
		$('.container_block.left_block.scrolled_block').scrollTop(parseInt($('.itemFullText h4:eq(' + $(this).index() + ')').offset().top) - parseInt($('.column_inner_2').offset().top) - 262);
	});
});