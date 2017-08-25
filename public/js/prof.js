$('#submit-data-prof').click(function () {
  var token = Cookies.get('_LOC_authFirstPID');
  if(!token){
    token = Cookies.get('_LOC_authUID');
    if(!token){
      token = Cookies.get('_PERM_authUID');
    }
  }
  console.log(X_PID_AUTH);
  submitProfileSetupData(token);
});

function submitProfileSetupData(){
  $.ajax({
    url: '/postProfileData',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(doc){
      window.location.replace('../home.html');
  })
  .fail(function(error){
    return $(document.body).load('../pages/error.html');
  });
}
