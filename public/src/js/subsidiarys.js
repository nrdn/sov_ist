$(document).ready(function() {
	$('.content_map_item').hover(
  function() {
    $('.content_item').eq($(this).parents('a').index()).addClass('current');
  }, function() {
    $('.content_item').removeClass('current');
  }
);

$('.content_item').hover(
  function() {
    $('.content_map_block a').eq($(this).index()).find('.content_map_item').addClass('current');
  }, function() {
    $('.content_map_item').removeClass('current');
  }
);
});