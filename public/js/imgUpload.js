/*var Cloudinary_Url = 'https://api.cloudinary.com/v1_1/bmonk/uploads';
var Cloudinary_Upload_Preset = 'nrofe3vo';
$(document).ready(function(){
    $("#fileUpload").change(function(event){
      var file = event.target.files[0];
      var formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', Cloudinary_Upload_Preset);
      axios({
        url: Cloudinary_Url,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
        data : formData
      }).then(function(res){
        console.log(res);
      }).catch(function(err){
        console.log(err);
      });
    });

});
*/
