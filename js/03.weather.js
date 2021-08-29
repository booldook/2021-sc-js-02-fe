/**
 * url: https://openweathermap.com
 * appid: 02efdd64bdc14b279bc91d9247db4722 (꼭 본인거)
 * daily: https://api.openweathermap.org/data/2.5/weather
 * 5days: https://api.openweathermap.org/data/2.5/forecast
 * test: https://api.openweathermap.org/data/2.5/weather?appid=02efdd64bdc14b279bc91d9247db4722&units=metric&lat=37.555275&lon=126.936924
 */

/*********** global init ************/
var lat = 37.555275;
var lon = 126.936924;
var units = 'metric';
var appid = '02efdd64bdc14b279bc91d9247db4722';
var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyURL = 'https://api.openweathermap.org/data/2.5/forecast';


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

function toggleSection(page) {
	switch(page) {
		case 'HOME':
			$('.wrapper').removeClass('active');
			break;
		case 'DAILY':
			$('.wrapper').addClass('active');
			$('.daily-wrap').addClass('active');
			$('.weekly-wrap').removeClass('active');
			break;
		case 'WEEKLY':
			$('.wrapper').addClass('active');
			$('.daily-wrap').removeClass('active');
			$('.weekly-wrap').addClass('active');
			break;
	}
}

/********** event callback **********/
function onHome() {
	toggleHeader(false);
	toggleSection('HOME');
}

function onDaily() {
	toggleHeader(true);
	toggleSection('DAILY');
}

function onWeekly() {
	toggleHeader(true);
	toggleSection('WEEKLY');
}

function onGetGeo(r) { // 허용
	lat = r.coords.latitude;
	lon = r.coords.longitude;
}

function onErrorGeo(err) {	// 차단
	console.log(err);
}

/************ event init ************/
$('.bt-prev').click(onHome);
$('.bt-daily').click(onDaily);
$('.bt-weekly').click(onWeekly);


/************ start init ************/
navigator.geolocation.getCurrentPosition(onGetGeo, onErrorGeo);