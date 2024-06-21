let allTasks = [];

const listOfTasks = document.querySelector('.to-do-list');

const clearListBtn = document.querySelector('.clear-list');
const addNewTaskBtn = document.querySelector('.add-new-button');
const closeBtn = document.querySelector('.close');

function displayTasks() {
  listOfTasks.innerHTML = '';

  allTasks.forEach((task) => {
    let htmlTemplate = `
    <li ${task.completed ? 'class=completed' : null} id='${task.id}'>
              ${task.task}
              <div class="icons">
                <ion-icon
                  name="${task.completed ? 'ellipse' : 'ellipse-outline'}"
                  class="icon-not-complited"
                ></ion-icon>
                <ion-icon name="close"></ion-icon>
              </div>
            </li>
    `;
    listOfTasks.insertAdjacentHTML('beforeend', htmlTemplate);
  });

  if (!listOfTasks.innerHTML) {
    listOfTasks.innerHTML = 'Add your first shopping item';
  }
}

function toggleCompleted(id) {
  const task = allTasks.find((el) => el.id == id);
  if (task) {
    task.completed = !task.completed;
  }
  displayTasks();
}

function removeTask(taskId) {
  allTasks = allTasks.filter((task) => task.id != taskId);
  displayTasks();
}

function addTask() {
  const enteredTask = document.querySelector('.add-new-textarea');
  if (!enteredTask.value) return;

  allTasks.push({
    id: generateRandomID(),
    task: enteredTask.value,
    completed: false,
  });
  enteredTask.value = '';
  displayTasks();
}

function clearList() {
  listOfTasks.innerHTML = '';
  allTasks.length = 0;
  console.log(allTasks);
}

function generateRandomID() {
  return Math.random().toString(36).substr(2, 9);
}

displayTasks();
clearListBtn.addEventListener('click', (e) => clearList());
addNewTaskBtn.addEventListener('click', (e) => addTask());
listOfTasks.addEventListener('click', (e) => {
  const id = e.target.closest('li').id;

  if (e.target.name === 'close') {
    removeTask(id);
  } else {
    toggleCompleted(id);
  }
});
