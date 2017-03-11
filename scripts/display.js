var musicPlayer = musicPlayer || {};
musicPlayer.view = {
	init: function (listeners) {
		musicPlayer.view.addSongs();
		musicPlayer.view.addListeners(listeners);
		musicPlayer.view.updateSongInfo();
	},

	updateControls: function () {
		if (musicPlayer.currentState.playing) {
			$('#ctrl-play').addClass('glyphicon-pause')
				.removeClass('glyphicon-play');
		} else {
			$('#ctrl-play').removeClass('glyphicon-pause')
													.addClass('glyphicon-play');
		}
	},

	updateSongInfo: function () {
		var currentSong = musicPlayer.songs[musicPlayer.currentState.song];
		$('#song-info .song-title').text(currentSong.title);
		$('#song-info .song-artist').text(currentSong.artist);
	},

	getId: function ($song) {
		return +$song.data('index');
	},

	getAudio: function ($song) {
		return $song.next();
	},

	getSongFromId: function (id) {
		return $('span[data-index=' + id + ']');
	},

	getCurrentSong: function () {
		var id = musicPlayer.currentState.song;
		return musicPlayer.view.getSongFromId(id);
	},

	changeToPlay: function ($song) {
		$song.removeClass('glyphicon-pause')
         .addClass('glyphicon-play');
	},

	changeToPause: function ($song) {
		$song.addClass('glyphicon-pause')
         .removeClass('glyphicon-play');
	},

	addListeners: function (listeners) {
		var $playlist = $('#playlist'),
			$ctrlPlay = $('#ctrl-play'),
			$ctrlNext = $('#ctrl-next'),
			$ctrlPrev = $('#ctrl-prev');
		$playlist.on('click', 'play-pause', listeners.playPause);

		$ctrlPlay.on('click', listeners.playPause);
		$ctrlNext.on('click', listeners.nextTrack);
		$ctrlPrev.on('click', listeners.prevTrack);
	},

	addSongs: function () {
		musicPlayer.songs.forEach(function (song, index) {
			var $playlistItem = musicPlayer.view.createSongItem(song, index);
			$('#playlist').append($playlistItem);
		});
	},

	createSongItem: function (song, index) {
		var $li = $('<li>')
                .addClass('col-xs-8 col-xs-offset-2 list-group-item');
		var $textCol = $('<div>')
											.addClass('col-xs-1')
											.appendTo($li);
		var $button = $('<span>')
											.addClass('glyphicon glyphicon-play play-pause')
											.attr('aria-hidden', 'true')
											.attr('data-index', index)
											.appendTo($textCol);
		var $audio = $('<audio>')
											.appendTo($textCol);
		var $source = $('<source>')
											.attr('src', song.url)
											.attr('type', 'audio/mpeg')
											.appendTo($audio);
		var $songInfo = $('<div>')
											.addClass('col-xs-11 song')
											.appendTo($li);
		$('<p>')
      .addClass('song-title')
      .text(song.title)
      .appendTo($songInfo);
		$('<p>')
      .addClass('song-artist')
      .text(song.artist)
      .appendTo($songInfo);

		return $li;
	}
};
