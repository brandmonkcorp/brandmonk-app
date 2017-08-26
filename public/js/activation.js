$(document).ready(function () {
  var token = getParam();
  $.ajax({
    url: '/activateUser',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(doc){
    console.log(doc.message);
    if(doc.message == 'done'){
      $('#wrapper-activation').css('visibility', 'visible');
    }else if(doc.message == 'activated'){
      $('#wrapper-activation #password-brief').text('Your account is already Activated!').css('visibility', 'visible');
    }
  })
  .fail(function(error){
    $(document.body).load('../pages/error');
  });
});

function getParam() {
  var path = $(location).attr('href');
  var lastIndex = path.lastIndexOf('?') + 6;
  var token = path.substr(lastIndex, path.length);
  Cookies.set('_LOC_authFirstPID', token);
  return token;
}
