$(window).load(function(){
	var menu_navigation = function menu_navigation() {
	 var scroll_top = $('.column_main_inner').scrollTop();

	 	console.log(scroll_top);
		 		$('.column_main_inner h4').each(function(i,elem) {

					if ($(this).offset().top < 450 && $(this).offset().top > - $(this).parent('.period_container').height() + 350) {
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
$('.column_main_inner').on('scroll', menu_navigation)
});