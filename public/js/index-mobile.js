$(document).ready(function (){

});


$(document.body).on('click', '#mobile-login-button', function () {
  $('#loading').css('visibility', 'visible');
  $(document.body).load('./pages_mobile/login-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
$(document.body).on('click', '#mobile-register-button', function () {
  $('#loading').css('visibility', 'visible');
  $(document.body).load('./pages_mobile/register-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
$(document.body).on('click', '#register-mobile', function () {
  $('#loading').css('visibility', 'visible');
  $(document.body).load('./pages_mobile/register-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
$(document.body).on('click', '#back-to-login', function () {
  $('#loading').css('visibility', 'visible');
  $(document.body).load('./pages_mobile/login-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
