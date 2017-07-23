$(document).ready(function(){
  App.init();
});

var Data = {

  delete_song: function(elem_id){
    Data.song_data.splice(elem_id-1, 1);
  },

  add_song: function(song_obj){
    Data.song_data.push(song_obj);
  },


  //load default song list from JSON
  song_data: song_information,

  song_selected: false,
  current_song: "",
  current_song_id: "",
  shuffle: false
}

var App = {
  init: function(){
    View.init();

    App.create_song_list();
    App.set_event_listeners();
  },
  
  set_event_listeners: function(){
    App.app_listeners();
    App.view_listeners();
  },

  app_listeners: function(){
    $(".display-row").on("click", App.clear_song_instance);
    $(".music-display").on("click", 
      ".display-row .fa-play, .display-row .fa-pause", 
      App.play_or_pause);
    $("#playback").bind("ended", App.song_ended);
  },

  view_listeners: function(){
    $(".fa-forward, .fa-backward").on('click', App.next_song);
    $("#playing").on("click", App.play_or_pause_CP);
    $(".fa-random").on('click', App.shuffle);

    $("#options .fa-trash").on('click', App.delete_song);
    $("#add-song-button").on('click', View.toggle_song_form);
    $("#submit-song").on('click', App.add_new_song);
  },

  clear_song_list: function(){
    $(".music-display .display-row").remove();
  },

  create_song_list: function(){
    App.clear_song_list();
      for(var i=0;i<Data.song_data.length;i++){
        $(".music-display").append(`
          <div id="song${Data.song_data[i]["id"]}" class="display-row not-playing">
            <div class="small-8 column"> 
              <audio id="playback" src="${Data.song_data[i]["url"]}"></audio>
              <i class="fa fa-play"></i>
              <p class="title"> ${Data.song_data[i]["title"]} </p>
              <p class="artist"> ${Data.song_data[i]["artist"]} </p>  
            </div>
          </div>   
          `);
          App.add_song_options(i);
      }
  },

  add_song_options: function(index){
    var song_id = $(`#song${Data.song_data[index]["id"]}`);
      var song_options = `
        <div id="options" class="small-4 column">
          <i class="fa fa-trash"></i>
        </div>
      `;
      $(song_id).append(song_options);
  },


  reset_app_state: function(){
    //resets event listener, clears song, etc
    App.generate_song_ids();
    App.create_song_list();
    App.clear_song_instance();
    App.rebind_listeners();
  },

  rebind_listeners: function(){
    $(".display-row").off()
    $(".display-row").on("click", App.clear_song_instance);
    $(".music-display").off();
    $(".music-display").on("click", 
      ".display-row .fa-play, .display-row .fa-pause", 
      App.play_or_pause);
    $("#options .fa-trash").off();
    $("#options .fa-trash").on('click', App.delete_song);
  },
  
  
  stop_playing: function(){
    $(".display-row i").each(function(index, element){
      var play_class = $(element).attr("class").split(" ")[1];
      if(play_class == "fa-pause"){
        $(element).attr('class', "fa fa-play");
      }  
    });
  },

  generate_song_ids: function(){
    $(".display-row").each(function(index, element){
      $(element).attr('id', `song${index+1}`);
      Data.song_data[index]["id"] = index+1;
    });
  },
  
  continue_playing: function(){
    $(".display-row").each(function(index, element){
      var play_class = $(element).attr("class").split(" ")[1];
      if(play_class == "playing"){
        $(".fa-play", element).attr('class', "fa fa-pause");
      }  
    });
  },
  
  add_nonplaying_classes: function(){
    $(".display-row").each(function(index, element){
      $(element).addClass("not-playing");
      $(element).removeClass("playing");
    })
  },
  
  play_or_pause: function(){
    var play_class = $(this).attr("class").split(" ")[1];
    if(play_class == "fa-play"){
      App.start_playback($(this));
    }
    else{
      $(this).removeClass("fa-pause");
      $(this).addClass("fa-play");
      View.pause();
      App.play_audio($(this), false);
    }
  },
  
  start_playback: function(element){
    Data.song_selected = true;
    Data.current_song_id = $(element).parent().parent().attr('id');
    
    App.update_view($(element))
    App.play_audio($(element), true);
  },

  song_ended: function(){
      console.log("playing stopped");
  },
  
  update_view: function(element){
    //responsible for updating song status
    App.stop_playing();
    View.is_playing($(element));
    View.update_playing($(element));
    $(element).removeClass("fa-play");
    $(element).addClass("fa-pause");
  },
  
  play_or_pause_CP: function(){
    //for currently playing part
    var play_class = $("#playing").attr('class').split(" ")[1];
    if(Data.song_selected){
      if(play_class == "fa-play"){
        View.play(); 
        Data.current_song.play();
      } 
      else{
        View.pause();
        Data.current_song.pause();
      }
    }
    
  },
  
  play_audio: function(element, play){
    var parent = $(element).parent();
    var song_url = $("audio", parent).attr("src");
    if(Data.current_song == ""){
      Data.current_song = new Audio(song_url);
    }
    if(play==false){ Data.current_song.pause(); }
    else{ Data.current_song.play();}
    
  },
  
  clear_song_instance: function(){
    //clears current audio instance with new song
    var play_id = $(this).attr("id");
    if(Data.current_song !== ""){
      if(play_id !== Data.current_song_id){ 
        Data.current_song.pause();
        Data.current_song=""
      }
    }
  },
  
  next_song: function(next){
    if(Data.current_song !== ""){
      if(Data.shuffle){
        App.shuffle_play();
      }
      else{
        App.play_next_song($(this));
      }       
    }
  },

  play_next_song: function(element){
      var current_track = parseInt(Data.current_song_id.match(/\d+/));
      var next = element.attr('class').split(" ")[1];
      var last_song = $(".music-display .display-row").length;
      
      if(current_track == 1 && next == "fa-backward"){ 
          var new_track = `song${last_song}`
      }
      else if(current_track == last_song && next == 'fa-forward'){
          var new_track = "song1";
      }  
      else if(next == "fa-forward"){
        var new_track = `song${parseInt(current_track)+1}`;
      }
      else{ var new_track = `song${parseInt(current_track)-1}`;}
      
      App.start_next(new_track);
  },

  shuffle: function(){
    Data.shuffle ? Data.shuffle = false : Data.shuffle = true;
 
    View.shuffle_toggle();

    if(!Data.song_selected){
      App.shuffle_play()
    }
  },

  shuffle_play: function(){
    Data.song_selected = true;

    var songs = $(".music-display .display-row").length;
    var random_song = Math.floor((Math.random() * songs)+1);
    var song_id = `song${random_song}`;
    if(song_id == Data.current_song_id){ App.shuffle_play() }
    else{ App.start_next(song_id); }
  },
  
  start_next: function(new_track){
    Data.current_song_id = new_track;
    App.clear_song_instance();
    var track_obj = $(`#${new_track} audio`);

    App.update_view(track_obj);
    App.play_audio(track_obj, true);
  },

  delete_song: function(){
    var element = $(this).parent().parent();
    element.remove();

    var elem_class = element.attr('class').split(" ")[1];

    if(elem_class == 'playing'){
      App.clear_song_instance();
      View.reset_currently_playing();
      View.shuffle_toggle();
    }
    var elem_id = element.attr('id').match(/\d+/)[0];
    Data.delete_song(elem_id);
    App.generate_song_ids();
    
  },

  add_new_song: function(){
    var song = $("#title").val();
    var artist = $("#artist").val();
    var song_url = $("#song-url").val();

    var song_obj = {};

    song_obj["title"] = song;
    song_obj["artist"] = artist;
    song_obj["id"] = Data.song_data.length+1;
    song_obj["url"] = song_url;

    if(song.length == 0 || artist.length == 0 || 
      song_url.length == 0 || !App.check_song_url()){
      App.handle_song_form_errors();
    }
    else{ App.add_song_successful(song_obj); }
  },

  add_song_successful: function(song_obj){
    View.toggle_form_error();
    Data.add_song(song_obj);
    View.clear_song_form();
    App.reset_app_state();
  },

  handle_song_form_errors: function(){
    var elem_class = $("#add-song-form").attr('class').split(" ")[1];
    if(!( elem_class == 'form-error')){
      View.toggle_form_error();
    }
  },

  check_song_url: function(){
    return true;
  }
}

