$(function() {
	"use strict";
	const playlist = ['audio/Energy.mp3', 'audio/Bounce.mp3', 'audio/IF.mp3', 'audio/My_Nigga.mp3', 'audio/Juice.mp3'];
	 var song = new Audio();
	 var i = 0;
		song.preload = 'auto';
		song.addEventListener('ended',function() {
			i = ++i < playlist.length ? i : 0;
			console.log(i);
			song.src = playlist[i];
			play();
		}, true);
		song.loop = false;
    
		/*alert(identifier);*/

    var identifier = null;
	function play () {
    	if (song.paused) {
    		song.play();
    		song.currentTime = 0;
    	} else {
    		song.play();
    		song.currentTime = 0;
    	}
    }


    //CONTROLS

     function pause() {
    	song.pause();
    	song.currentTime = 0;
    }

    function toggleControl()  {
    	if (song.paused) {
    		song.play();
    	}else {
    		song.pause();
    	}	
    }

	//CLICK EVENT & TOGGLE ICONS
	$('.song').click(function() {
	    var identifier = $(this).attr('data-panelid');
		song.src = playlist[identifier];
		console.log(i);
		play();
		$('#current').html($(this).html());
		console.log($(this).html());
    	$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
    });

	$('.fa-play-circle-o').click(function() {
		
		if( song.src == "" ) {
			alert('select a song first!');
		} else {
			$('.fa-play-circle-o').toggleClass( 'fa-pause-circle-o');
			toggleControl();
		}
	});

	$('.fa-step-backward').click(function(){
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
		
			song.src = playlist[identifier];
			console.log(identifier);
			song.currentTime = 0;
			song.play();
	});

	$('.fa-step-forward').click(function() {
		$('#current').html($(this).html());
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
	});


	//HOVER EFFECTS 
	$('.song').mousemove(function() {
		$(this)
		.css('font-size', '18px');
	});


	$('.song').mouseout(function() {
		$(this).css('font-size', '16px');
	});
	
});
