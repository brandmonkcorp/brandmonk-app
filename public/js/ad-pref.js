var languages = [];
var sel_lang = [];
var genres = [];
var sel_gen = [];
$(document).ready(function () {
  $.getJSON("./data/lang.json")
    .done(function (data_json) {
      languages = data_json.languages;
      $.each(languages, function (i, val) {
        $('select[name=f-lang]').append(`<option value="${val}">${val}</option>`);
      });
      $('select').addClass('select-class');
      $('option').addClass('select-class');
    })
    .fail(function () {
      console.log('error');
    });

    $.getJSON("./data/genre.json")
      .done(function (data_json) {
        genres = data_json.genres;
        $.each(genres, function (i, val) {
          var div = $(`<div id="${val}-div" class="genre-div"></div>`);
          var span_name = $(`<span id="genre" class="genre-name">${val}</span>`);
          var span_select = $(`<span id="selected"></span>`);
          div.append(span_name).append(span_select);
          $('#ad-genre').append(div);
        });
      })
      .fail(function () {
        console.log('error');
      });

});
$(document.body).on('click', '.genre-div', function () {
  $(this).toggleClass('genre-select');
  $(this).children('#selected').toggle();
  var name = $(this).children('#genre').text();
  if(sel_gen.includes(name)){
    var index = sel_gen.indexOf(name);
    sel_gen.splice(index, 1);
  }else{
    sel_gen.push(name);
  }

  if(sel_gen.length == genres.length){
    $('.select-all').addClass('selected-all');
  }else{
    $('.select-all').removeClass('selected-all');
  }
  $('#count').text(`${sel_gen.length} `);
});

$(document.body).on('click', '.select-all', function () {
  if(sel_gen.length != genres.length){
    $('.genre-div').addClass('genre-select');
    $('.genre-div #selected').show();
    sel_gen = [];
    $.each(genres, function (i, val) {
      sel_gen.push(val);
    });
  }else{
    sel_gen = [];
    $('.genre-div #selected').hide();
    $('.genre-div').removeClass('genre-select');
  }
  $(this).toggleClass('selected-all');
  $('#count').text(`${sel_gen.length} `);
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
$(document.body).on('click', '#save-pref', function () {
  if(sel_lang.length == 0){
    return alert('Choose atleast one Ad Language');
  }
  if(sel_gen.length == 0){
    return alert('Choose atleast one Preferred Ad genre');
  }
  savePrefData();
  goPrefNext();
});

function savePrefData() {
  basicdata.ad_language = sel_lang;
  basicdata.feedback_language = $('select[name=f-lang]').val();
  basicdata.gender = $('select[name=gender]').val();
  basicdata.education = $('select[name=edu]').val();
  basicdata.preferred_ad_type = $('select[name=ad_type]').val();
  basicdata.ad_preference = sel_gen;
}

function goPrefNext() {
  c2 = true;
  $('#ad-pref-tab').removeClass('tabs-now');
  $('#ad-pref').css('visibility', 'hidden');
  $('#identification').css('visibility', 'visible');
  $('#identification-tab').addClass('tabs-now');
}
