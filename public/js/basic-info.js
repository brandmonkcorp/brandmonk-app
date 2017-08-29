$(document.body).on('click', '#save-basic', function () {
  $('#basic-info-submit').click();
});

$('#basic-info-form').submit(function (e) {
    e.preventDefault();
    if($('#Photo-form input[name=picture]').val() == ''){
      $('#message').text('Please upload a picture.');
      return $('#messageBox').css('visibility', 'visible');
    }
    saveBasicData();
    goBasicNext();
});


$(document).ready( function () {
  $('#basic-info-tab').addClass('tabs-now');
});

function saveBasicData() {
  basicdata.address = $('input[name=address]').val() + ',' +
   $('input[name=city]').val() + ',' +
    $('input[name=zip]').val();
  basicdata.dob = $('input[name=dob]').val();
  basicdata.marital_status = $('select[name=marital]').val();
  //basicdata.photo = $('#locopoco').val();
}

function goBasicNext() {
  c1 = true;
  $('#basic-info-tab').removeClass('tabs-now');
  $('#basic-info').css('visibility', 'hidden');
  $('#ad-pref').css('visibility', 'visible');
  $('#ad-pref-tab').addClass('tabs-now');
}
