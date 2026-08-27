const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

const errorMessage = document.getElementById("errorMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Store tasks
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Save Tasks to Local Storage
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Add Task
addTaskBtn.addEventListener("click", addTask);

//  Enter key to add task
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  //  empty task
  if (taskText === "") {
    errorMessage.textContent = "Please enter a task.";
    taskInput.focus();
    return;
  }

  //  error
  errorMessage.textContent = "";

  // Create task objects
  const task = {
    id: Date.now(),
    name: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();

  
  taskInput.value = "";

  renderTasks();
}


function renderTasks() {

  taskList.innerHTML = "";
  completedList.innerHTML = "";

  let completedCount = 0;

  tasks.forEach(function (task) {

   
    const li = document.createElement("li");
    li.className = "task-item";

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    
    const taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = task.name;

    
    if (task.completed) {
      taskName.classList.add("completed");
    }

   
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(taskName);
    li.appendChild(deleteButton);

    
    if (task.completed) {
      completedList.appendChild(li);
      completedCount++;
    } else {
      taskList.appendChild(li);
    }
  });

  if (taskList.children.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No pending tasks.";
    taskList.appendChild(message);
  }

  if (completedList.children.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No completed tasks.";
    completedList.appendChild(message);
  }

 
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedCount;
}

function toggleTask(id) {

  tasks = tasks.map(function (task) {

    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {

  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

renderTasks();