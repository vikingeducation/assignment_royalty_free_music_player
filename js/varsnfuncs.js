let file_path = "assets/media/sound_tracks/",
	current_playing = "",
	play = function() {
		$("#play").hide()
		$("#pause").fadeIn()
	},
	setCurrentPlayingItemStyle = function(target, action, func){
		$(target).on(action, func)
	},
	pause = function() {
		$("#pause").hide()
		$("#play").fadeIn()
	},
	togglePlay = function(item) {
		if (current_playing !== "") resetSrc()
		setCurrentPlaying(item)
	},
	setCurrentPlaying = function(item){
		current_playing = item
		item.play()
	}
	resetSrc = function(){
		var hold = current_playing.src;
		current_playing.src = "";
		current_playing.src = hold;
	}
	playFirst = function(){
		setCurrentPlaying(document.getElementById("audio0"))
	},
	playLast = function(){
		setCurrentPlaying(document.getElementById("audio15"))
	},
	skipToPrev = function() {
		var index = current_playing.id.slice(5, current_playing.id.length);
		var previousIndex = ""
		index <= 0 ? previousIndex = songs.length - 1 : previousIndex = parseInt(index) - 1
		//make these a css class
		$(`.divClass`).eq(index).css("background", "white")
		$(`.divClass`).eq(previousIndex).css("background", "aqua")
		$(".bottom-banner p").remove()
		$(".bottom-banner").append(`<p class = 'bannerP'>${$("li").get(previousIndex).innerText}</p>`)
		resetSrc()
		setCurrentPlaying(document.getElementById(current_playing.className + previousIndex))
	},
	skipToNext = function() {
		var index = current_playing.id.slice(5, current_playing.id.length);
		var nextIndex = "";
		index < songs.length - 1 ? nextIndex = parseInt(index) + 1 : nextIndex = 0;
		//make these a css class
		$(`.divClass`).eq(index).css("background", "white");
		$(`.divClass`).eq(nextIndex).css("background", "aqua");
		$(".bottom-banner p").remove()
		$(".bottom-banner").append(`<p class = 'bannerP'>${$("li").get(nextIndex).innerText}</p>`)
		resetSrc()
		setCurrentPlaying(document.getElementById(current_playing.className + nextIndex));
	},
	fwd = function() {
		!current_playing ? playFirst() : skipToNext()
	},
	rwd = function() {
		!current_playing ? playLast() : skipToPrev()
	}