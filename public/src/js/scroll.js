$(window).load(function() {

	function slideConrols(body, popup, el, i, length) {
		var cross = el('.popup_cross')[0],
				right = el('.popup_right')[0],
				left = el('.popup_left')[0];

		console.log(cross);
		console.log('i: ' + i + ', length: ' + length);

		cross.addEventListener('click', function() {
			console.log('22');
			body.removeChild(popup);
		})
	}

	function showSlider() {
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
					var popup = document.createElement('div'),
							popupText = document.createElement('div');
							popupImage = document.createElement('div');

					popup.innerHTML = '<div class="popup_control popup_cross">✕</div><div class="popup_control popup_right">&gt;</div><div class="popup_control popup_left">&lt;</div>';

					popupText.textContent = slides[i].text;
					popupText.className = "slider_text";

					popupImage.style.background = 'url(' + slides[i].original + ')';
					popupImage.className = "slider_image";

					popup.className = "slider_popup";

					popupImage.append(popupText);
					popup.append(popupImage);
					body.append(popup);

					slideConrols(body, popup, el, i, slides.length);

				});
			});
	}



/*


		window.onload = function (argument) {
			var
				dc = document,
				container = dc.getElementsByClassName('container')[0],
				container_images = container.getElementsByTagName('img'),
				images_length = container_images.length,
				i = 0;

			container_images[0].style.display = 'block';
			dc.onkeydown = checkKey;
			function checkKey(e) {
					(function() {
						var i = images_length;
							while (i--) {
									container_images[i].setAttribute("style", "display:none;");
							}
					})();

				e = e || window.event;
				if (e.keyCode == '39') i < images_length - 1 ? i++ : i = 0
				else if (e.keyCode == '37')  i > 0 ? i-- : i = images_length - 1
				container_images[i].style.display = 'block'
			}
		}


*/





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