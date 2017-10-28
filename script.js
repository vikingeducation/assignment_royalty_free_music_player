$(document).ready(function() {
  $(document.body).on('click', '.play', function() {
    $(this).removeClass('play');
    $(this).addClass('pause');
  });
  $(document.body).on('click', '.pause', function() {
    $(this).removeClass('pause');
    $(this).addClass('play');
  });
});
