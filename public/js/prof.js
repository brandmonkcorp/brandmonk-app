$('#submit-data-prof').click(function () {
  var token = Cookies.get('_LOC_authFirstPID');
  if(!token){
    token = Cookies.get('_LOC_authUID');
    if(!token){
      token = Cookies.get('_PERM_authUID');
    }
  }
  submitProfileSetupData(token);
});

function submitProfileSetupData(token){
  $.ajax({
    url: '/postProfileData',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(doc){
      window.location.replace('../home');
  })
  .fail(function(error){
    return $(document.body).load('../pages/error');
  });
}
