var passwordCheck, regflag1 = regflag2 = regflag3 = regflag4 = false, activeFlag = false;
$(document).ready(function (){
  $('#container').load('./pages/login.html', function () {
    $('<div></div>').load('./pages/register.html');
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
    return showErrorMessage('Passwords do not match!', $('input[name=password2]'));
  }
  registerUser();
});

$(document.body).on('keyup', '#register-form input[name=username]', function (e) {
  $('input[name="username"]').css('color', '#fff');
  var key =  String.fromCharCode(e.which);
  var elem = $('input[name=username]');
  if(/^[a-zA-Z0-9]*$/.test(elem.val()) == false) {
    elem.val(elem.val().substr(0, elem.val().length-1));
    showErrorMessage('No special character is allowed!', elem);
    return regflag1 = false;
  }else if(elem.val().length >= 6){
    checkAvailability();
  }
});
$(document.body).on('focusout', '#register-form input[name=username]', function (e) {
  var elem = $('input[name=username]');
  if(elem.val().length < 6){
    if(elem.val().length >= 1){
      regflag1 = false;
      return showErrorMessage('Username must be atleast 6 characters!', elem);
    }
    else
      return;
  }
});

function checkAvailability(){
  var userdata = {
    username: $('input[name="username"]').val()
  };
  $.ajax({
    url: '/userExist',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userdata)
  })
  .done(function (res) {
    if(res.status == "found"){
      showErrorMessage('Username not Available!',$('input[name="username"]'));
      regflag1 = false;
      return $('input[name="username"]').focus();
    }
    showErrorMessage('Username Available!',$('input[name="username"]'), "success");
    $('input[name="username"]').css('color', '#4f4');
    regflag1 = true;
  })
  .fail(function (err) {
    showErrorMessage('Connection Problem!',$('input[name="username"]'));
    regflag1 = true;
  });
}

$(document.body).on('focusout', 'input[name=email]', function (e) {
  var email = $('input[name="email"]').val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if(!emailReg.test( email )){
    regflag2 = false;
    return showErrorMessage('Provide a valid Email id!',$('input[name="email"]'));
  }else if(email.length >= 1){
    regflag2 = true;
  }
});

$(document.body).on('focusout', 'input[name=password]', function () {
  var elem = $('input[name=password]');
  if(elem.val().length < 6 && elem.val().length >= 1){
    showErrorMessage('Password must be atleast 6 characters long!', elem);
    elem.focus();
  }else{
    if( elem.val().length >= 1 && !( /\d/.test(elem.val()) && /[A-Z]/.test(elem.val()))){
      showErrorMessage('Password should contain atleast one Uppercase letter and a Digit!', elem);
      elem.focus();
    }
  }
});


$(document.body).on('keyup', 'input[name=password2]', function () {
  if($('input[name=password]').val() == $('input[name=password2]').val()){
    passwordCheck = true;
    makeitNormal(this);
    if($('input[name=password]').val().length >= 6){
      regflag4 = true;
    }
  }else{
    passwordCheck = false;
    makeitRed(this);
    regflag4 = false;
  }
});

function showErrorMessage(message, elem, status) {
  $(elem).parent().find('#errormessage').remove();
  if(status != "success")
    $(elem).after('<span id="errormessage"></span>');
  else
    $(elem).after('<span style="background-color: #4a4" id="errormessage"></span>');
  $('#errormessage').text(`${message}`);
  $('#errormessage').slideDown(100);
  $('#errormessage').fadeOut(5000);
}
function makeitRed(e){
  $(e).css({
    'color': "#f44",
    'border':'1px solid #f44'
  });
}
function makeitNormal(e){
  $(e).css({
    'color': "#fff",
    'border':'1px solid #299'
  });
}

$(document.body).on('keyup', 'input[name="phone"]', function (e) {
  var key =  String.fromCharCode(e.which);
  var elem = $('input[name="phone"]');
  if(/^[+0-9]*$/.test(elem.val()) == false) {
    elem.val(elem.val().substr(0, elem.val().length-1));
    showErrorMessage('Only Digits!', elem);
    regflag3 = false;
  }else if(elem.val().length == 10){
    regflag3 = true;
  }
});
$(document.body).on('focusout', 'input[name="phone"]', function (e) {
  var elem = $('input[name="phone"]');
  if(elem.val().length != 10 && elem.val().length >= 1){
    regflag3 = false;
    return showErrorMessage('Not a valid Phone Number!', elem);
  }
});
$(document.body).on('focusout keyup change', '#register-form input', function (e) {
  if(regflag1 && regflag2 && regflag3 && regflag4){
    if(!activeFlag){
      activeFlag = true;
      addSubmitListener();
    }
  }
  else if(activeFlag){
    removeSubmitListener();
    activeFlag = false;
  }
});

function removeSubmitListener(){
  $('#register-form input[type=submit]').attr('disabled', 'disabled');
  $('#register-me').toggleClass('disabled-button dohover');
}
function addSubmitListener() {
  $('#register-form input[type=submit]').removeAttr('disabled');
  $('#register-me').toggleClass('disabled-button dohover');
}

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
    phone: $('input[name="phone"]').val(),
    password: $('input[name="password"]').val()
  };
  $.ajax({
    url: '/register',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData)
  })
  .done(function(doc){
      showErrorMessage('Success! Redirecting...', $('#register-form'), "success");
      setTimeout(function () {
        $('#register-wrapper').slideUp(100,function () {
          $('#container').load('./pages/login.html', function () {
            $('#login-wrapper').slideDown(100);
          });
        });
      }, 2000);
  })
  .fail(function(error){
      showErrorMessage(error.responseJSON.message, $('#register-form'));
  });
  console.log(formData);
}
