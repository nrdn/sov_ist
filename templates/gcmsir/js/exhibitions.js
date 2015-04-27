$(document).ready(function() {
	$( '._left._exhib._all a' ).each(function( index ) {
  	$(this).css({'background-image': 'url(' + $(this).find('img').attr('src') + ')'})
 		$(this).find('img').remove();
	});
	$('.sort_item').click(function(event) {
		$('.sort_item').removeClass('active');
		$('.moduletable._left._exhib').hide();
		var active_class = $(this).addClass('active').attr('id');
		console.log(active_class);
		$('.moduletable._left._exhib.' + active_class +'').show();
	});
});