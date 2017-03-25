$(document).ready(function(){

	$(".song").on("click", function(e){
		/* Stop all audios */
		$("audio").each(function(){
			this.pause();
			$(this).removeClass("active-song");
		});
		/* Make all song icons = play */
		$(".song-icon").attr("src", "./icons/play-icon-grey.png");
		/* Make clicked song icon = pause */
		var $songDiv = $(e.target).closest('.song');
		var $songIcon = $songDiv.children().first().children().first();
		$songIcon.attr("src", "./icons/pause-icon-grey.png");
		/* Make selected song play and give it active class */
		var song = $songDiv.children().last().children().last()[0];
		song.play();
		$songDiv.children().last().children().last().addClass("active-song");
		/* Show selected song in footer */
		var songName = $songDiv.children().last().children().first().html();
		var bandName = $songDiv.children().last().children().first().next().html();
		$(".song-name-footer").html(songName);
		$(".band-name-footer").html(bandName);
		/* Make footer icon = pause */
		$(".footer-play-icon").children().first().attr("src", "./icons/controller-pause.svg");
	});


	$(".footer-play-icon").on("click", function(){
		/* Toggle song play / pause */
		song = $(".active-song")[0];
		if (song.paused) {
        	song.play();
    	} else {
        	song.pause();
    	}
    	/* Toggle icon on footer and song */
    	$iconImg = $(".footer-play-icon").children().first();
    	if ($iconImg.attr("src") == "./icons/controller-pause.svg") {
    		$iconImg.attr("src", "./icons/controller-play.svg");
    		$(".song-icon").attr("src", "./icons/play-icon-grey.png");
    	} else {
    		$iconImg.attr("src", "./icons/controller-pause.svg");
    		$(".active-song").parent().prev().children().first().attr("src", "./icons/pause-icon-grey.png");
    	}
	});

	$(".footer-prev-icon").on("click", function(e){
		/* Find songDiv parent of active */
		var $songDivActive = $(".active-song").closest(".song");
		/* Traverse to songDiv of prev */
		var $songDiv;
		if ($songDivActive.attr("id") == "song-one") {
			$songDiv = $("#song-five");
		} else {
			$songDiv = $songDivActive.prev();
		}
		/* Stop all audios and remove active class */
		$("audio").each(function(){
			this.pause();
			$(this).removeClass("active-song");
		});
		/* Make all song icons = play */
		$(".song-icon").attr("src", "./icons/play-icon-grey.png");
		/* Make prev song icon = pause */
		var $songIcon = $songDiv.children().first().children().first();
		$songIcon.attr("src", "./icons/pause-icon-grey.png");
		/* Make prev song play and give it active class */
		var song = $songDiv.children().last().children().last()[0];
		song.play();
		$songDiv.children().last().children().last().addClass("active-song");
		/* Show prev song in footer */
		var songName = $songDiv.children().last().children().first().html();
		var bandName = $songDiv.children().last().children().first().next().html();
		$(".song-name-footer").html(songName);
		$(".band-name-footer").html(bandName);
		/* Make footer icon = pause */
		$(".footer-play-icon").children().first().attr("src", "./icons/controller-pause.svg");
	});

	$(".footer-next-icon").on("click", function(e){
		/* Find songDiv parent of active */
		var $songDivActive = $(".active-song").closest(".song");
		/* Traverse to songDiv of next */
		var $songDiv;
		if ($songDivActive.attr("id") == "song-five") {
			$songDiv = $("#song-one");
		} else {
			$songDiv = $songDivActive.next();
		}
		/* Stop all audios and remove active class */
		$("audio").each(function(){
			this.pause();
			$(this).removeClass("active-song");
		});
		/* Make all song icons = play */
		$(".song-icon").attr("src", "./icons/play-icon-grey.png");
		/* Make next song icon = pause */
		var $songIcon = $songDiv.children().first().children().first();
		$songIcon.attr("src", "./icons/pause-icon-grey.png");
		/* Make next song play and give it active class */
		var song = $songDiv.children().last().children().last()[0];
		song.play();
		$songDiv.children().last().children().last().addClass("active-song");
		/* Show next song in footer */
		var songName = $songDiv.children().last().children().first().html();
		var bandName = $songDiv.children().last().children().first().next().html();
		$(".song-name-footer").html(songName);
		$(".band-name-footer").html(bandName);
		/* Make footer icon = pause */
		$(".footer-play-icon").children().first().attr("src", "./icons/controller-pause.svg");
	});









});


