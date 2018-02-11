var token_pass;
var passwordCheck, passwordCheck2, regflag1 = regflag2 = regflag3 = regflag4 = false, activeFlag = false;
var em_count = 0;
$(document).ready(function () {
  token_pass = getParam();
});
$(document.body).on('focusout', '#input-container input[name=password1]', function () {
  var elem = $('#input-container input[name=password1]');
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
  if($('#input-container input[name=password1]').val() == $('input[name=password2]').val()){
    passwordCheck = true;
    makeitNormal(this);
    if(passwordCheck2){
      regflag4 = true;
      $('#reset-password-button').css("background-color","#0070c0");
      $('#reset-password-button').css("color", "#eee");
      $('#reset-password-button').hover(function(){
        $(this).css("background-color", "#eee");
        $(this).css("color","#295");
      },
      function(){
        $(this).css("background-color", "#0070c0");
        $(this).css("color","white");
      }
    );
      $('#reset-password-button').css("background-color", "#0070c0");
      $('#reset-password-button').css("color","white");
      $('#reset-password-button').prop('disabled', false);
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

$(document.body).on('focusout keyup change', 'input-container input', function (e) {
  if(regflag4){
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
function removeSubmitListener(){
  $('#reset-password-button').attr('disabled', 'disabled');

}
function addSubmitListener() {
  $('#reset-password-button').removeAttr('disabled');

}
  $(document.body).on('click', '#reset-password-button', function () {
    var password = $('input[name=password1]').val();
    $.ajax({
      url: '/passwordReset',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"password" : password}),
      headers:{
        'x-auth': token_pass
      }
    })
    .done(function (data, status, response) {
      if(data.status == "success"){
        $('#input-container').html('<span id="password-brief" style="font-size: 3vw;color: #295;text-align:center">Success!</span>');
        $('#input-container').append('<span id="home-button" class="button-password">Back to Home!</span>');
        $('#icon-div1').css('background-image', 'url("../images/icons/password-updated.png")');
      }
    })
    .fail(function (err) {
      console.log('fail');
    });
  });
  $(document.body).on('click', '#home-button', function () {
    window.open('../');
  });

function getParam() {
  var path = $(location).attr('href');
  var lastIndex = path.lastIndexOf('?') + 6;
  var token = path.substr(lastIndex, path.length);
  return token;
}
