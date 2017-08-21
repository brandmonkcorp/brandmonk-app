$('#save').click(function () {
  saveData();
  goNext();
});

$(document).ready( function () {
  $('#basic-info-tab').addClass('tabs-now');
  loadData();
});

function loadData() {

}


function saveData() {

}

function goNext() {
  $('#basic-info-tab').removeClass('tabs-now');
  $('#basic-info').css('visibility', 'hidden');
  $('#ad-pref').css('visibility', 'visible');
  $('#ad-pref-tab').addClass('tabs-now');
}
