$(window).load(function(){
	var parent = $('.scroll');
	var max = parent[0].scrollHeight - parent[0].offsetHeight - 20;
	var scroll_position = 0;
	var factor = 5.555;

	parent.on('scroll', function(event) {
	    var s = $(this).scrollTop(),
	        f = $('>:first', parent),l = $('>:last', parent);
	    if(s > max) {f.appendTo(parent); parent.scrollTop(s - f.height())}
	    if(s < 5) {l.prependTo(parent);parent.scrollTop(s + l.height()) }
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
			gutter: 20,
			isOriginLeft: false
		});
	});

	function getItemElement() {
		var elem = document.createElement('div');
		var hRand = Math.random();
		var heightClass = hRand > 0.85 ? 'important' : hRand > 0.6 ? 'h1' : hRand > 0.35 ? 'h2' : '';
		elem.className = 'content_item event ' + heightClass;
		return elem;
	}

	$('.content_column.main').on('scroll', function() {
		var $content_outer = $('.content_outer_block');
		var $column_main = $('.content_column.main');

		var outer_offset_bottom = $content_outer.offset().top + $content_outer.height();
		var column_height = $column_main.height();

		if (outer_offset_bottom - column_height <= $column_main.scrollTop()) {
			var elems = [getItemElement(), getItemElement(), getItemElement()];
			$container.append(elems).masonry('appended', elems);
		}
	});
});