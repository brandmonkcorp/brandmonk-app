var isVerified = false;
$(document.body).on('click', '#verify', function () {
  $('#id-submit').click();
});
$('#identification-form').submit( function (e) {
  e.preventDefault();
  verifyUser();
  saveIdData();
  if(isVerified){
    goIdNext();
  }
});
$(document.body).on('click', '#skip', function () {
  goIdNext();
});
$('.checklength').keyup( function () {
  var elem = $(this);
  if(/^[0-9]*$/.test(elem.val()) == false)
    elem.val(elem.val().substr(0, elem.val().length-1));
});
function verifyUser() {
  isVerified = true;
}
function saveIdData() {
  basicdata.aadhaar = $('#identification-form input[name=aadhaar]').val();
  basicdata.PAN = $('#identification-form input[name=PAN]').val();
}

function goIdNext() {
  c3 = true;
  $('#identification-tab').removeClass('tabs-now');
  if($('#container').innerWidth() >= '480'){
    $('#identification').css('visibility', 'hidden');
  }else{
    scrollDown();
    $('#profile').show();
  }
  $('#profile').css('visibility', 'visible');
  $('#profile-tab').addClass('tabs-now');
}
