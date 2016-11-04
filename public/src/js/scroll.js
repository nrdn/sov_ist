$(window).load(function() {

	function showslider() {
		console.log('12');
		var dc = document,
				body = document.getElementsByTagName('body')[0],
				el = function el(elem){return dc.querySelectorAll(elem)},
				slides = [];



		el('.content_scroll_item').forEach(function(item,i) {
			slides[i] = {
									 'path' : item.querySelectorAll('img')[0].getAttribute('src'),
									 'original' : item.querySelectorAll('img')[0].getAttribute('src').replace('thumb.jpg','original.jpg'),
									 'text' : item.querySelectorAll('.content_image_description')[0].textContent
									}
			item.addEventListener('click', function() {
					console.log(slides[i].text);
					var popup = document.createElement('div'),
							popupText = document.createElement('div');
							popupImage = document.createElement('div');

					popupText.textContent = slides[i].text;
					popupText.className = "slider_text";

					popupImage.style.background = 'url(' + slides[i].original + ')';
					popupImage.className = "slider_image";

					popup.className = "slider_popup";

					popupImage.append(popupText);
					popup.append(popupImage);
					body.append(popup);
				});
			});
	}







	if ($('.content_scroll_item').length > 0 && $('.content_scroll_item').length < 8) {
		while ($('.content_scroll_item').length < 12) {
			$('.content_scroll_item').clone().appendTo('.content_scroll_items');
		}
		showslider();
	}

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

	$('.column_main_inner').on('scroll', function(event) {
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