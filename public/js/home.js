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
      playNextFunc(token);
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
function getnameandemail(token) {
  $.ajax({
    url: '/getNameAndEmail',
    method: 'GET',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    }
  })
  .done(function(doc, status, response){
    //console.log(doc);
    setData(doc);
})
.fail(function(error){
  $(document.body).load('../pages/error', function () {
      $(this).css('visibility', 'visible');
  });
});
}
//Rambo's Code up-above
//MaDa's code
function playNextFunc(token) {
  getnameandemail(token);
  for (var i=1; i<=20; i++){
    var videoDiv = $(`<div id="Vid-${i}" class="videodivs"></div>`);
    var title = $(`<div id="title-${i}" class="Tcontainer"></div>`);
    $('#list').append(videoDiv);
    $(`#Vid-${i}`).append(title);
    $(`#Vid-${i}`).css('background-image', `url('./images/thumbnails/AdSnippet- (${i}).png')`);
    $(`#title-${i}`).html(`Ad Snippet Title-${i}`);
  }
    var $videodivs = $('div.videodivs'),
        visible = 2.8,
        index = 0,
        endIndex = ( $videodivs.length / visible ) - 1;

    $('div#arrowR').click(function(){
        if(index < endIndex ){
          index++;
          $videodivs.animate({'left':'-=300px'});
        }
    });

    $('div#arrowL').click(function(){
        if(index > 0){
          index--;
          $videodivs.animate({'left':'+=300px'});
        }
        });

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
    $('#right-button').click(function() {
      event.preventDefault();
      $('#content').animate({
        marginLeft: "-=200px"
      }, "fast");
   });
   $('#left-button').click(function() {
      event.preventDefault();
      $('#content').animate({
        marginLeft: "+=200px"
      }, "fast");
   });
}

$("#sas").on('click', function(){
  $(".surbtn").css('visibility', 'hidden');
  $(".offcode").css('visibility', 'hidden');
  $(".offsurvey").toggle();
  $("#surTitle").html("Stand-alone Survey No.1");
});

$(".cls").on('click', function(){
  $(".surbtn").css('visibility', 'visible');
  $(".offcode").css('visibility', 'visible');
  $(".offsurvey").toggle();
  $("#surTitle").html("Take your Surveys Here!!");
});
$(".offcodebtn").on('click', function(){
  $(".surbtn").css('visibility', 'visible');
  $(".offcode").css('visibility', 'visible');
  $(".offsurvey").toggle();
  $("#surTitle").html("Take your Surveys Here!!");
});

$("#offcode").on('click', function(){
  $(".offcode").toggle();
});
$(".codebtn").on('click', function(){
  $(".offcode").toggle();
});

$(document.body).on('click', '.videodivs', function () {

  var id = $(this).attr('id');
  $("video").attr("src",`https://1915921624.rsc.cdn77.org/BrandMonkCorp/pos${id}.mp4`);
  $("#overlay").show();
  $('#vidPlayer').get(0).load();

});
$(document.body).on('click', '.videodivs', function(){
  var id = $(this).attr('id');
  //$(`#${id}`).remove();

});

$("#adPref").click(function(){

  $(".dropdown-content").css("height", "100%");
  $(".dropdown-content").css("width", "20%");
});

$("#closePref").click(function(){
  $(".dropdown-content").css("height", "0%");
  $(".dropdown-content").css("width", "0");
});
$(".navBtn").on("click", function(){
  $(".sidenav").css("width", "22vw");
  $(".sidenav").css("height", "100%");
});

$(".closeNav").on("click", function(){
  $(".sidenav").css("width", "0");
  $(".sidenav").css("height", "0");
});

$(document.body).on('click', '#profile', function () {
  location.href='profile';
});
$(document.body).on('click', '#social', function () {
  location.href='social';
});
$(document.body).on('click', '#payments', function () {
  location.href='payments';
});
$(document.body).on('click', '#offers', function () {
  location.href='offers';
});
$(document.body).on('click', '#brandmonk', function () {
  location.reload();
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
$('#survey-submit').click( function () {
  if($(document.body).innerWidth() <= '480'){
    $('#survey-container').hide();
  }
});
$("#vidPlayer").on("ended", function() {
   document.webkitExitFullscreen();
   if(document.mozFullScreen) {
      document.mozCancelFullScreen();
    }else if (document.fullscreenElement) {
    document.exitFullscreen()
    }
   $('#survey-container').show();
   $(".surbtn").css('visibility', 'hidden');
   $(".offcode").css('visibility', 'hidden');
   $(".offsurvey").toggle();
   $("#surTitle").html("Take Your Survey Now");
   //console.log('Video has ended!');
});

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
$('#footer-button').click(function () {
  $('.footer').toggleClass('footer-show');
});

function setData(doc){
  var pic = doc.data.email;
  $('.userName').text(doc.name);
  $('.profImage').css('background-image', `url("/fuck_You_for_inspecting_my_code'/${pic}.png")`);
}
