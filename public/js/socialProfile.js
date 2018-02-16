$(document.body).on('click', '.social_nav', function (e) {
  $('.social_nav').removeClass('social_selected');
  $(this).addClass('social_selected');

  var id = $(this).attr('id');
  $('#social_body').load(`./pages/${id}.html`);
});
