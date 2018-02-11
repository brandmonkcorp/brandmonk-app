$(document.body).on('click', '#resendActivation', function () {
    $.ajax({
      url: '/resend-activation',
      method: 'POST',
      contentType: 'text/html',
      headers:{
        'x-auth': X_PID_AUTH
      }
    }).done(function (data){
      alert("Activation mail has been sent!");
    }).fail(function (e){
      alert("Error! Please try again");
    });
});
