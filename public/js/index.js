var passwordCheck, passwordCheck2, regflag1 = regflag2 = regflag3 = regflag4 = false, activeFlag = false;
var em_count = 0;
var token = Cookies.get('_LOC_authFirstPID');
if(!token){
  var token = Cookies.get('_PERM_authUID');
  if(!token){
    token = Cookies.get('_LOC_authUID');
    }
}
$(document).ready(function (){
  $(document.body).css('visibility', 'hidden');
  doConnect();
  $('#login-wrapper').load('./pages/login');
  $('#register-wrapper').load('./pages/register');
});

function doConnect() {
  $.ajax({
    url: '/auth',
    method: 'GET',
    contentType: 'text/html',
    headers:{
      'x-auth': token
    }
  }).done(function (data){
    window.location.replace('/home');
  }).fail(function (e){
    $(document.body).css('visibility', 'visible');
  });
}
$(document.body).on('submit', '#login-form', function (e) {
  e.preventDefault();
  if( ($('#login-form input[name=email-log]').val() == "") || ( $('#login-form input[name=password-log]').val() == "")){
    return showErrorMessage('Fields can\'t be empty !',$('#login-form'));
  }
  var credentials = {
    email: $('#login-form input[name=email-log]').val(),
    password: $('#login-form input[name=password-log]').val()
  };
  authenticate(credentials);
});
$(document.body).on('submit', '#register-form', function (e) {
  e.preventDefault();

  if(!passwordCheck){
    return showErrorMessage('Passwords do not match!', $('#register-form input[name=password]'));
  }

  else if(!(regflag1 && regflag2 && regflag3 && regflag4)){
    return showErrorMessage('All fields must be valid!', $('#register-form input[name=password]'));
  }else{
    var formData = {
      name: $('#register-form input[name="firstname"]').val() + ' ' +  $('#register-form input[name="lastname"]').val(),
      email: $('#register-form input[name="email"]').val(),
      phone: $('#register-form input[name="phone"]').val(),
      password: $('#register-form input[name="password"]').val()
    };
    registerUser(formData);
  }
});
$(document.body).on('click', '#register', function () {
  $('#register-form-submit').click();
});

$(document.body).on('focusout', '#register-form input[name=email]', function (e) {
  var elem = $('#register-form input[name=email]');
  if(elem.val().length < 6){
    if(elem.val().length >= 1){
      regflag1 = false;
      return showErrorMessage('Email must be atleast 6 characters!', elem);
    }
  }
  var email = $('#register-form input[name="email"]').val();
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if((!emailReg.test( email )) && email.length != 0){
    regflag2 = false;
    showErrorMessage('Provide a valid Email id!',elem);
    return $('#register-form input[name="email"]').focus();
  }else if(email.length >= 1){
    regflag2 = true;
  }
  $('#register-form input[name="email"]').css('color', '#000');
  var key =  String.fromCharCode(e.which);
  var elem = $('#register-form input[name="email"]');
  if(elem.val().length >= 6){
    checkAvailability();
  }
});

function checkAvailability(){
  var userdata = {
    email: $('#register-form input[name="email"]').val()
  };
  $.ajax({
    url: '/userExist',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(userdata)
  })
  .done(function (res) {
    if(res.status == "found"){
      showErrorMessage('Email already in use!',$('#register-form input[name="email"]'));
      regflag1 = false;
      return $('#register-form input[name="email"]').focus();
    }
    showErrorMessage('Email Available!',$('#register-form input[name="email"]'), "success");
    regflag1 = true;
  })
  .fail(function (err) {
    showErrorMessage('Connection Problem!',$('#register-form input[name="email"]'));
    regflag1 = true;
  });
}

$(document.body).on('focusout', '#register-form input[name=password]', function () {
  var elem = $('#register-form input[name=password]');
  if(elem.val().length < 6 && elem.val().length >= 1){
    showErrorMessage('Password must be atleast 6 characters long!', elem);
    passwordCheck2 = false;
  }else{
    if( elem.val().length >= 1 && !( /\d/.test(elem.val()) && /[A-Z]/.test(elem.val()))){
      passwordCheck2 = false;
      showErrorMessage('Password should contain atleast one Uppercase letter and a Digit!', elem)
    }else{
        passwordCheck2 = true;
    }
  }
});


$(document.body).on('keyup', 'input[name=password2]', function () {
  if($('#register-form input[name=password]').val() == $('input[name=password2]').val()){
    passwordCheck = true;
    makeitNormal(this);
    if(passwordCheck2){
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
  var id = `em-${parent}-${name}-${em_count++}`;
  $(elem).parent().find(`span[id^=em]`).remove();
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
    'color': "#000",
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
  $('#register-form button').attr('disabled', 'disabled');
  $('#register').toggleClass('disabled-button dohover');
}
function addSubmitListener() {
  $('#register-form button').removeAttr('disabled');
  $('#register').toggleClass('disabled-button dohover');
}
function authenticate(credentials) {
  console.log(credentials);
  $.ajax({
    url: '/loginUser',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  }).done(function (data, status, response) {
    token = response.getResponseHeader('x-auth');

    if($('#login-form input[name=remember]').is(':checked') ){
      Cookies.remove('_PERM_authUID');
      Cookies.set('_PERM_authUID', token, { expires: 3650});
    }else{
      Cookies.remove('_LOC_authUID');
      Cookies.set('_LOC_authUID', token);
    }
    if(data.message == 'home'){
      window.location.replace('/home');
    }
    else {
      window.location.replace('/profile')
    }
    //showErrorMessage('You are Successfully Logged in!', $('#login-form'), "success");
  }).fail(function () {
    showErrorMessage('Invalid username/password !', $('#login-form'));
  });
}
function registerUser(formData) {

  $.ajax({
    url: '/registerUser',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData)
  })
  .done(function(doc, status, response){
    var token = response.getResponseHeader('x-auth');
      Cookies.set('_LOC_authFirstPID', token);
      window.location.replace('../profile');
  })
  .fail(function(error){
      showErrorMessage(error.responseJSON.message, $('#login-form'));
  });
}
$(document.body).on('click', '#forgot-password', function () {
  window.open('password-recovery.html', '_blank');
});
