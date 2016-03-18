$(document).ready(function() {
		function o(e) {
				console.log("++++++NEXT++++++"),
				$(this).parent().index() != $(".content_photo").length - 1 ? $(this).parent().hide().next().show() : ($(".content_photo:last-child").hide(),
				$(".content_photo:first-child").show())

		}
		function p(e) {
				console.log("++++++PREV++++++"),
				$(this).parent().index() != 0 ? $(this).parent().hide().prev().show() : ($(".content_photo:last-child").show(),
				$(".content_photo:first-child").hide())

		}
		$(".prev_arrow").on("click", p);
		$(".content_image_hover").on("click", o);
});
