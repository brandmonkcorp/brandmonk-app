$(document.body).on('click', '#save-basic', function () {
  $('#basic-info-submit').click();
});

$('#basic-info-form').submit(function (e) {
    e.preventDefault();
    if($('#Photo-form input[name=picture]').val() == ''){
      if($('#container').innerWidth() <= '481'){
        console.log('upload ');
        return alert('Please upload a profile picture.');
      }
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
  $('#social-address').text(basicdata.address);
  $('#basic-info-tab').removeClass('tabs-now');
  if($('#container').innerWidth() >= '480'){
    $('#basic-info').css('visibility', 'hidden');
  }else{
    scrollDown();
    $('#ad-pref').show();
  }
  $('#ad-pref').css('visibility', 'visible');
  $('#ad-pref-tab').addClass('tabs-now');
}
