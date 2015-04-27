jQuery(document).ready(function() {
var menu_navigation = function menu_navigation() {
	 var scroll_top = jQuery(document).scrollTop();
	 		//console.log(scroll_top);
			if (scroll_top > 120) {
					jQuery('.main.menu').addClass('fixedTopMenuDiv');
					jQuery('body').addClass('scrolledPage');
				} else {
					jQuery('.main.menu').removeClass('fixedTopMenuDiv');
					jQuery('body').removeClass('scrolledPage');
				}
			}
		menu_navigation();

jQuery(document).on('scroll', menu_navigation)



	var n_sel;
	var d_sel;
	jQuery('.day').click(function() {
			jQuery('.date h2').show();
			jQuery('.k2ItemsBlock').show();
			jQuery('.date').hide();
			jQuery('.day, .type').removeClass('active');
			n_sel = jQuery(this).attr('id');
			jQuery(this).addClass('active');
			jQuery('.'+ n_sel + '').show();
	});
	jQuery('.type').click(function() {
			jQuery('.date h2').hide();
			jQuery('.date').show();
			jQuery('.k2ItemsBlock').hide();
			jQuery('.type, .day').removeClass('active');
			d_sel = jQuery(this).attr('id');
			jQuery(this).addClass('active');
			jQuery('.'+ d_sel + '').show();
			jQuery('.'+ d_sel + '').parents('.date').find('h2').show();
	});
	jQuery('.type2').click(function() {
			jQuery('.date h2').show();
			jQuery('.date').show();
			jQuery('.k2ItemsBlock').show();
	});
});