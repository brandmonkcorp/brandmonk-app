var token_pass_change;
$('#forgot-pass-button').click(function () {
  var username = $('input[name=forgot_password_username]').val();
  var mobile = $('input[name=forgot_password_mobile]').val();
  checkCombo(username, mobile);
});

function checkCombo(username, mobile) {
  $.ajax({
    url: '/passwordRecov',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"username" : username, "phone": mobile})
  })
  .done(function (data, status, response) {
    token_pass_change = response.getResponseHeader('x-auth');
    if(data.message == "match"){
      $('#input-container').load('./pages/forgot-pass-choose');
    }else{
      showErrorMessage(data.message, $('input[name=forgot_password_mobile]'));
    }
  })
  .fail(function (err) {
    $(document.body).load('../pages/error');
  });
}
$(document.body).on('click', '#change-it-now', function () {
  $(document.body).load('../reset-password');
});

$(document.body).on('click', '#email-me', function () {
  sendPasswordResetRequest();
});
function sendPasswordResetRequest() {
  $.ajax({
    url: '/resetPass',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': token_pass_change
    }
  })
  .done(function (data, status, response) {

      $('#input-container')
      .html('<span id="password-brief" style="font-size: 3vw;color: #295;text-align:center">A password reset link has been sent to your registered email!</span>');
      $('#input-container').append('<span id="home-button" class="button-password">Back to Home!</span>');
      $('#icon-div').css('background-image', 'url("../images/icons/password-updated.png")');

  })
  .fail(function (err) {
    console.log('fail');
  });
}

$(document.body).on('click', '#reset-password-button', function () {
  var password = $('input[name=password1]').val();
  $.ajax({
    url: '/passwordReset',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"password" : password}),
    headers:{
      'x-auth': token_pass_change
    }
  })
  .done(function (data, status, response) {
    if(data.status == "success"){
      $('#input-container').html('<span id="password-brief" style="font-size: 3vw;color: #295;text-align:center">Success!</span>');
      $('#input-container').append('<span id="home-button" class="button-password">Back to Home!</span>');
      $('#icon-div').css('background-image', 'url("../images/icons/password-updated.png")');
    }
  })
  .fail(function (err) {
    console.log('fail');
  });
});
$(document.body).on('click', '#home-button', function () {
  window.location.replace('../page.html');
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
