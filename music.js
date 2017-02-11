		
		
	$(document).ready(function (){
		var lastPlayed = $("audio")[0];
		var changeToPlay = "<span class='glyphicon glyphicon-play' aria-hidden='true'></span>";
		var changeToPause = "<span class='glyphicon glyphicon-pause' aria-hidden='true'></span>";
		var changeToMasterPlay = "<span class='glyphicon glyphicon-play' id = 'master-play' aria-hidden='true'></span>";
		var changeToMasterPause = "<span class='glyphicon glyphicon-pause' id='master-pause' aria-hidden='true'></span>";
		var $parentIndex = 0;
		var progressTime = "";

		$("body").on("click", "h4 .glyphicon-play", function () {
			lastPlayed.pause();
			$(event.target).parent().find("audio")[0].play();
			lastPlayed = $(event.target).parent().find("audio")[0];
			$parentIndex = $(lastPlayed).parent().index();
			lastPlayed.addEventListener("timeupdate", function () {
				progressTime = lastPlayed.currentTime / lastPlayed.duration * 100 + "%";
				$(".progress-bar").css("width", progressTime);
			});
			$("h3 .artist").text($(event.target).parent().find(".musician").text());
			$("h3 .song").text($(event.target).parent().find(".song").text());
			$("h4 .glyphicon-pause").not($(event.target)).replaceWith(changeToPlay);
			$(event.target).replaceWith(changeToPause);
			$("#master-play").replaceWith(changeToMasterPause);
		});

		$("body").on("click", "h4 .glyphicon-pause", function () {
			lastPlayed.pause();
			$(event.target).replaceWith(changeToPlay);
			$("#master-pause").replaceWith(changeToMasterPlay);
		})

		$("body").on("click", "#master-play", function () {
			lastPlayed.play();
			$(event.target).replaceWith(changeToMasterPause);
			lastPlayed.play();
			$(lastPlayed).parent().find(".glyphicon-play").replaceWith(changeToPause);
		})

		$("body").on("click", "#master-pause", function () {
			$(event.target).replaceWith(changeToMasterPlay);
			lastPlayed.pause();
			$(lastPlayed).parent().find(".glyphicon-pause").replaceWith(changeToPlay);
		});

		$(".glyphicon-forward").click(function () {
			if (lastPlayed === "") {
				$("h4 .glyphicon-play")[1].click();
			}
			if($parentIndex < $("h4").length){
				$(lastPlayed).parent().next().find(".glyphicon-play")[0].click();
			}	
		});

		$(".glyphicon-backward").click(function () {
			if($parentIndex > 1) {
				$(lastPlayed).parent().prev().find(".glyphicon-play")[0].click();
			}
		});

		lastPlayed.addEventListener("timeupdate", function () {
				progressTime = lastPlayed.currentTime / lastPlayed.duration * 100 + "%";
				$(".progress-bar").css("width", progressTime);
			});

	});




