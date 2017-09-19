$('.button').click(function () {
  var id = this.id;
  if(id == "plus")
    zoomPlus();
  if(id == "minus")
    zoomMinus();
  if(id == "left")
    goLeft();
  if(id == "right")
    goRight();
  if(id == "up")
    goUp();
  if(id == "down")
    goDown();
  if(id == "crop"){
    $('#loading').show();
    setImage();
  }

});
function zoomPlus(){
  if(clipwidth >= min * .3){
    clipwidth -= 40, clipheight -= 40, x += 20, y += 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function zoomMinus(){
  if(clipwidth < min ){
    clipwidth += 40, clipheight +=40;
    x -= 20, y -= 20;
    if(x+clipwidth >= image.width) x-=20;
    if(y+clipheight >= image.height) y-=20;
    if(x<0) x = 0;
    if(y<0) y = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function goDown(){
  if(y + clipheight + 20 < image.height){
    y += 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function goUp(){
  if(y >= 20){
    y -= 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function goRight(){
  if(x + clipwidth + 20 < image.width){
    x += 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function goLeft(){
  if(x >= 20){
    x -= 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, clipwidth, clipheight, 0, 0, canvas.width, canvas.height);
  }
}
function setImage(){
  var canvas = document.getElementById('resize');
  var url = canvas.toDataURL('image/png');
  var image = new Image();
 image.source = url;
 document.body.appendChild(image);
  $('#picture-box').css('background-image', `url(${url})`);
  $('#social-photo').css('background-image', `url(${url})`);
  $("#locopoco").val(url);
  var img = $('#picture-box').css('background-image').replace(/^url\((.*?)\)$/, '$1');
  $('#locopoco').val(img);
}
