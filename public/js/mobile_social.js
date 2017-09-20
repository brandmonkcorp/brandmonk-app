$(document.body).ready(function () {
  if($(document.body).innerWidth() <= '480'){
    loadLastViewedAdd();
  }
});

function loadLastViewedAdd() {
  for( var i = 0; i <= 20; i++){
    var adDiv = $('<div class="vidDiv"><span class="ad-name">Ad name</span></div>');
    $('#vid-container').append(adDiv);
  }
}
$(document.body).on('click', '.vidDiv', function () {
  $('.vidDiv').removeClass('sel-vid');
  $(this).addClass('sel-vid');
});
$(document.body).on('click', '.f_image', function () {
  $('.f_image').removeClass('sel-fr');
  $(this).addClass('sel-fr');
});
