//Load the categories and make the buttons add category not list item
//after clicking category load all list items and make input form add list item
//add 'go back button' -> after back load categories again

class ToDoApp {
  #allTasks;
  #categories;
  #listOfTasks = document.querySelector('#to-do-list');
  #clearListBtn = document.querySelector('#clear-list');
  #addNewTaskBtn = document.querySelector('#add-new-button');
  #closeBtn = document.querySelector('.close');
  #listCategories = document.querySelector('.list-categories');
  #appHeader = document.querySelector('.app-header-list');
  #categoryBody = document.querySelector('.category-body');
  #backBtn = document.querySelector('#go-back');
  #currentCategory;
  #newCatBtn = document.querySelector('#new-category');
  #categoryInput = document.querySelector('#category-input');
  #deleteCat = document.querySelector('#delete-cat');

  constructor() {
    this.#allTasks = [];
    this.#categories = ['Groceries', 'ToDoS', 'Work', 'School'];
    this.displayCategories();
    this.#clearListBtn.addEventListener('click', (e) => this.clearList());
    this.#addNewTaskBtn.addEventListener('click', (e) => this.addTask());
    this.#listOfTasks.addEventListener('click', (e) => {
      this.iconsListener(e);
    });
    this.#categoryBody.addEventListener('click', (e) => {
      this.#currentCategory = e.target.innerHTML;
      this.generateHeader(this.#currentCategory);
      this.displayTasks();
      this.toggleHidden();
    });
    this.#backBtn.addEventListener('click', (e) => this.toggleHidden());
    this.#newCatBtn.addEventListener('click', (e) => this.addCategory());
    this.#deleteCat.addEventListener('click', (e) => this.deleteCategory());
  }

  iconsListener(e) {
    {
      const id = e.target.closest('li').id;

      if (e.target.name === 'close') {
        this.removeTask(id);
      } else {
        this.toggleCompleted(id);
      }
    }
  }

  addCategory() {
    const newCategory = this.#categoryInput.value;
    this.#categories.push(newCategory);
    this.displayCategories();
    this.#categoryInput.value = '';
  }

  deleteCategory() {
    this.toggleHidden();
    this.#categories = this.#categories.filter(
      (cat) => cat != this.#currentCategory
    );
    this.#allTasks = this.#allTasks.filter(
      (task) => task.category != this.#currentCategory
    );
    console.log(this.#allTasks);
    this.#currentCategory = '';
    this.displayCategories();
    console.log(this.#categories);
  }

  toggleHidden() {
    document
      .querySelectorAll('.app-header')
      .forEach((el) => el.classList.toggle('hidden'));
    document
      .querySelectorAll('.app-body')
      .forEach((el) => el.classList.toggle('hidden'));
    document
      .querySelectorAll('.app-add-new')
      .forEach((el) => el.classList.toggle('hidden'));
  }

  displayCategories() {
    this.#listCategories.innerHTML = '';

    this.#categories.forEach((cat) => {
      let htmlTemplate = `
      <li>${cat}</li>
      `;
      this.#listCategories.insertAdjacentHTML('beforeend', htmlTemplate);
    });

    if (!this.#listOfTasks.innerHTML) {
      this.#listOfTasks.innerHTML = 'Add your first category.';
    }
  }

  displayTasks() {
    this.#listOfTasks.innerHTML = '';

    this.#allTasks
      .filter((task) => task.category == this.#currentCategory)
      .forEach((task) => {
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
      this.#listOfTasks.innerHTML = 'Add your first item to the list.';
    }

    console.log(this.#allTasks);
  }

  generateHeader(category) {
    this.#appHeader.innerHTML = '';
    let htmlTemplate = `
      <h1 class="list-header">${category}</h1>
    `;
    this.#appHeader.insertAdjacentHTML('beforeend', htmlTemplate);
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
      category: this.#currentCategory,
    });
    enteredTask.value = '';
    this.displayTasks();
  }

  clearList() {
    this.#listOfTasks.innerHTML = '';
    this.#allTasks = this.#allTasks.filter(
      (task) => task.category != this.#currentCategory
    );
    this.toggleHidden();
  }

  #generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  }
}

const toDoApp = new ToDoApp();
