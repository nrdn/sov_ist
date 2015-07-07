$(document).ready(function(){
	$('.content_scroll_items').each(function(){
		var $scroll_cont = $(this);
		var $scroll_inn = $scroll_cont.children('.content_scroll_item');
		$scroll_inn.sort(function(a,b){
			var temp = parseInt( Math.random()*10 );
			var isOddOrEven = temp%2;
			var isPosOrNeg = temp>5 ? 1 : -1;
			return( isOddOrEven*isPosOrNeg );
		})
		.appendTo($scroll_cont);
	});
});