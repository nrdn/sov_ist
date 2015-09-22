$(document).ready(function() {
		$('.column_main_inner').on('scroll', function(event) {
			var scrollVal = $(this).scrollTop();
			console.log(scrollVal);
			if (scrollVal > 150) {
				$('.subsidiary_menu').addClass('fixed');
			}
			else {
				$('.subsidiary_menu').removeClass('fixed');
			}
		})
});