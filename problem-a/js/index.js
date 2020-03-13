'use strict';

/* your code goes here! */
// 1
class Task {
  constructor(taskDescription, taskComplete) {
    this.description = taskDescription;
    this.complete = taskComplete;
  }

  render() {
    let elem = document.createElement('li');
    elem.textContent = this.description;

    if(this.complete) {
      elem.classList.add('font-strike');
    }
    elem.textContent = this.description;

    elem.addEventListener('click', () => {
      this.toggleFinished(); //need this so that it knows which object has those instance variables COMMON BUG
      //can't just call toggleFinished() alone--> solution is an ARROW function. example below (take out boiler plate pieces of function)
      // let foo = (params) =>  'foo' + params;
      elem.classList.toggle('font-strike');
    })
    return elem;
  }
  toggleFinished() {
    this.complete = !this.complete; //flip it

  }
}
class TaskList {
  constructor(taskArray) {
    this.tasks = taskArray
  }

  addTask(description) {
    let task = new Task(description, false);
    this.tasks.push(task);
  } 

  render() {
    let ol = document.createElement('ol');
    for(let taskItem of this.tasks) {
      let domElement = taskItem.render();
      ol.appendChild(domElement);
    }
    return ol;
  }
}

class NewTaskForm {
  constructor(submitCallback) {
    this.submitCallback = submitCallback;
  }

  render() {
    let form = document.createElement('form');


    let input = document.createElement('input');
    input.classList.add('form-control', 'mb-3');
    input.setAttribute("placeholder", "What else do you have to do?");
    form.appendChild(input);

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.textContent = "Add task to list";
    button.addEventListener('click', (event) => {
      event.preventDefault();
      this.submitCallback(input.value); //when clicked execute recipe in constructor
      // addTaskToList()
    })
    form.appendChild(button);

    return form;
  }
}

class App {
  constructor(parentElem, taskList) {
    this.parentElem = parentElem;
    this.taskList = taskList;
  }

  render() {
    this.parentElem.appendChild(this.taskList.render())

    //BINDING aka bind which tells it to use THIS value to the function in the constructor
    let recipeWithName = this.addTaskToList.bind(this);
     
    let taskForm = new NewTaskForm(recipeWithName); //no () after bc you are calling it by name--> refer to it but not call it 
    this.parentElem.appendChild(taskForm.render());
  } 

  addTaskToList(description) {
    this.taskList.addTask(description);
    //clear it
    this.parentElem.innerHTML = '';
    this.render();
  }
}

let appElem = document.querySelector('#app');

let taskList = new TaskList(
  [
    new Task('eat', false),
    new Task('Arrow some functions', true), 
  ]
)

new App(appElem, taskList);
let app = new App(appElem, taskList);
app.render();
// appElem.appendChild(taskList.render()); //replace this with app function above

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
