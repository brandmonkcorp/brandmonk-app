if(window.File && window.FileReader){
  $('#picture').change(function (e) {
    var file = e.target.files[0];
    $('#loading').css('visibility', 'visible');
    if(file.type.indexOf('image') == 0){
      if(file.size >= 1024 * 1024 * 4){
        $('#messageBox').css('visibility', 'visible');;
        $('#loading').css('visibility', 'hidden');
        if($('#container').innerWidth() <= '481px'){
          return alert('Choose a lower quality image.');
        }
        return $('#message').text("Choose a lower quality image.");
      }
      $('#messageBox').css('visibility', 'hidden');

      var reader = new FileReader();
      reader.onload = function (e) {
        x = 0, y =0;
        drawToCanvas(e.target.result, function () {
          $('#canvas-holder').css('visibility', 'visible');
          $('#canvas-holder').show();
          var canvas = document.getElementById('resize');
          var url = canvas.toDataURL('image/png');
          $('#picture-box').css('background-image', `url(${url})`);
          $('#social-photo').css('background-image', `url(${url})`);
          $("#locopoco").val(url);
          $('#infor').fadeOut(8000);
          $('#resize').ready(function () {
            $('#loading').css('visibility', 'hidden');
          });
        });

      }
      reader.readAsDataURL(file);
    }else{
      console.log('Cannot upload file');
      $('#messageBox').css('visibility', 'visible');;
      $('#loading').css('visibility', 'hidden');
      $('#message').text("Invalid File type.");
    }
  });
}

var x = 0, y = 0, clipwidth, clipheight, min;
var canvas = document.getElementById('resize');
var ctx = canvas.getContext('2d');
var image = new Image;

function drawToCanvas(url, callback){
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
  setTimeout( function () {
    callback();
  },100 );
}
