class ToDoApp {
  #allTasks;
  #listOfTasks = document.querySelector('.to-do-list');
  #clearListBtn = document.querySelector('.clear-list');
  #addNewTaskBtn = document.querySelector('.add-new-button');
  #closeBtn = document.querySelector('.close');

  constructor() {
    this.#allTasks = [];

    this.displayTasks();
    this.#clearListBtn.addEventListener('click', (e) => this.clearList());
    this.#addNewTaskBtn.addEventListener('click', (e) => this.addTask());
    this.#listOfTasks.addEventListener('click', (e) => {
      const id = e.target.closest('li').id;

      if (e.target.name === 'close') {
        this.removeTask(id);
      } else {
        this.toggleCompleted(id);
      }
    });
  }

  displayTasks() {
    this.#listOfTasks.innerHTML = '';

    this.#allTasks.forEach((task) => {
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
      this.#listOfTasks.insertAdjacentHTML('beforeend', htmlTemplate);
    });

    if (!this.#listOfTasks.innerHTML) {
      this.#listOfTasks.innerHTML = 'Add your first item to shopping list.';
    }
  }

  toggleCompleted(id) {
    const task = this.#allTasks.find((el) => el.id == id);
    if (task) {
      task.completed = !task.completed;
    }
    this.displayTasks();
  }

  removeTask(taskId) {
    this.#allTasks = this.#allTasks.filter((task) => task.id != taskId);
    this.displayTasks();
  }

  addTask() {
    const enteredTask = document.querySelector('.add-new-textarea');
    if (!enteredTask.value) return;

    this.#allTasks.push({
      id: this.#generateRandomID(),
      task: enteredTask.value,
      completed: false,
    });
    enteredTask.value = '';
    this.displayTasks();
  }

  clearList() {
    this.#listOfTasks.innerHTML = '';
    this.#allTasks.length = 0;
  }

  #generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  }
}

const toDoApp = new ToDoApp();
