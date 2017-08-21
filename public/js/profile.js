$(document).ready(function () {
  $('#intro').fadeIn(2000);
  $('#basic-info').load('./pages/basic-info.html', function () {
    $('#photo-container').load('./pages/photo.html');
  });
  $('#ad-pref').load('./pages/ad-pref.html');
  $('#identification').load('./pages/identification.html');
  $('#profile').load('./pages/prof.html');
});
$('#start').click(function () {
  $('#intro').fadeOut(1000, function () {
    $('#container').css('visibility', 'visible');
    $('#basic-info').css('visibility', 'visible');
  });
});

$('.tabs').click(function () {
  var id = $(this).attr('id');
  var targetId = id.substr(0, id.length - 4);
  $('.tabs').removeClass('tabs-now');
  $(this).addClass('tabs-now');
  $('.info-class').css('visibility', 'hidden');
  $(`#${targetId}`).css('visibility', 'visible');
});
