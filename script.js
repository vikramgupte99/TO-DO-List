
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

                $('.todoBody').append(
                    '<tr class="bg-info mb-1 text-center">' +
                    '<td class="taskID">' + response.task.id + '</td>' +
                    '<td>' + response.task.content + '</td>' +
                    '<td>Active</td>' +
                    '<td><button class="btn btn-sm btn-warning edit">Mark completed</button></td>' +
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
})//document