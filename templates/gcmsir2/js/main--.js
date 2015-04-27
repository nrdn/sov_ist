$(document).ready(function() {
	var $columns = $('.container_block');

	$.fn.scrollStopped = function(callback) {
		$(this).on('scroll', function() {
			var self = this, $this = $(self);

			$this.data('scrollTimeout')
				&& clearTimeout($this.data('scrollTimeout'));

			$this.data('scrollTimeout', setTimeout(callback, 250, self));
		});
	};

	var scrollColumns = function(event) {
		var $this = $(this);
		var $columnsCheck = $columns.not(this);

		$columnsCheck.off('scroll.col');

		var current_height = $this.height();
		var current_inner_height = $this.children('.column_inner').height();
		var scroll_percentage = $this.scrollTop() / (current_inner_height - current_height) * 300;

		$columnsCheck.each(function() {
			var $this = $(this);
			var check_height = $this.height();
			var check_inner_height = $this.children('.column_inner').height();
			$this.scrollTop(scroll_percentage * (check_inner_height - check_height) / 300);
		});
	};

	$columns
		.each(function() {
			var column_inner = $('<div/>', {'class': 'column_inner'});
			$(this).children().wrapAll(column_inner);
		})
		.on('scroll.col', scrollColumns)
		.scrollStopped(function() {
			$columns.on('scroll.col', scrollColumns);
		});

});