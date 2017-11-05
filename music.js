$(document).ready(function(){

control = $('#control');
play=$('.playm1');
pause=$('.pausem');
fwd=$('#fwd');
back=$('#skipback');
playM = $('#play');
var els;
var track = null;
var songs = [].slice.call(document.querySelectorAll('audio.track'));



$('.track1, .track2, .track3, .track4, .track5, .track6').click(function(e){
    
    els = $(this).find("img.cont:first")
	e.preventDefault();
	if (!$(els).hasClass('playm1')) {
 $(els).attr('src', "/images/playm.png");
$('.p2').attr('src', "/images/play.png");

	$(els).addClass('playm1');
	track[0].pause();
}   else { $(els).attr('src',"/images/pausem.png");
			
		   
          $('.titlepl').text($(this).find('.title').text());
          $('.artistp').text($(this).find('.artist').text());
$('.cont').not(els).attr('src', "/images/playm.png");
			$(this).find(".cont").removeClass('playm1');
			$('.p2').removeClass('playm');
			$('.p2').attr('src',"/images/pause1.png");
			if (track == null){
			track =$(this).find("audio.track:first")
			track[0].play()}
			else {track[0].pause();
			track =$(this).find("audio.track:first");

			track[0].play();
	
			}
			
}

});





$('.p2').click(function(e){
	if (track === null) {
		return false;
	}
	e.preventDefault();
	if (!$(this).hasClass('playm')) {
$(this).attr('src', "/images/play.png");
$('.cont').attr('src', "/images/playm.png");
$('.cont').addClass('playm1');
$(this).addClass('playm');
track[0].pause();
}   else { $(this).attr('src', "/images/pause1.png");
els.attr('src',"/images/pausem.png"); 

			$('.cont').removeClass('playm1');
	$(this).removeClass('playm');
	track[0].play();
	
	
	
};


});






$('.back').click(function(e) {
	e.preventDefault;
	if (track === null) {
			return false
		};
	var idx = songs.indexOf(track[0]);
	if (idx > 0) {
		$('.track' + idx).click();
		
	}



});

$('.fwd').click(function(e) {
e.preventDefault;
if (track === null) {
	return false;
};

var idx = songs.indexOf(track[0]); 
if (idx < 5) {
	$('.track' + (idx+2)).click();
};




});

});










