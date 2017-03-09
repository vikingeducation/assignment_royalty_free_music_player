
  var royalty = {

    playing: false,

    init: function() {

      var $currentTrack = $( $("#songlist li").eq(0));

      $("#songlist").click(function(event) {
        if (royalty.playing) {
          if(audio($currentTrack) === audio($(event.target))) {
          royalty.pause($currentTrack);
          } else {
          royalty.stop($currentTrack);
          $currentTrack = $(event.target);
          royalty.play($currentTrack);
          }
        } else {
            $currentTrack = $(event.target);
            royalty.play($currentTrack);
        }
        royalty.updatePlayBut(royalty.playing);
      });

      var audio = function(obj) {
        return obj.children("audio")[0];
      };

      $("#play-button").click(function() {
        if (royalty.playing) {
          royalty.pause($currentTrack);
        } else {
          royalty.play($currentTrack);
        }
        royalty.updatePlayBut(royalty.playing);
      });

      $("#next-skip").click(function() {
        if ($currentTrack.next().length > 0) {
        royalty.stop($currentTrack);
        var nextsong = $currentTrack.next();
        royalty.play(nextsong);
        $currentTrack = nextsong;
        } else {
        royalty.stop($currentTrack);
        var $firstsong = $('#songlist li').first();
        royalty.play($firstsong);
        $currentTrack = $firstsong;
      }
      });

      $("#prev-skip").click(function() {
        if ($currentTrack.prev().length > 0) {
        royalty.stop($currentTrack);
        var prevsong = $currentTrack.prev();
        royalty.play(prevsong);
        $currentTrack = prevsong;
        }  else {
          royalty.stop($currentTrack);
          var $lastsong = $('#songlist li').last();
          royalty.play($lastsong);
          $currentTrack = $lastsong;
        }
      });



    },


    stop: function($currentTrack) {
      royalty.playing = false;
      var curAudio = $currentTrack.children("audio")[0];
      curAudio.pause();
      curAudio.currentTime = 0;
    },

    play: function($currentTrack) {
      royalty.playing = true;
      if($('.playing').length > 0) $('.playing').removeClass();
      $currentTrack.addClass('playing');
      $string = $currentTrack.text();
      $arr = $string.split(' ');
      var x = $arr.indexOf('-');
      var songwords = $arr.splice(0,x);
      var songN = songwords.join(' ');
      var artistword = $arr.splice(1);
      var artistN = artistword.join(' ');
      $('#songname-foot').text(songN);
      $('#artist-foot').text(artistN);
      $currentTrack.children("audio")[0].play();
    },

    pause: function($currentTrack) {
      royalty.playing = false;
      $currentTrack.children("audio")[0].pause();
    },

    updatePlayBut: function(playing) {
      if (playing) {
        $('#play-button').removeClass("play").addClass('pause');
        $('i').removeClass("fa fa-play").addClass('fa fa-pause');
      } else {
        $('#play-button').removeClass("pause").addClass('play');
        $('i').removeClass("fa fa-pause").addClass('fa fa-play');
      };
    }

  };




$(document).ready(function() {
  royalty.init();
});
