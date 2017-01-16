$(document).ready(function() {
  
  $('#reset').click(function() {
    $('.envelope').removeClass('open');
    setTimeout(function() {
      $('.envelope').addClass('open');
    }, 1500);
  });
  
});