var player;
$(document).ready(function() {
  player = new Player();
  player.play(4);
  player.setup_click_listeners();
  player.toggle_play_bar();
});


Player = function() {
  var urls = [
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_01_-_Simple_Pleasures.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_02_-_Dead_Disco.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_04_-_Fifteen.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_05_-_Garble_House.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_06_-_Lulla_Bye.mp3',
    //'assets/music/Henry_Homesweet/Henry_Homesweet_-_07_-_Micro_Love.mp3',      //getting an error with this one
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_08_-_Okiirobo_Navigation_System.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_09_-_Satori.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_10_-_Sprite_Heart_Bleeds_No_More.mp3',
    'assets/music/Henry_Homesweet/Henry_Homesweet_-_11_-_Static_Minimal.mp3'
  ]
  var titles = [
    'Simple Pleasures',
    'Dead Disco',
    'Fifteen',
    'Garble House',
    'Lulla Bye',
    //'Micro Love',    //getting an error with this one
    'Okiirobo Navigation System',
    'Satori',
    'Sprite Heart Bleeds No More',
    'Static Minimal'
  ]
  this.tracks = urls.map( function(string, i) {
    var audio = new Audio(string);
    var track = {
      'audio': audio,
      'title': titles[i],
      'format': '.mp3',
      'artist': 'Henry Homesweet'
    }
    return track;
  })

  //make the track elements

  this.$tracks = this.tracks.map( function( element, i ) {

    var $wrapper = $("<div></div>")
      .addClass("track")
      .addClass('off')

      //create our play button
    var $play = $("<button></button>")
      .addClass("btn play-button")
      .appendTo( $wrapper );

    var $span = $("<span></span>")
      .addClass("glyphicon")
      .addClass("glyphicon-play")
      .appendTo( $play );


      //create our song info
    var $info = $("<div></div>")
      .addClass("track-info")
      .appendTo( $wrapper );

    var $title = $("<p></p>")
      .addClass("track-title")
      .text( element['title'] )
      .appendTo( $info );

    var $artist = $("<p></p>")
      .addClass("track-artist")
      .text( element['artist'] )
      .appendTo( $info );

    $( "#play-bar" ).before( $wrapper )
    return $wrapper
  })

  //this is the audio file
  this.now_playing = this.tracks[0]['audio'];

  //play next song
  this.next = function(){
    var _this = window.player;
    var index = _this.get_track_index( _this.now_playing ) + 1
    if ( _this.tracks.length - 1 < index ){
      index = 0;
    }
    _this.play( index );
  }
  //play previous song
  this.previous = function(){
    var _this = window.player;
    var index = _this.get_track_index( _this.now_playing ) - 1
    if ( index < 0 ){
      index = 0;
    }
    _this.play( index );
  }
  this.toggle_play_bar = function() {
    var $play_button = $("#play").children();

    if ( this.now_playing.paused ){
      //music was unpaused
      $play_button.removeClass('glyphicon-pause');
      $play_button.addClass("glyphicon-play-circle");

    }else {
      $play_button.removeClass('glyphicon-play-circle');
      $play_button.addClass("glyphicon-pause");
    }
  }
  this.toggle_track = function( index ) {
    //if paused
    if ( this.tracks[ index ]['audio'].paused ){
      this.$tracks[ index ].children("button").children().removeClass("glyphicon-pause");
      this.$tracks[ index ].children("button").children().addClass("glyphicon-play");
    }else {
      this.$tracks[ index ].children("button").children().removeClass("glyphicon-play");
      this.$tracks[ index ].children("button").children().addClass("glyphicon-pause");
    }
  }

  //start a different song
  this.play = function(index){
    var _this = window.player;

    //stop the last track
    this.now_playing.pause()
    player.now_playing.currentTime = 0;
    this.toggle_track( this.get_track_index(this.now_playing) );

    //update the play-bar
    var $track_wrapper = _this.$tracks[index]
    var title_string = $track_wrapper.children().children().filter(".track-title").text();
    var artist_string = $track_wrapper.children().children().filter(".track-artist").text();


    $("#play-bar .track-title").text( title_string );
    $("#play-bar .track-artist").text( artist_string );



    _this.tracks[index]['audio'].play();
    _this.now_playing = _this.tracks[index]['audio'];
    _this.now_playing.addEventListener('ended', _this.next, "once")

    //change the buttons
    this.toggle_track( index );
    this.toggle_play_bar();


  }
  //pause song
  this.pause = function( index ){
    var _this = window.player;
    _this.now_playing.pause();

    //change buttons
    this.toggle_track( this.get_track_index( this.now_playing ) );
    this.toggle_play_bar();

  }
  //resume playing
  this.resume = function( index ){
    var _this = window.player;
    _this.now_playing.play();

    //change buttons
    this.toggle_track( this.get_track_index( this.now_playing ) );
    this.toggle_play_bar();

  }
  this.get_track_index = function( song ) {
    var _this = window.player;
    for( var i = 0; i < _this.tracks.length; i++){
      if ( _this.tracks[i]['audio'] == song ){
        return i;
      }
    }
  }

  //setup click listeners for the tracks

  this.setup_click_listeners = function(){

    this.$tracks.forEach( function( $track, i ){
        $track.on("click", function( e ){
            var _this = window.player;
            _this.clicked( e, $track )
        })
    })
    $("#last").on("click", function(){
      window.player.previous();
    })
    $("#next").on("click", function(){
      window.player.next();
    })
    $("#play").on("click", function(){
      window.player.play_button_clicked();
    })
  }
  this.play_button_clicked = function(){
    if ( this.now_playing.paused ){
      this.resume();
    }else{
      this.pause();
    }
  }

  //the user clicked a track
  this.clicked = function( e, $track ){
    //match the track
    var index = 0;
    for( var i = 0; i < this.$tracks.length; i++ ){
      if ( this.$tracks[i] == $track ){
        index = i;
        break;
      }
    }

    //find out if that track is playing
    if ( this.now_playing == this.tracks[ index ]['audio'] ){
      //it's either paused or playing
      if ( this.now_playing.paused ){
        //resume it
        this.resume( index );
      }else {
        //pause it
        this.pause( index );
      }
    }else {
      //play the track
      this.play( index );
    }

  }



}
