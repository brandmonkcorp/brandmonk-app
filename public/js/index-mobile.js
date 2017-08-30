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
$(document.body).on('submit', '#login-form-mobile', function (e) {
  e.preventDefault();
  var credentials = {
    username: $('#login-form-mobile input[name=username]').val(),
    password: $('#login-form-mobile input[name=password]').val()
  };
  authenticate(credentials);
});
$(document.body).on('submit', '#register-form', function (e) {
  e.preventDefault();
  var formData = {
    name: $('#register-form input[name="firstname"]').val() + ' ' +  $('#register-form input[name="lastname"]').val(),
    email: $('#register-form input[name="email"]').val(),
    phone: $('#register-form input[name="phone"]').val(),
    password: $('#register-form input[name="password"]').val()
  };
  registerUser(formData);
});
