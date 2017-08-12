var passwordCheck;
$(document).ready(function (){
  $('#container').load('./pages/login.html', function () {
    $('#login-wrapper').show();
  });
});
$(document.body).on('submit', '#login-form', function (e) {
  e.preventDefault();
  authenticate();
});
$(document.body).on('submit', '#register-form', function (e) {
  e.preventDefault();
  if(!passwordCheck){
    $('#register-form').append('<span id="errormessage"></span>');
    $('#errormessage').text('Passwords do not match');
    console.log();
    $('#errormessage').slideDown(100);
    return $('#errormessage').fadeOut(5000);
  }
  registerUser();
});

$(document.body).on('keyup', 'input[name=password2]', function () {
  if($('input[name=password]').val() == $('input[name=password2]').val()){
    passwordCheck = true;
    $('input[name=password2]').css({
      'color': "#fff",
      'border':'1px solid #299'
    });
  }else{
    passwordCheck = false;
    $('input[name=password2]').css({
      'color': "#f44",
      'border':'1px solid #f44'
    });
  }
});

$(document.body).on('click', '#login', function () {
  $('#log-button').click();
});
$(document.body).on('click', '#register-me', function () {
  $('#reg-button').click();
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
  })
  .done(function(doc){
      console.log(doc);
      $('#errormessage').text('Success! Redirecting...').css('background-color', '#4a4');
      $('#errormessage').slideDown(100);
      $('#errormessage').fadeOut(3000, function () {
        $('#register-wrapper').slideUp(100,function () {
          $('#container').load('./pages/login.html', function () {
            $('#login-wrapper').slideDown(100);
          });
        });
      });
  })
  .fail(function(error){
      $('#register-form').append('<span id="errormessage"></span>');
      $('#errormessage').text(error.responseJSON.message);
      console.log(error);
      $('#errormessage').slideDown(100);
      return $('#errormessage').fadeOut(5000);
  });
  console.log(formData);
}
