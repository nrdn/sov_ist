$(document).ready(function() {
	var w_height = $(window).height();
	var mg2 = 0;
	var mg3 = 0;
	$('.contaniner').css({'height':''+w_height+'px'});
		$('body').mousewheel(function(event, delta, deltaY, deltaX)
		{
		//$('.test2').html(delta);
		 if (delta > 0) delta = 1;
		 if (delta < 0) delta = -1;
			mg2=((mg2+Math.ceil(delta))%24);
			if(mg2<0)
				{mg2=23}
			else if (mg2>23) {
				mg2=0;
			}
		 if (delta > 0) mg3 = mg3+mg2;;
		 if (delta < 0) mg3 = mg3-mg2;;

			console.log('delta = '+delta+ 'mg2 = '+mg2+'mg3 ='+mg3);
			//$('#test1').css({'background-image':'url(images/'+img+'/a'+(mg1+10)+'.gif)'});
			//$('.taburetka').css({'background-image':'url(images/t/'+(mg2+10)+'.jpg)'});
				$('.container_block.right_block').css({'background-position':'100% '+mg3*6+ 'px'})
//.container_block.right_block


	});
});