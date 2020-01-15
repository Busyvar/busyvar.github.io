var taskNumber=0;
function addTask()
{
  taskNumber++;
  var tasklist = document.querySelector("#tasklist");
  var newTask = document.querySelector("#task_object");
  var taskContainer = document.createElement("article");
  var clone = document.importNode(newTask.content, true);
  var inputs = clone.querySelectorAll(".level");
    var delBtn = clone.querySelector("#del_button");
  
      var currentNumber = taskNumber;
        taskContainer.id= "task-"+currentNumber;
        inputs[0].name = "task-"+currentNumber;
        inputs[1].name = "task-"+currentNumber;
        inputs[2].name = "task-"+currentNumber;
        inputs[3].name = "task-"+currentNumber;
        inputs[4].name = "task-"+currentNumber;
  delBtn.onclick = function(){removeTask("task-"+currentNumber)};
  
  taskContainer.appendChild(clone);
  tasklist.appendChild(taskContainer);
}
function removeTask(taskName)
{
    var task = document.querySelector("#"+taskName);
  task.remove();

}
document.body.onload = function() {addTask()};