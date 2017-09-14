
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


function playNextFunc(){
  $(document.body).on('click', '#social', function () {
    location.href='social.html';
  });
  $(document.body).on('click', '#payments', function () {
    location.href='payments.html';
  });
  $(document.body).on('click', '#offers', function () {
    location.href='offers.html';
  });
  $(document.body).on('click', '#brandmonk', function () {
    location.href='home.html';
  });

  for (var i=1; i<=8; i++){
    var friend = $(`<div id="Vid-${i}" class="f_image"></div>`);
    var friend_name = $(`<div id="title-${i}" class="f_name"></div>`);
    $('#friend').append(friend);
    $(`#Vid-${i}`).append(friend_name);
    $(`#Vid-${i}`).css('background-image', `url('../images/user_profile_female.jpg')`);
    $(`#title-${i}`).html(`Friend-${i}`);
  }
  for (var j=1; j<=10; j++){
    var post = $(`<div id="post_text-${j}" class="post"></div>`);
    var post_u_name = $(`<div id="u_name-${j}" class="post_u_name"></div>`);
    var like = $(`<div id="like-${j}" class="like"></div>`);
    var comment = $(`<div id="comment-${j}" class="comment"></div>`);
    $('#user_post').append(post);
    $(`#post_text-${j}`).append(post_u_name);
    $(`#post_text-${j}`).append(like);
    $(`#post_text-${j}`).append(comment);
    $(`#u_name-${j}`).html(`Post-${j}`);
    $(`#like-${j}`).html(`Like`);
    $(`#comment-${j}`).html(`comment`);

    var ref_vid = $(`<div id="ref_vid-${j}" class="ref_vid"></div>`);
    var ref_vid_name = $(`<div id="ref_vid_name-${j}" class="ref_vid_name"></div>`);
    var share = $(`<div id="share-${j}" class="share"></div>`);
    $('#user_post').append(ref_vid);
    $(`#ref_vid-${j}`).append(ref_vid_name);
    $(`#ref_vid-${j}`).append(share);
    $(`#ref_vid-${j}`).css('background-image', `url('./images/thumbnails/AdSnippet- (${i}).png')`);
    $(`#ref_vid_name-${j}`).html(`Add-${j}`);
    $(`#share-${j}`).html(`share`);
  }

}
