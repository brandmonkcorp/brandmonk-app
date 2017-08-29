$('#submit-data-prof').click(function () {
  $('#social-submit').click();
  if(!(c1 & c2 & c3)){
    return alert('Save data in each pages.');
  }
});

$('#social-form').submit(function (e) {
  e.preventDefault();
  saveData();
  var token = Cookies.get('_LOC_authFirstPID');
  if(!token){
    token = Cookies.get('_LOC_authUID');
    if(!token){
      token = Cookies.get('_PERM_authUID');
    }
  }
  submitProfileSetupData(token);
});

function submitProfileSetupData(token){
  $.ajax({
    url: '/postProfileData',
    method: 'POST',
    contentType: 'application/json',
    headers:{
      'x-auth': token
    },
    data: JSON.stringify({basicdata, basicprofiledata})
  })
  .done(function(doc){
      window.location.replace('../home');
  })
  .fail(function(error){
    return $(document.body).load('../pages/error');
  });
}
function saveData() {
  basicprofiledata.current_position = $('#social-form input[name=position]').val();
  basicprofiledata.current_company = $('#social-form input[name=company]').val();
  basicprofiledata.last_degree = $('#social-form input[name=edu]').val();
  basicprofiledata.last_school = $('#social-form input[name=last_school]').val();
  basicprofiledata.rel_stat = $('#social-form select[name=relationship]').val();
}
