var albname="";
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

var i=0;
var file;

$('#uploadBtn').on('click',function(){
  if(albname===''){
    if(i==9){
      alert("Maximum 9 Pictures can be added to an album");
    }else {
      $("#fileUpload").trigger("click");
    }
  }else {
    alert("please enter albumName");
  }


});

$("#fileUpload").change(function(event) {
  file = event.target.files[0];
  sendAlbName();
});

function sendAlbName(){
  $.ajax({
    url: "/albumname",
    type: "POST",
    data : {
      'albname' : albname,
      'imgno' : i
    },
    success:function(data){
      console.log(data);
      sendFile();
    }
  });
}

function sendFile(){


    var formData = new FormData();
    var xhr      = new XMLHttpRequest();

    formData.append("userFile", file, file.name);
    //formData.set("albumname", albname);
    //console.log(formData);
    xhr.open("POST", "/api/file", true);
    //xhr.setRequestHeader('x-auth', X_PID_AUTH);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          thumb();
          i+=1;
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                if(xhr.responseText.message == 'success'){
                //  alert('Profile photo uploaded');

                }
            } else {
                console.error(xhr.statusText);
                alert('Error uploading file');
            }
        }
    };
    xhr.send(formData);
}



function thumb(){
    var thumbs = $(`<div id="thumb-${i}" class="img-prev"></div>`);
    $('#thumbContainer').append(thumbs);
    $(`#thumb-${i}`).css('background-image', `url('./Uploads/sayak_${albname}_img_${i}.png')`);

}
