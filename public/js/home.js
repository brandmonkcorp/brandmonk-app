$(document).ready( function () {

  for (var i=1; i<=8; i++){
    var videoDiv = $(`<div id="video-${i}" class="video-divs"></div>`);
    $('#vid-container').append(videoDiv);
    $(`#video-${i}`).css('background-image', `url('./images/thumbnails/thumb${i}.png')`);
    $(`#video-${i}`).click(function(){
      $("video").attr("src",`https://1930455220.rsc.cdn77.org/bmonk/posVid-${i}.mp4`);
      $("#overlay").show();

      //$("#vid").attr("src", `https://1930455220.rsc.cdn77.org/bmonk/posVid-${i}.mp4`);
      //$("#vidPlayer")[0].load();
      //$("#vidPlayer").video(`<source src='https://1930455220.rsc.cdn77.org/bmonk/posVid-${i}.mp4' type="video/mp4"></source>`);
    });
    //  $("#vidPlayer").video(`src("https://1930455220.rsc.cdn77.org/bmonk/posVid-${i}mp4")`);
  }

  $("#overlay").click(function(){
    $("#overlay").hide();
    $('#vidPlayer').get(0).pause();

  });
  $('#vidPlayer').click(false);





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
