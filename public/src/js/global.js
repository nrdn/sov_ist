$(document).ready(function() {
	var search = {
		val: '', buf: '',
		checkResult: function() {
			if (this.buf != this.val) {
				this.buf = this.val;
				this.getResult.call(search, this.val);
			}
		},
		getResult: function (result) {
			$.post('/search', {search: result}).done(function(data) {
				$('.search_context').hide().children('.context_results_block').empty();

				data.exhibits.forEach(function(exhibit) {
					var context_result = $('<a/>', {'class': 'context_result', 'href': '/exhibits/' + exhibit._id, 'text': exhibit.title[0].value});
					$('.search_context.exhibits').show().children('.context_results_block').append(context_result);
				});

				data.events.forEach(function(event) {
					var context_result = $('<a/>', {'class': 'context_result', 'href': '/events/' + event._id, 'text': event.title[0].value});
					$('.search_context.events').show().children('.context_results_block').append(context_result);
				});
			});
		}
	};

	$('.search_input')
	.on('keyup change', function(event) {
		search.val = $(this).val();
	})
	.on('focusin', function(event) {
		search.interval = setInterval(function() {
			search.checkResult.call(search);
		}, 1000);
	})
	.on('focusout', function(event) {
		clearInterval(search.interval);
	});


	$('.option.search').on('click', function(event) {
		$('.search_block').toggle().find('.search_input').focus();
	});

	$(document).on('mouseup', function(event) {
		var container = $('.search_block');

		if (!container.is(event.target)
				&& container.has(event.target).length === 0)
		{
				container.hide();
		}
	});
});