var languages = [];
var sel_lang = [];
$(document).ready(function () {
  $.getJSON("./data/lang.json")
    .done(function (data_json) {
      languages = data_json.languages;
    })
    .fail(function () {
      console.log('error');
    });
});

$('.multiselect').click(function () {
  if(sel_lang.length == 0)
    $(this).text('');
  if($(this).parent().children('#lang').length == 0 ){
    $(this).after('<div id="lang" class="input-panel"></div>');
      loadLangData();
  }else
    $('#lang').css('visibility', 'visible');
});
$(document.body).on('mouseup', function (e) {
  var container = $('.language-name');
  if ( !$('div[name=languages]').is(e.target) && !container.is(e.target)){
    $('#lang').css('visibility', 'hidden');
  }
});

$(document.body).on('click', '.language-name', function () {
  $(this).toggleClass('language-clicked');
  var name = $(this).text();
  if(sel_lang.includes(name)){
    var index = sel_lang.indexOf(name);
    sel_lang.splice(index, 1);
    return $(`div[name=languages] #l-${name}`).remove();
  }
  sel_lang.push(name);
  $('div[name=languages]').append(`<span id="l-${name}" class="selected-lang">${name}</span>`);
});

function loadLangData() {
  $.each(languages, function (i, val) {
    $('#lang').append(`<span class="language-name" id="lang-${i}">${val}</span>`);
  });
}
