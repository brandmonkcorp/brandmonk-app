$(document).ready(function (){
  $('#login-box-mobile').load('./pages_mobile/login-form');
});

$(document.body).on('click', '#register-mobile', function () {
  $('#login-box-mobile').load('./pages_mobile/register-form');
});
$(document.body).on('click', '#back-to-login', function () {
  $('#login-box-mobile').load('./pages_mobile/login-form');
});
