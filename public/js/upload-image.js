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
        $('#picture-box').css('background-image', `url('${e.target.result}')`);
        $('#social-photo').css('background-image', `url('${e.target.result}')`);
      }
      reader.readAsDataURL(file);
      $('#loading').css('visibility', 'hidden');
    }else{
      console.log('Cannot upload file');
      $('#messageBox').css('visibility', 'visible');;
      $('#loading').css('visibility', 'hidden');
      $('#message').text("Invalid File type.");
    }
  });
}
