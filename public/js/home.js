
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

  for (var i=1; i<=10; i++){
    var videoDiv = $(`<div id="Vid-${i}" class="video-divs"></div>`);
    var title = $(`<div id="title-${i}" class="Tcontainer"></div>`);
    $('#vid-container').append(videoDiv);
    $(`#Vid-${i}`).append(title);
    $(`#Vid-${i}`).css('background-image', `url('./images/thumbnails/AdSnippet- (${i}).png')`);
    $(`#title-${i}`).html(`Ad Snippet Title-${i}`);
  }
  $.getJSON("../data/duration.json")
  .done(function(data_json){
    var duration = [];
    duration = data_json.duration;
    $.each(duration, function(i, val) {
      var dur_div = $(`<span class="duration" id="dur-${i + 1}"></span>`);
        $(`#Vid-${i + 1}`).append(dur_div);
        $(`#dur-${i + 1}`).html(`${val}`);
    });
  })

  $("#overlay").click(function(){
    var r = confirm("You will not get any points if you leave!");
    if (r == true) {
      $("#overlay").hide();
      $('#vidPlayer').get(0).pause();
    }


  });
  $('#vidPlayer').click(false);
  $("#vidPlayer").on("contextmenu",function(e){
       return false;
    });
}


$(document.body).on('click', '.video-divs', function () {

  var id = $(this).attr('id');
  $("video").attr("src",`https://1930455220.rsc.cdn77.org/bmonk/pos${id}.mp4`);
  $("#overlay").show();
  $('#vidPlayer').get(0).load();

});

$("#adPref").click(function(){
  $(".dropdown-content").css("height", "100%");
  $(".dropdown-content").css("width", "20%");
});

$("#closePref").click(function(){
  $(".dropdown-content").css("height", "0%");
  $(".dropdown-content").css("width", "0");
});

$(document.body).on('mouseup', function (e) {
  var container = $('.vanish');
  if (!container.is(e.target)){
    $(".dropdown-content").css("width", "0%");
    $(".dropdown-content").css("height", "0%");
    $(".sidenav").css("width", "0%");
    $(".sidenav").css("height", "0%");
  }
});

$("#vidPlayer").bind("ended", function() {
   document.webkitExitFullscreen();
   document.mozCancelFullscreen();
   document.exitFullscreen();
});

function openProf() {
  document.getElementById("profNav").style.width = "20%";
  document.getElementById("profNav").style.height = "100%"
}

function closeProf() {
  document.getElementById("profNav").style.width = "0%";
  document.getElementById("profNav").style.height = "0%"
  document.getElementById("myDropdown").classList.toggle("show",false);

}
function myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
}

var video = document.getElementById('vidPlayer');
var supposedCurrentTime = 0;
video.addEventListener('timeupdate', function() {
  if (!video.seeking) {
        supposedCurrentTime = video.currentTime;
  }
});
video.addEventListener('seeking', function() {
  var delta = video.currentTime - supposedCurrentTime;
  if (Math.abs(delta) > 0.01) {
    console.log("Seeking is disabled");
    video.currentTime = supposedCurrentTime;
  }
});
video.addEventListener('ended', function() {
    supposedCurrentTime = 0;
});
