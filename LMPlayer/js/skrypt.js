$(function(){
	var mediaPlayer;
	var playButton;
	var progressBar;
	var currentTimeText;
	var durationTimeText;
	var muteBtn;
	var volumeSlider;
	var fullScreenBtn;
	var vol;
	var cog;
	var settings;
	var settingsShow = false;
	var filterVideo;

	window.onload = initializePlayer;

	function initializePlayer(){
		mediaPlayer = document.getElementById('lmplayer');
		progressBar = document.getElementById('progress');
		currentTimeText = document.getElementById('currentTimeText');
		durationTimeText = document.getElementById('durationTimeText');
		muteBtn = document.getElementById('mute');
		volumeSlider = document.getElementById('volumeSlider');
		fullScreenBtn = document.getElementById('fullScreen');
		pasekSzczescia = document.getElementById('pasekSzczescia');
		filterVideo = document.getElementById('filter');
		vol = 100;
		volumeSlider.value = vol;
		updateProgressBar();
		playButton = document.getElementById('play');
		settings = document.getElementById('settings');
		cog = document.getElementById('cog');
		settings.style.visibility = "hidden";
		cog.addEventListener('click', settingsToggle, false);
		playButton.addEventListener('click', playPause, false);
		progressBar.addEventListener('change', progress, false);
		volumeSlider.addEventListener('change', volumeChange, false);
		mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
		muteBtn.addEventListener('click', mute, false);
		fullScreenBtn.addEventListener('click', fullScreenToggle, false);
		filterVideo.addEventListener('change', changeVideoFilter, false);
		mediaPlayer.controls = false;

	}

	function playPause() {
		if(mediaPlayer.paused) {
			mediaPlayer.play();
			$('#play').removeClass('icon-play').addClass('icon-pause');
		} else {
			mediaPlayer.pause();
			$('#play').removeClass('icon-pause').addClass('icon-play');
		}
	}

	function progress() {
		var seekTo = mediaPlayer.duration * (progressBar.value / 100);
		mediaPlayer.currentTime = seekTo;
		
	}

	function updateProgressBar() {
		var nt = mediaPlayer.currentTime * (100/mediaPlayer.duration);
		progressBar.value = nt;
		var cMins = Math.floor(mediaPlayer.currentTime/60);
		var cSec = Math.floor(mediaPlayer.currentTime - cMins/60);
		var dMins = Math.floor(mediaPlayer.duration/60);
		var dSec = Math.floor(mediaPlayer.duration - dMins/60);
		if(cSec<10)	cSec = '0'+cSec;
		if(dSec<10)	dSec = '0'+dSec;
		currentTimeText.innerHTML = cMins+':'+cSec;
		durationTimeText.innerHTML = dMins+':'+dSec;
		if(mediaPlayer.currentTime>=mediaPlayer.duration) {
			$('#play').removeClass('icon-pause').addClass('icon-play');
		}
	}

	function mute(){
		if(mediaPlayer.muted) {
			mediaPlayer.muted = false;
			$('#mute').removeClass('icon-volume-off').removeClass('icon-volume-down').addClass('icon-volume-up');
			volumeSlider.value = 100;
		} else {
			mediaPlayer.muted = true;
			$('#mute').removeClass('icon-volume-up').removeClass('icon-volume-down').addClass('icon-volume-off');
			volumeSlider.value = 0;
		}
	}

	function volumeChange(){
		mediaPlayer.volume = volumeSlider.value/100;
		if (mediaPlayer.volume < 0.1) {
			$('#mute').removeClass('icon-volume-up').removeClass('icon-volume-down').addClass('icon-volume-off');
		} else if (mediaPlayer.volume>=0.1 && mediaPlayer.volume < 0.6) {
			$('#mute').removeClass('icon-volume-up').removeClass('icon-volume-off').addClass('icon-volume-down');
		} else {
			$('#mute').removeClass('icon-volume-off').removeClass('icon-volume-down').addClass('icon-volume-up');
		}
		console.log(mediaPlayer.volume);
	}

	function fullScreenToggle(){
		if(mediaPlayer.requestFullScreen){
			mediaPlayer.requestFullScreen();
		} else if(mediaPlayer.webkitRequestFullScreen){
			mediaPlayer.webkitRequestFullScreen();
		} else if(mediaPlayer.mozRequestFullScreen){
			mediaPlayer.mozRequestFullScreen();
		}
		mediaPlayer.controls = false;
	}

	function hideShowIcons() {
		console.log('elo');
	}

	function settingsToggle() {
		if(settingsShow===false){
			settings.style.visibility = "visible";
			settingsShow = true;
		} else {
			settings.style.visibility = "hidden";
			settingsShow = false;
		}
	}

	function changeVideoFilter() {
		// alert($('#filter').val());
		var filterVal = $('#filter').val();
		if(filterVal==='hue') {
			$('video').addClass('hue').removeClass('blur').removeClass('brightness').removeClass('contrast').removeClass('invert').removeClass('sepia');
		}
		else if(filterVal==='blur') {
			$('video').addClass('blur').removeClass('hue').removeClass('brightness').removeClass('contrast').removeClass('invert').removeClass('sepia');
		}
		else if(filterVal==='brightness') {
			$('video').addClass('brightness').removeClass('hue').removeClass('blur').removeClass('contrast').removeClass('invert').removeClass('sepia');
		}
		else if(filterVal==='contrast') {
			$('video').addClass('contrast').removeClass('hue').removeClass('blur').removeClass('brightness').removeClass('invert').removeClass('sepia');
		}
		else if(filterVal==='invert') {
			$('video').addClass('invert').removeClass('hue').removeClass('blur').removeClass('brightness').removeClass('contrast').removeClass('sepia');
		}
		else if(filterVal==='sepia') {
			$('video').addClass('sepia').removeClass('hue').removeClass('blur').removeClass('brightness').removeClass('contrast').removeClass('invert');
		} else {
			$('video').removeClass('sepia').removeClass('hue').removeClass('blur').removeClass('brightness').removeClass('contrast').removeClass('invert');
		}
	}

	$('.content').find('button').click(function(){
		// alert($(this).attr('data-link'));
		var newSrc = $(this).attr('data-link');
		$('video').attr('src', newSrc);
		initializePlayer();
		vol = 100;
		volumeSlider.value = vol;
		currentTimeText.innerHTML = 0+':'+0;
		durationTimeText.innerHTML = 0+':'+0;
		settings.style.visibility = "hidden";
		mediaPlayer.controls = false;
		$('#play').removeClass('icon-pause').addClass('icon-play');
	});

});