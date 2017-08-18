var cdn77src = "https://1930455220.rsc.cdn77.org/bmonk/Motion_Gallery_hd.m4v";
var verizonsrc = "http://wpc.63B7B.alphacdn.net/0063B7B/videos/hd.m4v";
$('#cdn77').click(function () {
  $('video').fadeIn();
  $('video').attr('src', cdn77src);
});

$('#verizon').click(function () {
  $('video').fadeIn();
  $('video').attr('src', verizonsrc);
});
