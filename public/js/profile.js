var X_PID_AUTH = Cookies.get('_PERM_authUID');
if(!X_PID_AUTH){
  X_PID_AUTH = Cookies.get('_LOC_authUID');
  if(!X_PID_AUTH){
    X_PID_AUTH = Cookies.get('_LOC_authFirstPID')
    if(!X_PID_AUTH){
      $(document.body).load('../pages/error');
    }
  }
}
var profiledata, c1 = c2 = c3 = false;
$(document).ready(function () {
  checkAuth();
  basicdata = new basicData();
  basicprofiledata = new basicProfileData();
});
$('#start').click(function () {
  $('#intro').fadeOut(1000, function () {
    $('#container').show();
    $('#basic-info').css('visibility', 'visible');
    $('#basic-info').css('display', 'block');
  });
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

function checkAuth() {
  $.ajax({
    url: '/profileData',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': X_PID_AUTH
    }
  })
  .done(function(doc){
      if(doc.message == 'activated'){
        nextLoad(doc);
      }else if(doc.message == 'deactivated'){
        $(document.body).load('../pages/activate-account', function () {
          $('#name-activate').text(doc.sendData.name);
          $('#email-activate').text(doc.sendData.email);
        });
      }else if(doc.message == 'redirect'){
        window.location.replace('../home');
      }
  })
  .fail(function(error){
    return $(document.body).load('../pages/error');
  });
}
$(document.body).on('keyup', '#basic-info-form input[name="zip"]', function (e) {
  var key =  String.fromCharCode(e.which);
  var elem = $('#basic-info-form input[name="zip"]');
  if(/^[0-9]*$/.test(elem.val()) == false)
    elem.val(elem.val().substr(0, elem.val().length-1));
});

$('.tabs').click(function () {
  var id = $(this).attr('id');
  var targetId = id.substr(0, id.length - 4);
  $('.tabs').removeClass('tabs-now');
  $(this).addClass('tabs-now');
  $('.info-class').css('visibility', 'hidden');
  $(`#${targetId}`).css('visibility', 'visible');
});

function nextLoad(doc) {
  $('#intro').fadeIn(2000);
  $('#basic-info').load('./pages/basic-info', function () {
    $('#basic-info-form input[name=name]').val(doc.sendData.name);
    $('#basic-info-form input[name=email]').val(doc.sendData.email);
    $('#basic-info-form input[name=mobile]').val(doc.sendData.mobile);
    $('#photo-container').load('./pages/photo');
  });
  $('#ad-pref').load('./pages/ad-pref.html');
  $('#identification').load('./pages/identification', function () {
    $('#identification-form input[name=name]').val(doc.sendData.name);
    $('#identification-form input[name=mobile]').val(doc.sendData.mobile);
  });
  $('#profile').load('./pages/prof', function () {
    $('#social-name').text(doc.sendData.name);
    $('#social-email').text(doc.sendData.email);
    $('#social-phone').text(doc.sendData.mobile);
  });
}
$(window).scroll(function (event) {
  if($('#container').innerWidth() <= '480'){
    var scroll = $(window).scrollTop();
    if(scroll >= $('#head').innerHeight()){
      $('#head').addClass('head-fix');
    }else{
      $('#head').removeClass('head-fix');
    }
  }
});
function scrollDown() {
  var headerHeight = $('#head').innerHeight();
  var divHeight = $('#container').innerHeight();
  var scrollHeight = headerHeight + divHeight;
  $(document.body).animate({ scrollTop: scrollHeight * .99}, 1000);
}

$('#footer-button').click(function () {
  $('.footer').toggleClass('footer-show');
});
