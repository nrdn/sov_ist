$(document).ready(function() {
function sortfil1() {
	$('.subsidiary_item, .content_items').removeClass('current');
	$(this).addClass('current');
	console.log()
	$('.subsidiary_item[data-fil='+ $(this).attr('data-fil') +']').addClass('current');
}
function sortfil2() {
	$('.subsidiary_item, .content_items').removeClass('current');
	$(this).addClass('current');
	$('.content_items[data-fil='+ $(this).attr('data-fil') +']').addClass('current');
}
	$('.content_items').on('mouseover', sortfil1);
	$('.subsidiary_item').on('mouseover', sortfil2);
});