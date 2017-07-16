$(function () {
	"use strict";
/*
    	     function controlMusic() {
             var playlist =  new Array ('audio/0.mp3', 'audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3', 'audio/4.mp3');
           	  if (playing) {
           	   // Stop playing
		        song.pause();
		      } else {
		          // Start playing
		          if (!initDone) {	
		             initDone = true;    	      
    	              song = document.getElementById('play');
  		              song.addEventListener('ended', function() {
		              song.play();
		            });
		        }


		    song.play();
		  }

		  playing = !playing;
		}
		
		var playing = false;
		var initDone = false;
		var song = null;
	//	song.preload = 'auto';
		var chooser = "";
		function play() {
		
				song.play();
		}

		function pause() {

			song.pause();
		} */
    	var song = document.getElementById('play');
		function play() {
    		if (song.paused) {
    			song.play();
    		}else {
    			song.play();
    			song.currentTime = 0;
    		}
    	}

    	function toggleControl() {
    		if (song.paused) {
    			song.play();
    		}else {
    			song.pause();
    		}	
    	}

	$('.song').click( function() {
		 play();
    	  $('#current').html($(this).html());
    	    $('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
    	});

	$('.fa-play-circle-o').click( function() {
		$('.fa-play-circle-o').toggleClass( 'fa-pause-circle-o');
		toggleControl();
	});

	$('.fa-step-backward').click(function() {
		$('.current').html($(this).html());
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
	});

	$('.fa-step-forward').click(function() {
		$('.current').html($(this).html());
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
	});


	$('.song').mousemove( function() {
		$(this).css('background-color', '#97A7B3');
	});


	$('.song').mouseout( function() {
		$(this).css('background-color', 'transparent');
	});
	
});