var View = {

  init: function(){
    $("#add-song-form").hide();
  },

  is_playing: function(element){
    App.add_nonplaying_classes();
    var parent = $(element).parent().parent();
    parent.addClass("playing");
    parent.removeClass("not-playing");
  },
  
  update_playing: function(element){
    var parent = $(element).parent();
    var title = $(".title", parent).text();
    var artist = $(".artist", parent).text();
    
    $(".currently-playing .title").text(title);
    $(".currently-playing .artist").text(artist);
    
    View.play();
  },
  
  play: function(){
    var play_button = $("#playing");
    play_button.removeClass("fa-play");
    play_button.addClass("fa-pause");
    App.continue_playing();
  },
  
  pause: function(){
     var pause_button = $("#playing");
     pause_button.removeClass("fa-pause");
     pause_button.addClass("fa-play");
     App.stop_playing();
  },

  shuffle_toggle: function(){
    if(Data.shuffle){
      $("#shuffle").css({
        "color": "red",
        "font-size": "1.8em"
      });
    }
    else{
      $("#shuffle").css({
        "color": "white",
        "font-size": "1.5em"
      });
    }
  },

  reset_currently_playing: function(){
    View.pause();
    $(".currently-playing .title").text("");
    $(".currently-playing .artist").text("");
    Data.shuffle = false;
    Data.song_selected = false;
  },

  toggle_song_form: function(){
    if($("#add-song-form").is(":visible")){
      $("#add-song-form").hide();
    }
    else{
      $("#add-song-form").show();
    }
  },

  clear_song_form: function(){
    var song = $("#title").val("");
    var artist = $("#artist").val("");
    var song_url = $("#song-url").val("");
    $("#add-song-form").hide();
  },

  toggle_form_error: function(){
    $("#add-song-form").toggleClass("form-error");
  }
}