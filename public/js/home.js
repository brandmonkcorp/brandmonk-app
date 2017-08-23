$(document).ready( function () {

  for (var i=1; i<=6; i++){
    var videoDiv = $(`<div id="video-${i}" class="video-divs"></div>`);
    $('#vid-container').append(videoDiv);
    $(`#video-${i}`).css('background-image', `url('./images/thumbnails/thumb${i}.png')`);
  }
});




function openProf() {
  document.getElementById("profNav").style.width = "22vw";

}

function closeProf() {
  document.getElementById("profNav").style.width = "0";
  document.getElementById("myDropdown").classList.toggle("show",false);

}
function myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction(){
  var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
