$(document).ready(function () {
	musicPlayer.player.init();
});

var musicPlayer = musicPlayer || {};

musicPlayer.currentState = {
	song: 0,
	playing: false
};

musicPlayer.player = {
	init: function () {
		var listeners = {
			playPause: musicPlayer.player.playPause,
			nextTrack: musicPlayer.player.nextTrack,
			prevTrack: musicPlayer.player.prevTrack
		};
		musicPlayer.view.init(listeners);
	},

	playSong: function ($song) {
		var $audio = musicPlayer.view.getAudio($song),
			songID = musicPlayer.view.getId($song);
		$audio.trigger('play');
		musicPlayer.currentState.song = songID;
		musicPlayer.currentState.playing = true;
		musicPlayer.view.changeToPause($song);
	},
	pauseSong: function ($song) {
		var $audio = musicPlayer.view.getAudio($song);
		$audio.trigger('pause');
		musicPlayer.currentState.playing = false;
		musicPlayer.view.changeToPlay($song);
	},

	changeSong: function ($song) {
		var $prevSong = musicPlayer.view.getCurrentSong();
		musicPlayer.player.pauseSong($prevSong);
		musicPlayer.player.playSong($song);
		musicPlayer.view.updateSongInfo();
	},

	playPause: function (event) {
		var $song = $(event.target);
		songID = musicPlayer.view.getId($song);
		if (songID === -1) {
			$song = musicPlayer.view.getCurrentSong();
			songID = musicPlayer.view.getId($song);
		}
		if (songID !== musicPlayer.currentState.song) {
			musicPlayer.player.changeSong($song);
    } else if (musicPlayer.currentState.playing) {
			musicPlayer.player.pauseSong($song);
    } else {
			musicPlayer.player.playSong($song);
    }
		musicPlayer.view.updateControls();
	},

	nextTrack: function () {
	var nextId = (musicPlayer.currentState.song + 1) % musicPlayer.songs.length,
		$nextSong = musicPlayer.view.getSongFromId(nextId);
		musicPlayer.player.changeSong($nextSong);
		musicPlayer.view.updateControls();
	},

	prevTrack: function () {
		var prevId = musicPlayer.currentState.song - 1;
		if (prevId < 0) {
			prevId = musicPlayer.songs.length - 1;
		}
		var $prevSong = musicPlayer.view.getSongFromId(prevId);
		musicPlayer.player.changeSong($prevSong);
		musicPlayer.view.updateControls();
	}
};
