$(document).ready(function() {
	$('.contaniner').swingScroll({
		factor: 19.5,
		columns: '.scrolled_block',
		engine: function() {
			if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
				return 'scroll';
			else
				return 'wheel';
		}
	});
});