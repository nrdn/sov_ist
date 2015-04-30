$(document).ready(function() {
	$('.content_columns_block').swingScroll({
		factor: 3.5,
		engine: 'scroll'
		// engine: function() {
		// 	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		// 		return 'scroll';
		// 	else
		// 		return 'wheel';
		// }
	});
});