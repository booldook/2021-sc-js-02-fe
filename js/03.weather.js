/**
 * url: https://openweathermap.com
 * appid: 02efdd64bdc14b279bc91d9247db4722 (꼭 본인거)
 * daily: https://api.openweathermap.org/data/2.5/weather
 * 5days: https://api.openweathermap.org/data/2.5/forecast
 * test: https://api.openweathermap.org/data/2.5/weather?appid=02efdd64bdc14b279bc91d9247db4722&units=metric&lat=37.555275&lon=126.936924
 * icon url: http://openweathermap.org/img/wn/10d@2x.png
 */

/*********** global init ************/
var lat = 37.555275;
var lon = 126.936924;
var units = 'metric';
var lang = 'kr';
var appid = '02efdd64bdc14b279bc91d9247db4722';
var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyURL = 'https://api.openweathermap.org/data/2.5/forecast';
var params = { appid: appid, units: units, lat: lat, lon: lon, lang: lang };
var icons = ['http://openweathermap.org/img/wn/', '10d', '@2x.png'];


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

function getList(v) {
	var html = '';
	html += '<li class="list">';
	html += '	<div class="img-wp">';
	html += '		<img src="'+icons[0]+v.weather[0].icon+icons[2]+'" alt="icon" class="w100 img">';
	html += '	</div>';
	html += '	<div class="info-wp">';
	html += '		<div class="temps">';
	html += '			<span class="temp">'+v.main.temp+'</span>℃';
	html += '			(min: <span class="min">'+v.main.temp_min+'</span>℃ / max: <span class="max">'+v.main.temp_max+'</span>℃)';
	html += '		</div>';
	html += '		<div class="infos">';
	html += '			<span class="main">'+v.weather[0].main+'</span>';
	html += '			(<span class="desc">'+v.weather[0].description+'</span>)';
	html += '		</div>';
	html += '		<div class="dts">';
	html += '			<span class="dt">'+moment(v.dt*1000).format('M월 D일 H시')+'</span> 예보';
	html += '		</div>';
	html += '	</div>';
	html += '</li>';
	return html;
}

/********** event callback **********/
function onHome() {
	toggleHeader(false);
	toggleSection('HOME');
}

function onDaily() {
	toggleHeader(true);
	toggleSection('DAILY');
	axios.get(dailyURL, { params: params }).then(onGetDaily).catch(onGetError);
}

function onWeekly() {
	toggleHeader(true);
	toggleSection('WEEKLY');
	axios.get(weeklyURL, { params: params }).then(onGetWeekly).catch(onGetError);
}

function onGetGeo(r) { // 허용
	params.lat = r.coords.latitude;
	params.lon = r.coords.longitude;
}

function onErrorGeo(err) {	// 차단
	console.log(err);
}

function onGetDaily(r) {
	console.log(r.data);
	var w = $('.daily-wrap');
	var v = r.data;
	w.find('.city').text(v.name);
	w.find('.country').text(v.sys.country);
	w.find('.dt').text( moment(v.dt*1000).format('M월 D일 H시 m분') );
	w.find('.icon').attr('src', icons[0] + v.weather[0].icon + icons[2]);
	w.find('.icon').attr('src', icons[0] + v.weather[0].icon + icons[2]);
	w.find('.temp').text(v.main.temp);
	w.find('.min').text(v.main.temp_min);
	w.find('.max').text(v.main.temp_max);
	w.find('.main').text(v.weather[0].main);
	w.find('.desc').text(v.weather[0].description);
}

function onGetWeekly(r) {
	console.log(r.data);
	var w = $('.weekly-wrap');
	var v = r.data;
	w.find('.city').text(v.city.name);
	w.find('.country').text(v.city.country);
	for(var i in v.list) {
		w.find('.list-wp').append(getList(v.list[i]));
	}
}

function onGetError(err) {
	console.log(err);
}
/************ event init ************/
$('.bt-prev').click(onHome);
$('.bt-daily').click(onDaily);
$('.bt-weekly').click(onWeekly);


/************ start init ************/
navigator.geolocation.getCurrentPosition(onGetGeo, onErrorGeo);