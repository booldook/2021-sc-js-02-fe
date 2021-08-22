/**
 * url: https://openweathermap.com
 * appid: 02efdd64bdc14b279bc91d9247db4722 (꼭 본인거)
 * daily: https://api.openweathermap.org/data/2.5/weather
 * 5days: https://api.openweathermap.org/data/2.5/forecast
 * test: https://api.openweathermap.org/data/2.5/weather?appid=02efdd64bdc14b279bc91d9247db4722&units=metric&lat=37.555275&lon=126.936924
 */

/*********** global init ************/


/********** function init ***********/
function toggleHeader(isShow) {
	if(isShow) {
		$('.header-wrapper').addClass('active');
		$('.footer-wrapper').addClass('active');
	}
	else {
		$('.header-wrapper').removeClass('active');
		$('.footer-wrapper').removeClass('active');
	}
}

/********** event callback **********/
function onHome() {
	console.log('hi')
	$('.wrapper').css('transform', 'translateX(0)');
	toggleHeader(false);
}

function onDaily() {
	$('.wrapper').css('transform', 'translateX(-50%)');
	$('.daily-wrap').css('display', 'flex');
	$('.weekly-wrap').css('display', 'none');
	toggleHeader(true);
}

function onWeekly() {
	$('.wrapper').css('transform', 'translateX(-50%)');
	$('.daily-wrap').css('display', 'none');
	$('.weekly-wrap').css('display', 'flex');
	toggleHeader(true);
}

/************ event init ************/
$('.bt-prev').click(onHome);
$('.bt-daily').click(onDaily);
$('.bt-weekly').click(onWeekly);