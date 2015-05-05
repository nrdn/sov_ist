$(window).load(function(){
	var parent = $('.content_scroll_items');
	var max = parent[0].scrollHeight - parent[0].offsetHeight - 20;
	var scroll_position = 0;
	var factor = 5.55555;

	parent.on('scroll', function(event) {
	    var s = $(this).scrollTop(),
	        f = $('>:first', parent),l = $('>:last', parent);
	    if(s > max) {f.appendTo(parent); parent.scrollTop(s - f.height()); }
	    if(s < 5) {l.prependTo(parent); parent.scrollTop(s + l.height()); }
	}).scrollTop(5);

	$('.main').on('scroll', function(event) {
	    var scroll = $(this).scrollTop();
	    if (scroll_position > scroll) {
	       parent.scrollTop(parent.scrollTop() - factor);
	       scroll_position = scroll;
	    } else {
	       parent.scrollTop(parent.scrollTop() + factor);
	       scroll_position = scroll;
	    }
	});
});

$(document).ready(function() {
	var $container = $('.content_outer_block');

	$container.imagesLoaded(function() {
		$container.masonry({
			columnWidth: 60,
			gutter: 20
		});
	});
});