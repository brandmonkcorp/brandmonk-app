albname="";
$(document.body).on('click', '#createAlbum', function(){
  albname = $("#albumName").val();
  $("#txt").css("display", "none");
  $("#albumName").css("display", "none");
  $("#createAlbum").css("display", "none");
  $("#albtxt").css("display", "block");
  $("#outer").css("display", "block");
  $("#albname").text(albname);
});
