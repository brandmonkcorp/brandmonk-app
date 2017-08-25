var X_PID_AUTH = Cookies.get('_LOC_authFirstPID');
if(!X_PID_AUTH){
  X_PID_AUTH = Cookies.get('_LOC_authUID');
}
$(document).ready(function () {
  checkAuth();
});
$('#start').click(function () {
  $('#intro').fadeOut(1000, function () {
    $('#container').css('visibility', 'visible');
    $('#basic-info').css('visibility', 'visible');
  });
});

function checkAuth() {
  $.ajax({
    url: '/profile',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': X_PID_AUTH
    }
  })
  .done(function(doc){
      if(doc.message == 'activated'){
        nextLoad();
      }else if(doc.message == 'deactivated'){
        console.log('Account created');
        $(document.body).load('../pages/activate-account.html', function () {
          $('#name-activate').text(doc.sendData.name);
          $('#email-activate').text(doc.sendData.email);
        });
      }else if(doc.message == 'redirect'){
        window.location.replace('../home.html');
      }
  })
  .fail(function(error){
    return $(document.body).load('../pages/error.html');
  });
}


$('.tabs').click(function () {
  var id = $(this).attr('id');
  var targetId = id.substr(0, id.length - 4);
  $('.tabs').removeClass('tabs-now');
  $(this).addClass('tabs-now');
  $('.info-class').css('visibility', 'hidden');
  $(`#${targetId}`).css('visibility', 'visible');
});

function nextLoad() {
  $('#intro').fadeIn(2000);
  $('#basic-info').load('./pages/basic-info.html', function () {
    $('#photo-container').load('./pages/photo.html');
  });
  $('#ad-pref').load('./pages/ad-pref.html');
  $('#identification').load('./pages/identification.html');
  $('#profile').load('./pages/prof.html');
}
