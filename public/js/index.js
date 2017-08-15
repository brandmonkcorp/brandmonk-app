var passwordCheck, regflag1 = regflag2 = regflag3 = regflag4 = false, activeFlag = false;
$(document).ready(function (){
  $('#login-wrapper').load('./pages/login.html');
  $('#register-wrapper').load('./pages/register.html');
});
$(document.body).on('submit', '#login-form', function (e) {
  e.preventDefault();
  if( ($('#login-form input[name=username]').val() == "") || ( $('#login-form input[name=password]').val() == "")){
    return showErrorMessage('Fields can\'t be empty !',$('#login-form'));
  }
  authenticate();
});
$(document.body).on('submit', '#register-form', function (e) {
  e.preventDefault();
  if(!passwordCheck){
    return showErrorMessage('Passwords do not match!', $('#register-form input[name=password2]'));
  }
  registerUser();
});

$(document.body).on('keyup', '#register-form input[name=username]', function (e) {
  $('#register-form input[name="username"]').css('color', '#fff');
  var key =  String.fromCharCode(e.which);
  var elem = $('#register-form input[name=username]');
  if(/^[a-zA-Z0-9]*$/.test(elem.val()) == false) {
    elem.val(elem.val().substr(0, elem.val().length-1));
    showErrorMessage('No special character is allowed!', elem);
    return regflag1 = false;
  }else if(elem.val().length >= 6){
    checkAvailability();
  }
});
$(document.body).on('focusout', '#register-form input[name=username]', function (e) {
  var elem = $('#register-form input[name=username]');
  if(elem.val().length < 6){
    if(elem.val().length >= 1){
      regflag1 = false;
      return showErrorMessage('Username must be atleast 6 characters!', elem);
    }
  }
});

function checkAvailability(){
  var userdata = {
    username: $('#register-form input[name="username"]').val()
  };
  $.ajax({
    url: '/userExist',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userdata)
  })
  .done(function (res) {
    if(res.status == "found"){
      showErrorMessage('Username not Available!',$('#register-form input[name="username"]'));
      regflag1 = false;
      return $('#register-form input[name="username"]').focus();
    }
    showErrorMessage('Username Available!',$('#register-form input[name="username"]'), "success");
    $('#register-form input[name="username"]').css('color', '#4f4');
    regflag1 = true;
  })
  .fail(function (err) {
    showErrorMessage('Connection Problem!',$('#register-form input[name="username"]'));
    regflag1 = true;
  });
}

$(document.body).on('focusout', '#register-form input[name=email]', function (e) {
  var email = $('#register-form input[name="email"]').val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if((!emailReg.test( email )) && email.length != 0){
    regflag2 = false;
    return showErrorMessage('Provide a valid Email id!',$('#register-form input[name="email"]'));
  }else if(email.length >= 1){
    regflag2 = true;
  }
});

$(document.body).on('focusout', '#register-form input[name=password]', function () {
  var elem = $('#register-form input[name=password]');
  if(elem.val().length < 6 && elem.val().length >= 1){
    showErrorMessage('Password must be atleast 6 characters long!', elem);
  }else{
    if( elem.val().length >= 1 && !( /\d/.test(elem.val()) && /[A-Z]/.test(elem.val()))){
      showErrorMessage('Password should contain atleast one Uppercase letter and a Digit!', elem)
    }
  }
});


$(document.body).on('keyup', 'input[name=password2]', function () {
  if($('#register-form input[name=password]').val() == $('input[name=password2]').val()){
    passwordCheck = true;
    makeitNormal(this);
    if($('#register-form input[name=password]').val().length >= 6){
      regflag4 = true;
    }
  }else{
    passwordCheck = false;
    makeitRed(this);
    regflag4 = false;
  }
});

function showErrorMessage(message, elem, status) {
  var parent = $(elem).parent().attr('id');
  var name = $(elem).attr('name') || $(elem).attr('id');
  var id = `em-${parent}-${name}`;
  $(elem).parent().find(`#${id}`).remove();
  if(status != "success")
    $(elem).after(`<span class="errormessage" id="${id}"></span>`);
  else
    $(elem).after(`<span style="background-color: #4a4" class="errormessage" id="${id}"></span>`);
  $(`#${id}`).text(`${message}`);
  $(`#${id}`).slideDown(100);
  $(`#${id}`).fadeOut(7000, function (){
    $(`#${id}`).remove();
  });
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

$(document.body).on('keyup', '#register-form input[name="phone"]', function (e) {
  var key =  String.fromCharCode(e.which);
  var elem = $('#register-form input[name="phone"]');
  if(/^[0-9]*$/.test(elem.val()) == false) {
    elem.val(elem.val().substr(0, elem.val().length-1));
    showErrorMessage('Only Digits!', elem);
    regflag3 = false;
  }else if(elem.val().length == 10){
    regflag3 = true;
  }
});
$(document.body).on('focusout', '#register-form input[name="phone"]', function (e) {
  var elem = $('#register-form input[name="phone"]');
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
  $('#login-wrapper').css({'visibility': 'hidden'});
  $('#register-wrapper').css({'visibility': 'visible'});
});
$(document.body).on('click', '#back-to-login', function () {
  $('#register-wrapper').css({'visibility': 'hidden'});
  $('#login-wrapper').css({'visibility': 'visible'});
});
function authenticate() {
  var credentials = {
    username: $('#login-form input[name=username]').val(),
    password: $('#login-form input[name=password]').val()
  };
  $.ajax({
    url: '/login',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  }).done(function (data, status, response) {
    token = response.getResponseHeader('x-auth');

    if($('#login-form input[name=remember]').is(':checked') ){
      Cookies.remove('_PERM_authUID');
      Cookies.set('_PERM_authUID', token, {secure: true, expires: 3650});
    }else{
      Cookies.remove('_LOC_authUID');
      Cookies.set('_LOC_authUID', token, {secure: true);
    }
    window.location.replace('/home.html');
    //showErrorMessage('You are Successfully Logged in!', $('#login-form'), "success");
  }).fail(function () {
    showErrorMessage('Invalid username/password !', $('#login-form'));
  });
}
function registerUser() {
  var formData = {
    name: $('#register-form input[name="name"]').val(),
    username: $('#register-form input[name="username"]').val(),
    email: $('#register-form input[name="email"]').val(),
    phone: $('#register-form input[name="phone"]').val(),
    password: $('#register-form input[name="password"]').val()
  };
  $.ajax({
    url: '/register',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData)
  })
  .done(function(doc){
      showErrorMessage('Success! Redirecting...', $('#register-form'), "success");
      removeSubmitListener();
      setTimeout(function (){
        $('#register-form input').val('');
        $('#login-form input[name=username]').val(formData.username);
        $('#login-form input[name=password]').val('');
        $('#register-wrapper').css({'visibility': 'hidden'});
        $('#login-wrapper').css({'visibility': 'visible'});
      },3000);
  })
  .fail(function(error){
      showErrorMessage(error.responseJSON.message, $('#register-form'));
  });
}
