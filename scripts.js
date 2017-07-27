"use strict";
$( document ).ready(function() {

  $('.song-list ul li').on('click', 'i.play', function(e){
    $(this).parent().find('.song-details audio').trigger('load');
    $(this).parent().find('.song-details audio').trigger('play');
    $(this).parent().addClass('active');
    $(this).text('pause')
            .removeClass('play')
            .addClass('pause');
  });

  $('.song-list ul li').on('click', 'i.pause', function(e){
    $(this).parent().find('.song-details audio').trigger('pause');
    $(this).parent().removeClass('active');
    $(this).text('play_arrow')
            .removeClass('pause')
            .addClass('play');
  });




    // $(this).parent().find('.song-details p').first().css('border', '1px solid blue');

    // console.log(
    //   $(this).parent().find('.song-details audio source').attr('src')
    //   );





  // //starts playing
  // $(".audioDemo").trigger('play');
  // //pause playing
  // $(".audioDemo").trigger('pause');

  // $('header').on('click', 'h1', function(e){
  //   console.log($(this).text());
  // });





});