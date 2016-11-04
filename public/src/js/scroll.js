$(window).load(function() {

	function slideConrols(body, popup, popupImage, popupText, el, i, slides) {
		var cross = el('.popup_cross')[0],
				right = el('.popup_right')[0],
				left = el('.popup_left')[0],
				length = slides.length;

		console.log(cross);
		console.log('i: ' + i + ', length: ' + length);

		function selectSlide(num) {
			console.log('num: ' + num);
			popupImage.style.background = 'url(' + slides[i].original + ')';
			popupText.textContent = slides[i].text;
		}

		cross.addEventListener('click', function() {
			body.removeChild(popup);
		})

		right.addEventListener('click', function() {
			if (i < length - 1) i++
			else i = 0
			selectSlide(i);
		})

		left.addEventListener('click', function() {
			if (i > 0) i--
			else i = length - 1
			selectSlide(i);
		})

	}

	function showSlider() {
		var dc = document,
				body = document.getElementsByTagName('body')[0],
				el = function el(elem){return dc.querySelectorAll(elem)},
				slides = [];

		el('.content_scroll_item').forEach(function(item,i) {
			console.log(item);
		 	console.log(item.children.length);
			slides[i] = {
									 'path' : item.children.length >= 1 ? item.querySelectorAll('img')[0].getAttribute('src') : item.getAttribute('src'),
									 'original' : item.children.length >= 1 ? item.querySelectorAll('img')[0].getAttribute('src').replace('thumb.jpg','original.jpg') : item.getAttribute('src').replace('thumb.jpg','original.jpg'),
									 'text' : item.children.length >= 1 ? item.querySelectorAll('.content_image_description')[0].textContent : ''
									}


			item.addEventListener('click', function() {
					var popup = document.createElement('div'),
							popupText = document.createElement('div');
							popupImage = document.createElement('div');

					popup.innerHTML = '<div class="popup_control popup_cross"></div><div class="popup_control popup_right"></div><div class="popup_control popup_left"></div>';

					popupText.textContent = slides[i].text;
					popupText.className = "slider_text";

					popupImage.style.background = 'url(' + slides[i].original + ')';
					popupImage.className = "slider_image";

					popup.className = "slider_popup";

					popupImage.append(popupText);
					popup.append(popupImage);
					body.append(popup);

					slideConrols(body, popup, popupImage, popupText, el, i, slides);
					});
			});
	}



	if ($('.content_scroll_item').length > 0 && $('.content_scroll_item').length < 8) {
		while ($('.content_scroll_item').length < 12) {
			$('.content_scroll_item').clone().appendTo('.content_scroll_items');
		}
		showSlider();
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