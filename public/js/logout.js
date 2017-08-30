$(document.body).on('click', '#logout', function () {
  var token = Cookies.get('_LOC_authFirstPID');
  if(!token){
    var token = Cookies.get('_PERM_authUID');
    if(!token){
      token = Cookies.get('_LOC_authUID');
      if(!token){
        //No user logged in
            return $(document.body).load('../pages/error', function () {
            $(this).css('visibility', 'visible');
        });
      }
    }
  }
  doLogOut(token);
});

function doLogOut(token) {
  $.ajax({
    url: '/logoutUser',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(){
    Cookies.remove('_PERM_authUID');
    Cookies.remove('_LOC_authFirstPID');
    Cookies.remove('_LOC_authUID');
    window.location.replace('../');
  })
  .fail(function(error){
    return $(document.body).load('../pages/error', function () {
      $(this).css('visibility', 'visible');
    });
  });
}
