const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
  const value = taskInput.value.trim();
  if (value) {
    tasks.push({text: value, complete: false});
    taskInput.value = '';
    updateTasks();
  }
});

function updateTasks() {
  taskList.innerHTML = '';
  let completed = 0;
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.complete ? ' complete' : '');
    li.innerHTML = `
      <span>${task.text}</span>
      <span>
        <button class="complete" onclick="completeTask(${idx})">✓</button>
        <button class="edit" onclick="editTask(${idx})">✎</button>
        <button class="delete" onclick="deleteTask(${idx})">×</button>
      </span>
    `;
    taskList.appendChild(li);
    if (task.complete) completed++;
  });
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressFill.style.width = percent + '%';
}

window.completeTask = function(idx) {
  tasks[idx].complete = !tasks[idx].complete;
  updateTasks();
};

window.deleteTask = function(idx) {
  tasks.splice(idx, 1);
  updateTasks();
};

window.editTask = function(idx) {
  const newText = prompt('Edit Task', tasks[idx].text);
  if (newText) {
    tasks[idx].text = newText;
    updateTasks();
  }
};
