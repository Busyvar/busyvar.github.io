var taskNumber=0;
function addTask()
{
  taskNumber++;
  let currentNumber = taskNumber;
  let taskContainer = document.createElement("article");
  let taskLabel = "task-"+taskNumber;
  taskContainer.id= taskLabel;

  let clone = document.importNode( document.querySelector("#task_object").content, true);
  clone.querySelectorAll(".level")
		.forEach(e => e.name = taskLabel);
  clone.querySelector("#del_button")
		.onclick = () => removeTask(taskLabel);
  let tti = clone.querySelector("#task_title_input")
  let ttn = clone.querySelector(".touchtaskname");
  tti.name = taskLabel;
  tti.addEventListener('blur', () => { ttn.innerText=tti.value;});
  tti.addEventListener('keypress', (event) => {
    if(event.keyCode==13){event.srcElement.blur();};
  });
  
  
  document.querySelector("#tasklist")
		.appendChild(taskContainer)
			.appendChild(clone);
}
function removeTask(taskName) { document.querySelector("#"+taskName).remove();}


function update_title()
{
}
function unfocus()
{
	console.log(event);
	if(event.keyCode==13){document.getElementById("task_title_input").blur();}
}

window.onload = addTask();
