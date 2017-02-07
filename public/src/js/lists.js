$(document).ready(function() {
	var path = $('.rm_item').attr('class').split(' ')[1].replace('rm_','');
	if (path == 'news') path = 'news'
	else path = path + 's'
	function remove (event) {
		var id  = $(this).attr('id');

		if (confirm(event.data.description)) {
			$.post(event.data.path, {'id': id}).done(function() {
				location.reload();
			});
		}
	}
	$('.rm_item').on('click', {path:'/auth/' + path + '/remove', description: 'Удалить?'}, remove)
});