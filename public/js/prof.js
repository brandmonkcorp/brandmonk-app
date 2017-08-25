$('#submit-data-prof').click(function () {
  submitProfileSetupData();
});

function submitProfileSetupData(){
  $.ajax({
    url: '/postProfileData',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      'x-auth': X_PID_AUTH
    }
  })
  .done(function(doc){
      window.location.replace('../home.html');
  })
  .fail(function(error){
    return $(document.body).load('../pages/error.html');
  });
}
