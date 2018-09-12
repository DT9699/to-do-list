
$(document).ready(function() {

  var todoList = $('#todo-list');
  var todoInput = $('#todo-input');

  // request tasks
  var requestTask = function() {

    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=51',
      dataType: 'json',
      success: function (response, textStatus) {
        var tasksObjArr = response.tasks;
        todoList.empty();
        tasksObjArr.forEach(function(task){
           todoList.append(
             '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p class="col-xs-6" id="task-todo">' + task.content + '</p><button id="remove-button" type="button" class="btn btn-danger" data-id="' + task.id + '">Remove</button><br><br>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
};
// post request
  var addTask = function(){
    var task = {
        content: todoInput.val(),
        }

    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=51',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(task),
      success: function (response, textStatus) {
        todoInput.val('')
        requestTask();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
// remove tasks
var removeTask = function(id){
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=51',
      success: function (response, textStatus) {
        requestTask();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

// edit request
var checkComplete = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=51',
    dataType: 'json',
    success: function (response, textStatus) {
      requestTask();

    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var checkActive = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=51',
    dataType: 'json',
    success: function (response, textStatus) {
      requestTask();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '#add-button', function() {
  addTask();
})

$(document).on("click", '#remove-button', function() {
  removeTask($(this).data('id'));
});


$(document).on('change', '.mark-complete', function() {
  if (this.checked) {
  checkComplete($(this).data('id'));
} else {
  checkActive($(this).data('id'));
}
});
requestTask();
});
