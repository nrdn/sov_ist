$(window).load(function(){
	var menu_navigation = function menu_navigation() {
	 var scroll_top = $('.column_main_inner').scrollTop();

	 	//console.log(scroll_top);
		 		$('.column_main_inner h4').each(function(i,elem) {
					if ($(this).offset().top > 100) {
						$(this).parent('.period_container').addClass('animated');
						$('.history_left_block_inner a').eq(i).addClass('active');
						$('.history_left_stripe').removeClass('red_stripe');
						console.log('нумер ' + i);
							if (i == 9) {
								console.log('313');
								$('.last_xxi').addClass('active_last');
								$('.last_xxi_per').addClass('animated_last');
							}
							else if (i < 9) {
								$('.last_xxi').removeClass('active_last');
								$('last_xxi_per').removeClass('animated_last');
							}
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
jQuery('.column_main_inner').on('scroll', menu_navigation)

	/*$('.history_left_block_inner a').click(function(event) {
		$('.container_block.left_block.scrolled_block').scrollTop(parseInt($('.column_main_inner h4:eq(' + $(this).index() + ')').offset().top) - parseInt($('.column_inner_2').offset().top) - 262);
	});*/

	$()
});