var token_pass;
$(document).ready(function () {
  token_pass = getParam();
});
  $(document.body).on('click', '#reset-password-button', function () {
    var password = $('input[name=password1]').val();
    $.ajax({
      url: '/passwordReset',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"password" : password}),
      headers:{
        'x-auth': token_pass
      }
    })
    .done(function (data, status, response) {
      if(data.status == "success"){
        $('#input-container').html('<span id="password-brief" style="font-size: 3vw;color: #295;text-align:center">Success!</span>');
        $('#input-container').append('<span id="home-button" class="button-password">Back to Home!</span>');
        $('#icon-div1').css('background-image', 'url("../images/icons/password-updated.png")');
      }
    })
    .fail(function (err) {
      console.log('fail');
    });
  });
  $(document.body).on('click', '#home-button', function () {
    window.open('../page.html');
  });

function getParam() {
  var path = $(location).attr('href');
  var lastIndex = path.lastIndexOf('?') + 6;
  var token = path.substr(lastIndex, path.length);
  return token;
}
