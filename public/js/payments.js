
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
  var v1=0;
  var v2=0;
  $(document.body).on('click', '#payments', function () {
    location.reload();
  });
  $(document.body).on('click', '#offers', function () {
    location.href='offers.html';
  });
  $(document.body).on('click', '#brandmonk', function () {
    location.href='home.html'
  });

$('#ift').delay(3000).fadeOut('slow');
$('#ift1').delay(5000).fadeOut('slow');
$('#ift2').delay(3000).fadeOut('slow');

  $('#amt').focusout(function(){
    if($.trim($('#amt').val()) == ''){
        $('#ift').css('visibility', 'visible');

     }
     v1=1;
  });

  $('#select').focusout(function(){
    var val = $('#select').val();
    if (val==null) {
      $('#ift2').css('visibility', 'visible');
    }
    v2=1;
  });

    $('#ini').on('click', function(){
      if($('#chbx').prop("checked") == false){
                  alert("Please click on 'I Agree' to Continue");
                  return;
              }
      if((v1==0)||(v2==0)){
          alert("Please select proper Tranfer mode and Enter an amount");
          return;
       }
      alert("Your Payment Has Been Initiated!");
      location.href='home.html';
    });
}
$('#footer-button').click(function () {
  $('.footer').toggleClass('footer-show');
});
$('.mobile-next-button').click(function (){
  scrollDown();
});

$(window).scroll(function (event) {
  if($(document.body).innerWidth() <= '480'){
    var scroll = $(window).scrollTop();
    if(scroll >= $('#head').innerHeight()){
      $('#head').addClass('head-fix');
    }else{
      $('#head').removeClass('head-fix');
    }
  }
});
function scrollDown() {
  var headerHeight = $('#head').innerHeight();
  var divHeight = $('#details-container').innerHeight();
  var scrollHeight = headerHeight + divHeight;
  $(document.body).animate({ scrollTop: scrollHeight * .99}, 1000);
}
