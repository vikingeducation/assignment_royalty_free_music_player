let file_path = "assets/media/sound_tracks/",
	current_playing = "",
	page = 'page',
	ulPlay = 'ulPlay',
	liPlay = 'liPlay',
	playClass = 'playClass',
	divClass = 'divClass',
	bannerP = 'bannerP',
	play = function() {
		$("#play").hide()
		$("#pause").fadeIn()
	},
	pause = function() {
		$("#pause").hide()
		$("#play").fadeIn()
	},
	togglePlay = function(item) {
		if (current_playing !== "") {
			//reset src to stop music
			var hold = current_playing.src
			current_playing.src = ""
			current_playing.src = hold
		}
		//play selection
		item.play()
		//keep track of selection to pause next time
		current_playing = item
	},
	fwd = function() {
		if (current_playing === "") {
			current_playing = document.getElementById("audio0")
		} else {
			var index = current_playing.id.slice(5, current_playing.id.length);
			if (index < songs.length - 1) {
				var nextIndex = parseInt(index) + 1
			} else {
				var nextIndex = 0
			}
			console.log(nextIndex)
			$(`.${divClass}`).eq(index).css("background", "white")
			$(`.${divClass}`).eq(nextIndex).css("background", "aqua")
			var hold = current_playing.src
			current_playing.src = ""
			current_playing.src = hold
			current_playing = document.getElementById(current_playing.className + nextIndex)
		}
		current_playing.play()
	},
	rwd = function() {
		if (current_playing === "") {
			current_playing = document.getElementById("audio15")
		} else {
			var index = current_playing.id.slice(5, current_playing.id.length);
			var previousIndex = ""
			if (index <= 0) {
				console.error("wrong")
				previousIndex = songs.length - 1
			} else {
				previousIndex = parseInt(index) - 1
			}
			$(`.${divClass}`).eq(index).css("background", "white")
			$(`.${divClass}`).eq(previousIndex).css("background", "aqua")
			var hold = current_playing.src
			current_playing.src = ""
			current_playing.src = hold
			current_playing = document.getElementById(current_playing.className + previousIndex)
			console.log(current_playing)
		}
		current_playing.play()
	}