$(document.body).on('click', '#save-basic', function () {
  saveBasicData();
  goBasicNext();
});

$(document).ready( function () {
  $('#basic-info-tab').addClass('tabs-now');
  loadData();
});

function loadData() {

}


function saveBasicData() {

}

function goBasicNext() {
  $('#basic-info-tab').removeClass('tabs-now');
  $('#basic-info').css('visibility', 'hidden');
  $('#ad-pref').css('visibility', 'visible');
  $('#ad-pref-tab').addClass('tabs-now');
}
