import './index.css';
import addElem from './modules/addElement';
import TaskList from './modules/classTaskList';
import refreshList from './modules/refresh';

const taskList = new TaskList();
// dom
const mainContainer = document.querySelector('.todo-list-container');
// HTML skeleton
// Header (Title and input)
mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>`;
const inputContainer = addElem('form', [], mainContainer);
const inputText = addElem('input', ['input-add-task'], inputContainer);
inputText.setAttribute('placeholder', 'Add to your list...');
addElem('i', ['fa-solid', 'fa-arrow-right-to-bracket', 'fa-sm', 'font-awesome-icon'], inputContainer);
// Main (list)

const listContainer = addElem('div', [], mainContainer);
// Bottom (button)
const clearBtn = addElem('button', ['button'], mainContainer);
clearBtn.textContent = 'Clear all completed';

// Input
inputContainer.onsubmit = (e) => {
  e.preventDefault();
  taskList.addTask(inputText.value);

  inputContainer.reset();
  refreshList(taskList, listContainer);
};

// clear button
clearBtn.onclick = () => {
  const data = JSON.parse(localStorage.getItem('taskList'));

  const newData = data.filter((task) => !task.completed === true);
  localStorage.setItem('taskList', JSON.stringify(newData));
  window.location.reload();
};

// On load
refreshList(taskList, listContainer);