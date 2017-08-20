
if(window.File && window.FileReader){
  $('#picture').change(function (e) {
    var file = e.target.files[0];
    $('#loading').css('visibility', 'visible');
    if(file.size >= 1024 * 1024 * 2){
      $('#messageBox').css('visibility', 'visible');;
      $('#loading').css('visibility', 'hidden');
      return $('#message').text("Choose a lower quality image.");
    }
    $('#messageBox').css('visibility', 'hidden');
    if(file.type.indexOf('image') == 0){
      var reader = new FileReader();
      reader.onload = function (e) {
        x = 0, y =0;

        drawToCanvas(e.target.result);
        $('#canvas-holder').ready(function () {
          $('#canvas-holder').css('visibility', 'visible');
          var canvas = document.getElementById('resize');
          var url = canvas.toDataURL('image/png');
          $('#picture-box').css('background-image', `url(${url})`);
          $("#locopoco").val(url);
          $('#infor').fadeOut(8000);
          $('#resize').ready(function () {
            $('#loading').css('visibility', 'hidden');
          });
        });

      }
      reader.readAsDataURL(file);
    }
  });
}else{
  console.log('Cannot upload file');
}
var x = 0, y = 0, clipwidth, clipheight, min;
var canvas = document.getElementById('resize');
var ctx = canvas.getContext('2d');
var image = new Image;
function drawToCanvas(url){

  image.onload = function () {
    canvas.height = image.height;
    canvas.width = image.width;
    if(image.height <= image.width){
      min = image.height;
      clipheight = image.height;
      clipwidth = image.height;
      x = (image.width - image.height) / 2;
    }else{
      min = image.width;
      clipheight = image.width;
      clipwidth = image.width;
        y = (image.height - image.width) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  };
  image.src = url;
}
