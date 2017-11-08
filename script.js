let playerInfo = {
	infoArray : ["/assets/music/Jono_Bacon_-_01_-_Free_Software_Song_2.mp3",
	"/assets/music/Magic_Hammer_-_01_-_The_Master_ov_Time_pt_1_Escape.mp3",
	"/assets/music/M_Shanghai_String_Band_-_05_-_No_Home_In_This_World.mp3",
	"/assets/music/Scott_Joplin_-_09_-_Original_Rags_1900_piano_roll.mp3",
	"/assets/music/Secret_Jane_-_01_-_Blackberrys_Hedge.mp3"],
	currentIndex: 0,
	artistArray: ["Jono Bacon", "Magic Hammer", "M Shanghai String Band", "Scott Joplin", "Secret Jane"],
	songArray: ["Free Software Song 2", "The Master ov Time pt 1", "No Home In This World", "Piano Roll", "Blackberrys Hedge"]

}

function playFromFooter(){
	if($('div .glyphicon-pause')[0] === undefined){
		$('#toPlay')[0].play();
		$('#footer-song').html(`<b>${playerInfo.songArray[playerInfo.currentIndex]}</b>`);
		$('#footer-artist').html(`<b>${playerInfo.artistArray[playerInfo.currentIndex]}</b>`);
	}else{
		$('#toPlay')[0].pause();
	}
	$('#foot-play').toggleClass("glyphicon-play glyphicon-pause");
	$(`#play${playerInfo.currentIndex}`).toggleClass("glyphicon-play glyphicon-pause");
}

function playFromPage(event){
	if(playerInfo.currentIndex != parseInt(event.target.id.substring(4))){
		if($('div .glyphicon-pause')[0] === undefined){
			$('#foot-play').toggleClass("glyphicon-play glyphicon-pause");
		}
		$('div .glyphicon-pause').toggleClass("glyphicon-pause glyphicon-play");
		playerInfo.currentIndex = parseInt(event.target.id.substring(4));
		//$('#toPlay').replaceWith(`<audio id="toPlay" class="hidden" controls><source src =${playerInfo.infoArray[playerInfo.currentIndex]} type="audio/mp3"></audio>`);
		$('#toPlay > source').attr("src", playerInfo.infoArray[playerInfo.currentIndex]);
		$('#toPlay')[0].load();
		$('#toPlay')[0].play();
		$('#footer-song').html(`<b>${playerInfo.songArray[playerInfo.currentIndex]}</b>`);
		$('#footer-artist').html(`<b>${playerInfo.artistArray[playerInfo.currentIndex]}</b>`);
	}else{
		if($('div .glyphicon-pause')[0] === undefined){
			$('#foot-play').toggleClass("glyphicon-play glyphicon-pause");
			$('#toPlay')[0].play();
		}else{
			$('#toPlay')[0].pause();
			$('#foot-play').toggleClass("glyphicon-play glyphicon-pause");
		}
	}
	let current = $(`#play${playerInfo.currentIndex}`)
	current.toggleClass("glyphicon-play glyphicon-pause");
}

function doAssignment(){
	for(i = 0; i < 5; i++){
		$(`#play${i}`).click(function(event){
			event.stopPropagation();
			playFromPage(event);
		});
		$(`#div${i} .title`).html(`<b>${playerInfo.songArray[i]}</b> <br> ${playerInfo.artistArray[i]}`);
	}
	$('#footer-song').html(`<b>${playerInfo.songArray[playerInfo.currentIndex]}</b>`);
	$('#footer-artist').html(`<b>${playerInfo.artistArray[playerInfo.currentIndex]}</b>`);
	$('#foot-play').click(function(event2){
		event2.stopPropagation();
		playFromFooter();
	});
	$('#foot-prev').click(function(event3){
		event3.stopPropagation();
		if(playerInfo.currentIndex === 0){
			event3.target = $('#play4')[0];
		}else{
			event3.target = $(`#play${playerInfo.currentIndex - 1}`)[0];
		}
		playFromPage(event3);
	});
	$('#foot-next').click(function(event4){
		event4.stopPropagation();
		if(playerInfo.currentIndex === (playerInfo.artistArray.length - 1)){
			event4.target = $('#play0')[0];
		}else{
			event4.target = $(`#play${playerInfo.currentIndex + 1}`)[0];
		}
		playFromPage(event4);
	});
	$('#toPlay').eq(0).on("ended", function(){
		$('#foot-next').trigger("click")
	});
}

$(function(){doAssignment();});
