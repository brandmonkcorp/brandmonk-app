
$(document).ready( function () {
  //dont delete this
  checkHomeAuth();
});

//checking for authentication, profile status
function checkHomeAuth () {
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

  getProfileData(token);
}
function getProfileData(token) {
  $.ajax({
    url: '/profileData',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(doc, status, response){
    if(doc.message == 'redirect'){
      $(document.body).css('visibility', 'visible');
      playNextFunc();
    }else if(doc.message == 'activated'){
      window.location.replace('../profile');
    }else if(doc.message == 'deactivated'){
        window.location.replace('../profile');
    }else{
      $(document.body).load('../pages/error', function () {
        $(this).css('visibility', 'visible');
      });
    }
})
.fail(function(error){
  $(document.body).load('../pages/error', function () {
      $(this).css('visibility', 'visible');
  });
});
}
//Rambo's Code up-above
//MaDa's Code
function playNextFunc(){
  $(document.body).on('click', '#payments', function () {
    location.href='payments.html'
  });
  $(document.body).on('click', '#offers', function () {
    location.reload();
  });
  $(document.body).on('click', '#brandmonk', function () {
    location.href='home.html'
  });
  for (var i = 1; i <= 18; i++) {
    var offer = $(`<div class='offr' id='offr${i}'>`);
    var offrttl = $(`<div class='offrTtl' id='offrTtl${i}'>`);
    $('.container').append(offer);
    $(`#offr${i}`).append(offrttl);
    $(`#offr${i}`).css('background-image', `url('./images/staticAds/offersnippet (${i}).jpg')`);
    $(`#offr${i}`).html(`Offer Title ${i}`);
  }
}
