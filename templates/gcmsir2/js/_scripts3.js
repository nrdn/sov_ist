$(document).ready(function() {

	$('body').scroll(function() {
		console.log('121');
	  $( ".container_block" ).scroll().scrollTop(100);
	});

});