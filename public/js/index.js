$(document).ready(function (){
  $('#container').load('./pages/login.html', function () {
    $('#login-wrapper').show();
  });
});
$('#login-form').submit(function (e) {
  e.preventDefault();
  authenticate();
});
$('#register-form').submit(function (e) {
  e.preventDefault();
  registerUser();
});

$(document.body).on('click', '#login', function () {
  authenticate();
});
$(document.body).on('click', '#register-me', function () {
  registerUser();
});

$(document.body).on('click', '#register', function () {
  $('#login-wrapper').slideUp(100,function () {
    $('#container').load('./pages/register.html', function () {
      $('#register-wrapper').slideDown(100);
    });
  });
});
$(document.body).on('click', '#back-to-login', function () {
  $('#register-wrapper').slideUp(100,function () {
    $('#container').load('./pages/login.html', function () {
      $('#login-wrapper').slideDown(100);
    });
  });
});
function authenticate() {

}
function registerUser() {
  var formData = {
    name: $('input[name="name"]').val(),
    username: $('input[name="username"]').val(),
    email: $('input[name="email"]').val(),
    password: $('input[name="password"]').val()
  };
  $.ajax({
    url: '/register',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData)
  }).done(function(doc){
      console.log(doc);
  })
    .fail(function(){
      console.log('unable to create user');
  });
  console.log(formData);
}
