songs = [ "anewbeginning.mp3",
		  "betterdays.mp3",
		  "clearday.mp3",
		  "energy.mp3",
		  "funkyelement.mp3",
		  "happyrock.mp3",
		  "higher.mp3",
		  "jazzyfrenchy.mp3",
		  "memories.mp3",
		  "sadday.mp3",
		  "scifi.mp3",
		  "slowmotion.mp3",
		  "sunny.mp3",
		  "thelounge.mp3",
		  "tomorrow.mp3",
		  "ukulele.mp3"
		 ]
//Build the HTML //
function buildHTML() {
	$(`.page`).prepend(`<ul class = 'ulPlay'></ul>`)
	songs.forEach((item) => {
		$(`.ulPlay`).append(`<li class = 'liPlay full-width'></li>`)
	})
	$(`.liPlay`).append(`<div class = 'divClass'></div>`)
	$(`.divClass`).append(`<p class = 'playClass'></p>`)
	$(`.divClass`).append(`<img src = 'assets/media/images/play.svg'/>`)
	songs.forEach(function(item, index) {
		$(`.divClass`).eq(index).append(`<audio src = '${file_path + item}' id =
		 'audio${index}' class = 'audio'></audio>`)
	})
	songs.forEach((item, index) => {
		$(`.divClass`).eq(index).append(`<p>${item}</p>`)
	})
}
//End Build the HTML //
//Audio Settings//
function audioSettings() {
	//attach listeners on all "divs", when clicked the corresponding "audio" item should call the togglePlay
	//so it checks what should be stopped and started
	action(L(".divClass"), ".audio", loop, "click", togglePlay)
	L("#pause").addEventListener("click", function() {
		current_playing.pause()
	})
	L("#play").addEventListener("click", function() {
		if (!current_playing) current_playing = $("#audio0").get(0)
		current_playing.play()
	})
	L("#fwd").addEventListener("click", fwd)
	L("#rwd").addEventListener("click", rwd)
}
//End Audio Settings//
//jQuery Styling//
function styling() {
	$("#pause").hide()
	$("#play").on("click", () => play())
	$("#pause").on("click", () => pause())
	setCurrentPlayingItemStyle("li", "click", function() {
		$("li").css("background", "white")
		$(this).css("background", "aqua")
		$(".bottom-banner p").remove()
		$(".bottom-banner").append(`<p class = 'bannerP'>${this.innerText}</p>`)
		console.log(this)
	})
	//play()
}
//End jQuery Styling//