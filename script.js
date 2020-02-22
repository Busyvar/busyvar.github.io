function updateData(event) {
  if(event.target.value == ""){
    event.target.parentNode.parentNode.parentNode
    .children[0].textContent = "Titre";
  }
  else {
    event.target.parentNode.parentNode.parentNode
    .children[0].textContent = event.target.value ;
  }
}

const container = document.querySelector("#tasklist");
const clearCache = ()=>localStorage.setItem("tasklist",[]);

class View {
  constructor() {
    1;
  }
  remove(e) {
    console.log("remove");
    container.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
    console.log(tasklist.list);
    tasklist.list.splice(e.target.parentNode,1);
    console.log(tasklist.list);
    tasklist.store();
  }
  create(t) {
    console.log("create task:", t);
    let taskContainer = document.createElement("article");
    let dupNode = document.importNode( document.querySelector("#task_object").content, true);
    let tti = dupNode.querySelector("#task_title_input");
    let trashBtn = dupNode.querySelector("#del_button");
    let desc = dupNode.querySelector("#description");
    let ttn = dupNode.querySelector(".touchtaskname");
    dupNode.id= t.id;
    tti.value = t.title;
    console.log(dupNode);
    ttn.textContent = (t.title == "") ? "Titre" : t.title;
    desc.value = t.desc;
    let lev = dupNode.querySelectorAll(".level")
    lev.forEach((e,i) =>{
      e.name = t.id;
      e.addEventListener("click",(e)=>t.setLevel(e));
      if(t.level==e.value){
        console.log("check it!",i);
        e.setAttribute("checked", "checked");
      }
    });
    trashBtn.addEventListener("click",view.remove);
    
    desc.addEventListener("blur", (e) => t.setDesc(e));
    tti.addEventListener("blur", (e) => t.setTitle(e));
    tti.addEventListener('blur', updateData);
    tti.addEventListener('keypress', (event) => { 
      if(event.keyCode==13){event.target.blur()};
    });

    container.appendChild(taskContainer)
      .appendChild(dupNode);
    tasklist.addTaskToList(t);
  }
}
class Task {
  constructor(obj) {
    if(arguments[0]==undefined){
      let i = 0;
      while(tasklist.list.find(el=>el.id==i)!=undefined){i++;}
      this.id = i;
      this.title = "";
      this.level = 0;
      this.desc = "";
    }
    else {
      this.id = obj.id;
      this.title = obj.title;
      this.level = obj.level;
      this.desc = obj.desc;
    }
  }
  setTitle(e){
    this.title = e.target.value;
    tasklist.replaceTaskInList(this);
    tasklist.store();
  }
  setLevel(e){
    this.level = e.target.value;
    tasklist.replaceTaskInList(this);
    tasklist.store();
  }
  setDesc(e){
    this.desc = e.target.value;
    tasklist.replaceTaskInList(this);
    tasklist.store();
  }
  isValid(){
    return this.id!=undefined &&
           this.title!=undefined &&
           this.desc != undefined &&
           this.level!=undefined;
  }
}
class TaskList{
  constructor(){
    console.log("TaskList constructor");
    this.list= new Array();
  }
  restore() {
    console.log("TaskList restore");
    let szStore = localStorage.getItem("tasklist");
    log_storage();
    if (szStore == "" || szStore == "[]" || szStore == undefined){
      console.log("cache is empty, nothing to restore");
      view.create(new Task()); // add default task
      return 0;
    }
    let restored = JSON.parse(szStore);
    //let restored = [{"title":"","desc":"","level":0}];
    restored.forEach(task => {
      let taskRestored = new Task(task);
      if(taskRestored.isValid()){
        view.create(taskRestored);
      } else{
        console.log("can't restore task: ",task);
      }
    });
    console.log("list of tasks restored :", this.list);
  }
  store() {
    localStorage.setItem("tasklist",JSON.stringify(this.list));
  }
  addTaskToList(task){
    console.log("TaskList addTaskToList:",task);
    task.isValid() ? this.list.push(task): console.log("task is not valid!");
    this.store();
  }
  removeTaskfromList(task){
    console.log("TaskList removeTaskfromList");
    let elId = this.list.findIndex((el)=>el.id == task.id);
    this.list.splice(elId,1);
    this.store();
  }
  replaceTaskInList(t){
    let elId = this.list.findIndex((el)=>el.id == t.id);
    this.list[elId]=t;
  }
}

var tasklist = new TaskList();
var view = new View();
tasklist.restore();

init();
function init()
{
  document.querySelector("#add_task_control").addEventListener("click", ()=>view.create(new Task()));
  //document.querySelector("#cache-btn").addEventListener("click", clearCache);
  //document.querySelector("#cache-log").addEventListener("click", log_storage);
}

function log_storage(){
  console.log(localStorage.getItem("tasklist"));
}
