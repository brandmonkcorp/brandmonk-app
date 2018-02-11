$(document).ready(function(){
  $("#pDetails").on('click', function(){
    $("#pageContainer").load("pages/personalDetails.html");
  });
  $("#adPref").on('click', function(){
    $("#pageContainer").load("pages/adPreference.html");
  });
  $("#identify").on('click', function(){
    $("#pageContainer").load("pages/identification.html");
  });
  $("#payDetails").on('click', function(){
    $("#pageContainer").load("pages/paymentDetails.html");
  });
  $("#socioProf").on('click', function(){
    $("#pageContainer").load("pages/socialProfile.html");
  });
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}
