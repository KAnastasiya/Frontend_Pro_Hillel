import { createDOMElement, convertPreudoArrayToArray }  from './utils';

export default class Todolist {
  constructor(elem) {
    this.todoList = elem;
    this.taskId = 1;

    this.onEnterKeyUp = this.onEnterKeyUp.bind(this);
    this.onNewTaskNameInput = this.onNewTaskNameInput.bind(this);
    this.onNewTaskBtnClick = this.onNewTaskBtnClick.bind(this);
    this.onCheckTaskClick = this.onCheckTaskClick.bind(this);
    this.onRemoveTaskClick = this.onRemoveTaskClick.bind(this);
    this.onCheckAllTaskClick = this.onCheckAllTaskClick.bind(this);
    this.onRemoveAllTaskClick = this.onRemoveAllTaskClick.bind(this);

    this.init();
  }

  init() {
    createDOMElement('h1', this.todoList, {
      className: 'todolist__title',
      textContent: 'TodoList'
    });

    const newTask = createDOMElement('div', this.todoList, {
      className: 'todolist__add-task'
    });

    this.newTaskName = createDOMElement('input', newTask, {
      type: 'text',
      className: 'input input--text input--new-task',
      placeholder: 'Enter task'
    });
    this.newTaskName.addEventListener('input', this.onNewTaskNameInput);

    this.newTaskBtn = createDOMElement('button', newTask, {
      type: 'button',
      className: 'btn btn--primary btn--add',
      textContent: 'Add',
      disabled: true
    });
    this.newTaskBtn.addEventListener('click', this.onNewTaskBtnClick);

    this.todoList.addEventListener('keyup', this.onEnterKeyUp);
  }

  renderTasksContainer() {
    this.tasks = createDOMElement('ul', this.todoList, {
      className: 'todolist__tasks tasks'
    });
    this.tasks.addEventListener('click', this.onCheckTaskClick);
    this.tasks.addEventListener('click', this.onRemoveTaskClick)
  }

  renderControls() {
    this.controls = createDOMElement('div', this.todoList, {
      className: 'todolist__controls'
    });

    const tips = createDOMElement('p', this.controls, {
      className: 'todolist__tips'
    });

    this.currentCheckedTasks = createDOMElement('span', tips, {
      className: 'current-checked-tasks',
      textContent: '0'
    });

    createDOMElement('span', tips, {
      textContent:' items checked'
    });

    this.checkAllTasksBtn = createDOMElement('button', this.controls, {
      type: 'button',
      className: 'btn btn--additional btn--check',
      textContent: 'Check all'
    });
    this.checkAllTasksBtn.addEventListener('click', this.onCheckAllTaskClick);

    this.clearTaskListBtn = createDOMElement('button', this.controls, {
      type: 'button',
      className: 'btn btn--additional btn--clear',
      textContent: 'Remove all',
      disabled: true
    });
    this.clearTaskListBtn.addEventListener('click', this.onRemoveAllTaskClick);
  }

  renderTask(text) {
    if (!this.tasks) {
      this.renderTasksContainer();
    }

    const task = createDOMElement('li', this.tasks, {
      className: 'tasks__item'
    });

    createDOMElement('input', task, {
      type: 'checkbox',
      className: 'input input--checkbox',
      name: 'taskList',
      id: `checkbox-${this.taskId}`,
      value: `checkbox-${this.taskId}`
    });

    createDOMElement('label', task, {
      htmlFor: `checkbox-${this.taskId}`,
      className: 'label label--checkbox',
      textContent: text
    });

    createDOMElement('div', task, {
      className: 'icon icon--remove'
    });

    this.taskId++;
  };

  addTaskToList() {
    this.renderTask(this.newTaskName.value);
    this.newTaskName.value = '';
    this.newTaskBtn.disabled = true;

    if (!this.controls) {
      this.renderControls();
    } else {
      this.updateControlsState();
    }
  };

  removeTaskFromList(elem) {
    this.tasks.removeChild(elem);
    if (!this.tasks.firstChild) {
      this.todoList.removeChild(this.tasks);
      this.todoList.removeChild(this.controls);
      this.tasks = null;
      this.controls = null;
      this.checkAllTasksBtn = null;
      this.clearTaskListBtn = null;
      this.currentCheckedTasks = null;
    }
  }

  get checkedTasksCount() {
    const tasks = convertPreudoArrayToArray(this.tasks.children);
    return tasks.filter(item => item.querySelector('.input--checkbox:checked')).length;
  }

  updateControlsState() {
    if (this.tasks) {
      const currentCheckedTasksCount = this.checkedTasksCount;
      this.currentCheckedTasks.textContent = currentCheckedTasksCount;
      this.clearTaskListBtn.disabled = !(currentCheckedTasksCount > 0);
      this.checkAllTasksBtn.textContent = !(currentCheckedTasksCount === this.tasks.children.length) ? 'Check all' : 'Uncheck all';
    }
  }

  onNewTaskNameInput(event) {
    this.newTaskBtn.disabled = !event.currentTarget.value;
  }

  onNewTaskBtnClick() {
    this.addTaskToList();
  }

  onEnterKeyUp(event) {
    if (event.keyCode === 13 && this.newTaskName.value) {
      this.addTaskToList();
    }
  };

  onCheckTaskClick(event) {
    if (event.target.classList.contains('input--checkbox')) {
      this.updateControlsState();
    }
  };

  onCheckAllTaskClick() {
    const tasks = convertPreudoArrayToArray(this.tasks.children);
    const currentCheckedCount = this.checkedTasksCount;
    tasks.forEach(item => item.querySelector('.input--checkbox').checked = !(currentCheckedCount === tasks.length));
    this.updateControlsState();
  };

  onRemoveTaskClick(event) {
    if (event.target.classList.contains('icon--remove')) {
      this.removeTaskFromList(event.target.parentElement);
      this.updateControlsState();
    }
  };

  onRemoveAllTaskClick() {
    const tasks = this.tasks.children;
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].querySelector('.input--checkbox:checked')) {
        this.removeTaskFromList(tasks[i]);
      }
    }
    this.updateControlsState();
  };
}
