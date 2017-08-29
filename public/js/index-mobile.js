$(document).ready(function (){
  $('#login-box-mobile').load('./pages_mobile/login-form');
});

$(document.body).on('click', '#register-mobile', function () {
  $('#loading').css('visibility', 'visible');
  $('#login-box-mobile').load('./pages_mobile/register-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
$(document.body).on('click', '#back-to-login', function () {
  $('#loading').css('visibility', 'visible');
  $('#login-box-mobile').load('./pages_mobile/login-form', function () {
    $('#loading').css('visibility', 'hidden');
  });
});
