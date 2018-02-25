albname="";
$(document.body).on('click', '#createAlbum', function(){
  albname = $("#albumName").val();
  $("#txt").css("display", "none");
  $("#albumName").css("display", "none");
  $("#createAlbum").css("display", "none");
  $("#albtxt").css("display", "block");
  $("#outer").css("display", "block");
  $("#img-prev").css("display", "block");
    $("#thumbContainer").css("display", "block");
  $("#albname").text(albname);
});
$(document.body).on('click', '#uploadBtn', function(){
  $("#fileUpload").trigger("click");
  //$("#fileUpload").css("display", "block");
  //$("#fileUpload").css("visibility", "hidden");
});
/*
var imgPreview = $("#img-prev");
var fileupload = document.getElementById("fileUpload");

fileupload.addEventListener('change', function(event){
  console.log(event);
}); */
