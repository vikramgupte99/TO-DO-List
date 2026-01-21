
$(document).ready(function() {
console.log('DOM ready !');

//Function to add new task
$('.addNewTask').click(function () {
    var newInput = $('.input').val();

    $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=37',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: newInput
            }
        }),
        success: function (response) {
            $('.todoBody').empty();

            var statusText;
            if(response.task.completed) {
                statusText = "Completed";
            } else {
                statusText = "Active"
            }

            var editText;
            if(response.task.completed) {
                editText = "Mark Active";
            } else {
                editText = "Mark Completed";
            }

                $('.todoBody').append(
                    '<tr class="bg-info mb-1 text-center">' +
                    '<td class="taskID">' + response.task.id + '</td>' +
                    '<td>' + response.task.content + '</td>' +
                    '<td>' + statusText + '</td>' +
                    '<td><button class="btn btn-sm btn-warning edit">' + editText + '</button></td>' +
                    '<td><button class="btn btn-sm btn-danger removeTask">REMOVE</button></td>' +
                    '</tr>'
                );
                $('.input').val('');
                console.log(response);
        },
        error: function (request,textStatus,errorMessage) {
            console.log(errorMessage);
        }
    })
}) //addNewTask

//function to DELETE task
$('.todoBody').on('click','.removeTask',function () {
    var removeRow = $(this).closest('tr');
    var removeID = removeRow.find('.taskID').text();

    $.ajax({
        type: "DELETE",
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + removeID + '?api_key=37',
        success: function (response) {
            removeRow.remove();
            console.log(response);
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    }) //ajax
}) //removetask

//Function to Mark completed/active
$('.todoBody').on('click', '.edit', function() {
    var row = $(this).closest('tr');
    var id = row.find('.taskID').text();
    var completed = row.hasClass('bg-success');

    var toggleUrl = completed ? 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=37' : 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=37';


    $.ajax({
        type: 'PUT',
        url: toggleUrl,

        success: function(response) {
            row.toggleClass("bg-success bg-info");
            console.log(response);
        },
        error: function(errorMessage) {
            console.log(errorMessage);
        }
    })

})


//Function to get All Tasks
$('.listAllTask').click(function () {

    $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=37',
        dataType: 'json',
        success: function (response) {
            $('.todoBody').empty();

            response.tasks.forEach(function(task) {
            var rowColor;
            var statusText;
            var editText;
            if(task.completed) {
                rowColor = "bg-success";
                statusText = "Completed";
                editText = "Mark Active";
            } else {
                rowColor = "bg-info";
                statusText = "Active";
                editText = "Mark Completed";
            }
                
                $('.todoBody').append(
                    '<tr class="' + rowColor + ' mb-1 text-center">' +
                    '<td class="taskID">' + task.id + '</td>' +
                    '<td>' + task.content + '</td>' +
                    '<td>' + statusText + '</td>' +
                    '<td><button class="btn btn-sm btn-warning edit">' + editText + '</button></td>' +
                    '<td><button class="btn btn-sm btn-danger removeTask">REMOVE</button></td>' +
                    '</tr>'
                );
            }); // for each
            console.log(response);
        }, //success
        error: function (request,textStatus,errorMessage) {
            console.log(errorMessage);
        }
    })//foreach
}) //listalltask


}); //document