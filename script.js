$(() => {
	let SELECTED_SONG_BTN = null;

	function init() {
		player.selectTrack();
		player.play();
		player.fastBackward();
		player.fastForward();
	}

	const player = {
		selectTrack: function() {
			$('.play-track-btn').click(function() {
				let currentButton = $(this).children(':first');
				let currentTrack = $(currentButton).children()[0];

				let trackBox = $(this).parents()[0];

				// update global song tracker
				SELECTED_SONG_BTN = currentButton

				let mainPlayerButton = $('.main-play-btn').children(':first');

				let selectedTitle = $(this).next().children()[0].innerHTML;
				let selectedArtist = $(this).next().children()[1].innerHTML;

				let displayedTitle = $('.player-song-display').children()[0];
				let displayedArtist = $('.player-song-display').children()[1];

				$(displayedTitle).html(selectedTitle);
				$(displayedArtist).html(selectedArtist);

				// make sure play/pause icons and functions work
				if (currentButton.hasClass('fa-play') && mainPlayerButton.hasClass('fa-play')) {
					$(currentTrack).get(0).play();

					currentButton.removeClass('fa-play');
					currentButton.addClass('fa-pause');

					mainPlayerButton.removeClass('fa-play');
					mainPlayerButton.addClass('fa-pause');

					$(trackBox).addClass('active');

				} else {
					$(currentTrack).get(0).pause();

					currentButton.removeClass('fa-pause');
					currentButton.addClass('fa-play');

					mainPlayerButton.removeClass('fa-pause');
					mainPlayerButton.addClass('fa-play');

					$(trackBox).removeClass('active');
				}

				// make sure tracks update and pause correctly when one track is playing
				let tracks = $('.playlist-box').children();

				$(tracks).each(function(index) {
					let playButton = $(this).children(":first").children(":first");
					let otherTrack = $(playButton).children()[0];
					let otherTrackBox = $(playButton).parents()[1];


					if (playButton[0] !== currentButton[0]) {
						$(otherTrack).get(0).pause();

						playButton.addClass('fa-play');
						playButton.removeClass('fa-pause');

						$(otherTrackBox).removeClass('active');
					} 
				});
			});
		},

		play: function() {
			$('.main-play-btn').click(function() {
				if (SELECTED_SONG_BTN === null) {
					alert('Please select a song first!');
					return;
				}

				let currentButton = $(this).children(':first');
				let currentTrack = $(SELECTED_SONG_BTN).children()[0];

				let trackBox = $(SELECTED_SONG_BTN).parents()[1];

				if (currentButton.hasClass('fa-play')) {
					$(currentTrack).get(0).play();

					currentButton.removeClass('fa-play');
					currentButton.addClass('fa-pause');

					SELECTED_SONG_BTN.removeClass('fa-play');
					SELECTED_SONG_BTN.addClass('fa-pause');

					$(trackBox).addClass('active');

				} else {
					$(currentTrack).get(0).pause();

					currentButton.removeClass('fa-pause');
					currentButton.addClass('fa-play');

					SELECTED_SONG_BTN.removeClass('fa-pause');
					SELECTED_SONG_BTN.addClass('fa-play');

					$(trackBox).removeClass('active');
				}
			});
		},

		fastBackward: function() {
			$('.main-rewind-btn').click(function() {
				if (SELECTED_SONG_BTN === null) {
					alert('Please select a song first!');
					return;
				}

				let displayedTitle = $('.player-song-display').children()[0];
				let displayedArtist = $('.player-song-display').children()[1];

				let currentTrack = $(SELECTED_SONG_BTN).parents()[1];
				let previousTrack = $(currentTrack).prev().children()[1];

				if (previousTrack) {
					// save info for current and next(the previous) songs
					let previousTrackTitle = $(previousTrack).children()[0].innerHTML;
					let previousTrackArtist = $(previousTrack).children()[1].innerHTML;

					let currentBtn = $(currentTrack).children()[0];
					let nextBtn = $(currentTrack).prev().children()[0];

					let currentSong = $(currentBtn).children().children()[0];
					let nextSong = $(nextBtn).children().children()[0];

					let currentBtnClasses = $(currentBtn).children()[0];
					let nextBtnClasses = $(nextBtn).children()[0];

					let mainPlayerButton = $('.main-play-btn').children(':first');

					let nextTrackBox = $(previousTrack).parents()[0];
					let currentTrackBox = $(SELECTED_SONG_BTN).parents()[1];
					
					// update player display info
					$(displayedTitle).html(previousTrackTitle);
					$(displayedArtist).html(previousTrackArtist);

					// update play/pause if fast-backwarding
					$(currentSong).get(0).pause();
					$(currentBtnClasses).removeClass('fa-pause');
					$(currentBtnClasses).addClass('fa-play');
					$(currentTrackBox).removeClass('active');

					$(nextSong).get(0).play();
					$(nextBtnClasses).removeClass('fa-play');
					$(nextBtnClasses).addClass('fa-pause');
					$(nextTrackBox).addClass('active');

					if ($(mainPlayerButton).hasClass('fa-play')) {
						$(mainPlayerButton).removeClass('fa-play');
						$(mainPlayerButton).addClass('fa-pause');
					}

					// update current global song
					let nextSelectedBtn = $(nextBtn).children();
					SELECTED_SONG_BTN = nextSelectedBtn;
	
				} else {
					alert('You\'ve reached the top of the list!');
				}
			});
		},

		fastForward: function() {
			$('.main-forward-btn').click(function() {
				if (SELECTED_SONG_BTN === null) {
					alert('Please select a song first!');
					return;
				}

				let displayedTitle = $('.player-song-display').children()[0];
				let displayedArtist = $('.player-song-display').children()[1];

				let currentTrack = $(SELECTED_SONG_BTN).parents()[1];
				let nextTrack = $(currentTrack).next().children()[1];

				if (nextTrack) {
					// save info for current and next(the previous) songs
					let nextTrackTitle = $(nextTrack).children()[0].innerHTML;
					let nextTrackArtist = $(nextTrack).children()[1].innerHTML;

					let currentBtn = $(currentTrack).children()[0];
					let nextBtn = $(currentTrack).next().children()[0];

					let currentSong = $(currentBtn).children().children()[0];
					let nextSong = $(nextBtn).children().children()[0];

					let currentBtnClasses = $(currentBtn).children()[0];
					let nextBtnClasses = $(nextBtn).children()[0];

					let mainPlayerButton = $('.main-play-btn').children(':first');

					let nextTrackBox = $(nextTrack).parents()[0];
					let currentTrackBox = $(SELECTED_SONG_BTN).parents()[1];

					console.log(nextTrackBox, 'nextTrackBox');
					console.log(currentTrackBox, 'currentTrackBox');

					// update player display info
					$(displayedTitle).html(nextTrackTitle);
					$(displayedArtist).html(nextTrackArtist);

					// update play/pause if fast-forwarding
					$(currentSong).get(0).pause();
					$(currentBtnClasses).removeClass('fa-pause');
					$(currentBtnClasses).addClass('fa-play');
					$(currentTrackBox).removeClass('active');

					$(nextSong).get(0).play();
					$(nextBtnClasses).removeClass('fa-play');
					$(nextBtnClasses).addClass('fa-pause');
					$(nextTrackBox).addClass('active');

					if ($(mainPlayerButton).hasClass('fa-play')) {
						$(mainPlayerButton).removeClass('fa-play');
						$(mainPlayerButton).addClass('fa-pause');
					}

					// update current global song
					let nextSelectedBtn = $(nextBtn).children();
					SELECTED_SONG_BTN = nextSelectedBtn;

				} else {
					alert('You\'ve reached the end of the list!');
				}

			});
		}
	}

	init();
})