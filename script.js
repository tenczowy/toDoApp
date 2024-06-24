class ToDoApp {
  #allTasks = [];
  #categories = ['Groceries', 'ToDoS', 'Work', 'School'];
  #currentCategory = '';

  constructor() {
    this.cacheDOMElements();
    this.bindEvents();
    this.loadFromLocalStorage();
    this.displayCategories();
  }

  cacheDOMElements() {
    this.elements = {
      listOfTasks: document.querySelector('#to-do-list'),
      clearListBtn: document.querySelector('#clear-list'),
      addNewTaskBtn: document.querySelector('#add-new-button'),
      categoryBody: document.querySelector('.category-body'),
      backBtn: document.querySelector('#go-back'),
      newCatBtn: document.querySelector('#new-category'),
      categoryInput: document.querySelector('#category-input'),
      deleteCat: document.querySelector('#delete-cat'),
      listCategories: document.querySelector('.list-categories'),
      appHeader: document.querySelector('.app-header-list'),
    };
  }

  bindEvents() {
    this.elements.clearListBtn.addEventListener(
      'click',
      this.clearList.bind(this)
    );
    this.elements.addNewTaskBtn.addEventListener(
      'click',
      this.addTask.bind(this)
    );
    this.elements.listOfTasks.addEventListener(
      'click',
      this.handleTaskClick.bind(this)
    );
    this.elements.categoryBody.addEventListener(
      'click',
      this.handleCategoryClick.bind(this)
    );
    this.elements.backBtn.addEventListener('click', this.toggleView.bind(this));
    this.elements.newCatBtn.addEventListener(
      'click',
      this.addCategory.bind(this)
    );
    this.elements.deleteCat.addEventListener(
      'click',
      this.deleteCategory.bind(this)
    );
  }

  handleTaskClick(e) {
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
    const newCategory = this.elements.categoryInput.value.trim();
    if (newCategory && !this.#categories.includes(newCategory)) {
      this.#categories.push(newCategory);
      this.saveToLocalStorage();
      this.displayCategories();
    }
    this.elements.categoryInput.value = '';
  }

  handleCategoryClick(e) {
    this.#currentCategory = e.target.textContent;
    this.saveToLocalStorage();
    this.generateHeader(this.#currentCategory);
    this.displayTasks();
    this.toggleView();
  }

  deleteCategory() {
    this.#categories = this.#categories.filter(
      (cat) => cat != this.#currentCategory
    );
    this.#allTasks = this.#allTasks.filter(
      (task) => task.category != this.#currentCategory
    );
    console.log(this.#allTasks);
    this.#currentCategory = '';
    this.saveToLocalStorage();
    this.displayCategories();
    this.toggleView();
  }

  toggleView() {
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
    this.elements.listCategories.innerHTML = '';

    this.#categories.forEach((cat) => {
      let htmlTemplate = `
      <li>${cat}</li>
      `;
      this.elements.listCategories.insertAdjacentHTML(
        'beforeend',
        htmlTemplate
      );
    });

    if (!this.elements.listOfTasks.innerHTML) {
      this.elements.listOfTasks.innerHTML = 'Add your first category.';
    }
  }

  displayTasks() {
    this.elements.listOfTasks.innerHTML = '';

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
        this.elements.listOfTasks.insertAdjacentHTML('beforeend', htmlTemplate);
      });

    if (!this.elements.listOfTasks.innerHTML) {
      this.elements.listOfTasks.innerHTML = 'Add your first item to the list.';
    }
  }

  generateHeader(category) {
    this.elements.appHeader.innerHTML = `<h1 class="list-header">${category}</h1>`;
  }

  toggleCompleted(id) {
    const task = this.#allTasks.find((el) => el.id == id);
    if (task) {
      task.completed = !task.completed;
    }
    this.saveToLocalStorage();
    this.displayTasks();
  }

  removeTask(taskId) {
    this.#allTasks = this.#allTasks.filter((task) => task.id != taskId);
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
    this.displayTasks();
  }

  clearList() {
    this.elements.listOfTasks.innerHTML = '';
    this.#allTasks = this.#allTasks.filter(
      (task) => task.category != this.#currentCategory
    );
    this.saveToLocalStorage();
    this.displayTasks();
    this.toggleView();
  }

  #generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  }

  saveToLocalStorage() {
    localStorage.setItem('toDoAppCategories', JSON.stringify(this.#categories));
    localStorage.setItem('toDoAppTasks', JSON.stringify(this.#allTasks));
  }

  loadFromLocalStorage() {
    const categories = JSON.parse(localStorage.getItem('toDoAppCategories'));
    const tasks = JSON.parse(localStorage.getItem('toDoAppTasks'));
    if (categories) this.#categories = categories;
    if (tasks) this.#allTasks = tasks;
  }
}

const toDoApp = new ToDoApp();
