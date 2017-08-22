$(document).ready( function () {
  loadIdData();
});
function loadIdData(){

}
$(document.body).on('click', '#verify', function () {
  verifyUser();
  saveIdData();
  goIdNext();
});
$(document.body).on('click', '#skip', function () {
  goIdNext();
});
function verifyUser() {

}
function saveIdData() {

}

function goIdNext() {
  $('#identification-tab').removeClass('tabs-now');
  $('#identification').css('visibility', 'hidden');
  $('#profile').css('visibility', 'visible');
  $('#profile-tab').addClass('tabs-now');
}
