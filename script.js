$(document).ready(function() {
  $('.dropdown .toggle, .dropdown a').on('click', function(e) {
    e.preventDefault();
    $('.dropdown .menu').slideToggle();
    return false;
  });
});
