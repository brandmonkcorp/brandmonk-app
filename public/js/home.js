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
    }else{
      $(document.body).load('../pages/error', function () {
        $(this).css('visibility', 'visible');
      });
    }
})
.fail(function(error){
  console.log('before');
  $(document.body).load('../pages/error', function () {
      $(this).css('visibility', 'visible');
  });
});
}

//your code
function playNextFunc() {
  for (var i=1; i<=6; i++){
    var videoDiv = $(`<div id="Vid-${i}" class="video-divs"></div>`);
    $('#vid-container').append(videoDiv);
    $(`#Vid-${i}`).css('background-image', `url('./images/thumbnails/thumb${i}.png')`);


  }

  $("#overlay").click(function(){
    $("#overlay").hide();
    $('#vidPlayer').get(0).pause();

  });
  $('#vidPlayer').click(false);
}

$(document.body).on('click', '.video-divs', function () {
  var id = $(this).attr('id');
  $("video").attr("src",`https://1930455220.rsc.cdn77.org/bmonk/pos${id}.mp4`);
  $("#overlay").show();
});



function openProf() {
  document.getElementById("profNav").style.width = "22vw";

}

function closeProf() {
  document.getElementById("profNav").style.width = "0";
  document.getElementById("myDropdown").classList.toggle("show",false);

}
function myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction(){
  var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
