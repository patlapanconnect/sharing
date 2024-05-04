var video = document.getElementById('video');

function playM3u8(url){
  if(Hls.isSupported()) {
      video.volume = 0.3;
      var hls = new Hls();
      var m3u8Url = decodeURIComponent(atob(url))  // Menggunakan atob untuk mendekripsi URL
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
        // Menambahkan level kualitas
        hls.levels.forEach((level, index) => {
          var qualityOption = document.createElement('option');
          qualityOption.textContent = level.height + 'p'; // Menampilkan resolusi sebagai label
          qualityOption.value = index; // Indeks level akan menjadi nilai
          document.getElementById('quality-selector').appendChild(qualityOption);
        });
        // Mendengarkan perubahan seleksi kualitas
        document.getElementById('quality-selector').addEventListener('change', function() {
          hls.currentLevel = parseInt(this.value);
        });
      });
      // Tambahkan tanggal saat ini ke judul
      var currentDate = new Date();
      document.title = document.title + " - " + currentDate.toLocaleDateString();
    }
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = url;
		video.addEventListener('canplay',function() {
		  video.play();
		});
		video.volume = 0.3;
		// Tambahkan tanggal saat ini ke judul
		var currentDate = new Date();
		document.title = document.title + " - " + currentDate.toLocaleDateString();
  	}
}

function playPause() {
    video.paused?video.play():video.pause();
}

function volumeUp() {
    if(video.volume <= 0.9) video.volume+=0.1;
}

function volumeDown() {
    if(video.volume >= 0.1) video.volume-=0.1;
}

function seekRight() {
    video.currentTime+=5;
}

function seekLeft() {
    video.currentTime-=5;
}

function vidFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}

playM3u8(window.location.href.split("#")[1])
$(window).on('load', function () {
    $('#video').on('click', function(){this.paused?this.play():this.pause();});
    Mousetrap.bind('space', playPause);
    Mousetrap.bind('up', volumeUp);
    Mousetrap.bind('down', volumeDown);
    Mousetrap.bind('right', seekRight);
    Mousetrap.bind('left', seekLeft);
    Mousetrap.bind('f', vidFullscreen);
});
