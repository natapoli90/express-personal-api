console.log("Sanity Check: JS is working! app.js is connected.");
var template;
var $gymworkoutsList;
var allGymworkouts = [];

$(document).ready(function(){

  $gymworkoutsList = $('#gymworkoutTarget');

  var source = $('#gymworkouts-template').html();
  template = Handlebars.compile(source);

  $.ajax ({
    method: 'GET',
    url: '/api/gymworkouts',
    success: handleSuccess,
    error: handleError
  });

  $('#newGymworkoutForm').on('submit', function(e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/api/gymworkouts',
    data: $(this).serialize(),
    success: newGymworkoutSuccess,
    error: newGymworkoutError
    });
  });

$gymworkoutsList.on('click', '.deleteBtn', function() {
  $.ajax({
    method: 'DELETE',
    url: '/api/gymworkouts/'+$(this).attr('data-id'),
    success: deleteGymworkoutSuccess,
    error: deleteGymworkoutError,
  });
});

function render() {
  $gymworkoutsList.empty();
  var gymworkoutsHtml = template({ gymworkouts: allGymworkouts });
  $gymworkoutsList.append(gymworkoutsHtml);
  }

function handleSuccess(json) {
  allGymworkouts = json;
  render();
}

function handleError(e) {
  console.log ("Error!");
  $('#gymworkoutTarget').text("Failed to load Gymworkouts. Something went wrong with the server.");
}

function newGymworkoutSuccess(json) {
  $('#newGymworkoutForm input').val('');
  allGymworkouts.push(json);
  render();
}

function newGymworkoutError() {
  console.log("The Gymworkouts was not created successfully.");
}

function deleteGymworkoutSuccess(json) {
  var gymworkout = json;
  console.log(json);
  var gymworkoutId = gymworkout._id;
  console.log('delete this gymworkout:', gymworkoutId);
  for(var i = 0; i < allGymworkouts.length; i++) {
    if(allGymworkouts[i]._id === gymworkoutId) {
      allGymworkouts.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteGymworkoutError() {
  console.log("Error, the Gymworkout wasn't deleted.");
}


});
