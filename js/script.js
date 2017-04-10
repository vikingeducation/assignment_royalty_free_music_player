function SongItem(title, artist, url, selected){
	this.title = title;
	this.artist = artist;
	this.url = url;
	this.selected = selected;
}

var songList = [];
songList.push(new SongItem("Great Balls of Fire", "Blackwell & Hammer", "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3", true));
songList.push(new SongItem("Cheek to Cheek", "Irving Berlin", "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2005.mp3", false));
songList.push(new SongItem("Jailhouse Rock", "Leiber & Stoller", "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2010.mp3", false));
songList.push(new SongItem("Enya Song", "Enya", "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3", false));
songList.push(new SongItem("Embraceable You", "George Gershwin", "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3", false));

var createList = function(songList){
	songList.forEach(function(song, index){
		$songItem = $("<div></div>").addClass("song-item");
		
		
		$playButton = $("<button></button>").addClass("pure-button fa fa-play play-button");
		$songDetails = $("<div></div>").addClass("song-details");
		$breakLine = $("<br/>");
		$songTitle = $("<b></b>").text(song.title);
		$songArtist = $("<i></i>").text(song.artist);
		$songAudio = $("<audio></audio>");
		$songSource = $("<source />").attr("src", song.url)
									.attr("type", "audio/mpeg");
									
		if(song.selected){
			$songItem.addClass("song-selected");
			$("#playing-song-title").text(song.title);
			$("#playing-song-artist").text(song.artist);
		}
		
		$songAudio.append($songSource)
		$songDetails.append($songTitle)
					.append($breakLine)
					.append($songArtist)
					.append($songAudio);
		
		$songItem.append($playButton)
				.append($songDetails);
		
		$("#song-list").append($songItem)
	});
}

var initEventHandlers = function(){
		$("#song-list").on("click", "button", function(e){
			$target = $(e.target);
			
			if($target.hasClass("fa-play")){
				if($(".fa-pause").length){
					togglePlay($(".fa-pause").parent());
				}
				changeSelected($target.parent());
			}else{
				$target.removeClass("fa-pause")
					   .addClass("fa-play");
				
				$(".fa-pause-circle-o").removeClass("fa-pause-circle-o")
					   .addClass("fa-play-circle-o");
			}
			
			togglePlay($target.parent());
		});

		$(".player-button").on("click", function(e){
			$target = $(e.target);
			
			if($target.hasClass("fa-pause-circle-o")){
				$target.removeClass("fa-pause-circle-o")
						.addClass("fa-play-circle-o");
						
				$songItem = $(".fa-pause").parent();
				$(".fa-pause").removeClass("fa-pause")
						.addClass("fa-play");
				
				togglePlay($songItem);
			}else if($target.hasClass("fa-play-circle-o")){
				var title = $target.parent().parent().find("b").text();
			
				$button = $(".song-item b:contains(" + title + ")").parent().parent().find("button");
				
				$target.removeClass("fa-play-circle-o")
						.addClass("fa-pause-circle-o");
				
				$button.removeClass("fa-play")
						.addClass("fa-pause");
				
				$songItem = $button.parent();
				togglePlay($songItem);
			}else if($target.hasClass("fa-step-backward")){
				$currentSongItem = $(".song-selected");
				
				if($currentSongItem.prev().length){
					$prevSongItem = $currentSongItem.prev();
				}else{
					$prevSongItem = $("#song-list").children().last();
				}
				
				changeSelected($prevSongItem);
				togglePlay($currentSongItem);
				togglePlay($prevSongItem);
			}else if($target.hasClass("fa-step-forward")){
				$currentSongItem = $(".song-selected");
				
				if($currentSongItem.next().length){
					$nextSongItem = $currentSongItem.next();
				}else{
					$nextSongItem = $("#song-list").children().first();
				}
				
				changeSelected($nextSongItem);
				togglePlay($currentSongItem);
				togglePlay($nextSongItem);
			}
		});
	
		$("#add-button").on("click", function(e){
			$("#add-panel").toggle(500);
		});
		
		$("#hide-panel-button").on("click", function(e){
			$("#add-panel").toggle(500);
		});
		
		$("#add-song-button").on("click", function(e){
			var title = $("#song-title").val();
			var artist = $("#song-artist").val();
			var url = $("#song-url").val();
			createList([new SongItem(title, artist, url, false)]);
		});
	}

var changeSelected = function($selectedSongItem){
	var title = $selectedSongItem.find("b").text();
	var artist = $selectedSongItem.find("i").text();
	
	$(".play-button").removeClass("fa-pause")
					 .addClass("fa-play");
	
	$button = $selectedSongItem.find("button");
	$button.removeClass("fa-play")
		   .addClass("fa-pause");
	
	$(".song-selected").removeClass("song-selected")
	$selectedSongItem.addClass("song-selected");
	
	$(".fa-play-circle-o").removeClass("fa-play-circle-o")
		   .addClass("fa-pause-circle-o");
	
	$("#playing-song-title").text(title);
	$("#playing-song-artist").text(artist);
}

var togglePlay = function($songItem){
	var song = $songItem.find("audio").first().get(0);
	
	if(song.paused){
		song.play();
	}else{
		song.pause();
	}
}

$(document).ready( function(){
	createList(songList);
	initEventHandlers();
});