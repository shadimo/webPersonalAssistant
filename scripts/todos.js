// Select Dom Element
const TodoListElements = document.querySelector(".todos-list");
const formTodo = document.querySelector("#form-todo");
const inputTodo = document.querySelector("#todo-input-title");
const todoContainer = document.querySelector(".todo-container");
const toDoButton = document.querySelector(".add-todo");
// URL
const url = "http://localhost:3000";
// Get todos
const getToDOs = async () => {
  const response = await fetch(url + "/todos");
  const todos = await response.json();

  // Clear the existing todos before appending the updated list
  TodoListElements.innerHTML = "";

  for (const todo of todos) {
    TodoListElements.innerHTML += `<li data-id="${todo.id}">
              <input class="input-check" type="checkbox" />
              <p>${todo.title}</p>
              <div class="todo-list-icon">
                <i data-id="${todo.id}">
                  <iconify-icon icon="clarity:edit-line" class="edit-todo"></iconify-icon>
                </i>
                <i data-id="${todo.id}">
                  <iconify-icon
                    icon="material-symbols-light:delete-outline"
                    class="delete-todo"
                  ></iconify-icon>
                </i>
              </div>
            </li>`;
  }
};
// Create ToDo
const createToDo = async (data) => {
  const response = await fetch(url + "/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  // After creating, fetch and append the new todo to the list
  getToDOs();
};
// Update ToDo
const updateToDo = async (id, data) => {
  const response = await fetch(url + `/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  // After updating, fetch and append the updated todo to the list
  getToDOs();
};

// Create or update todo function
formTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    title: inputTodo.value,
  };
  if (currentTodoId) {
    // If currentTodoId exists, it means we want to update an existing todo
    updateToDo(currentTodoId, data);
    // Clear the currentTodoId after editing
    currentTodoId = null;
  } else if (inputTodo.value.trim()) {
    // If currentTodoId is not set, it means we want to create a new todo
    createToDo(data);
  } else {
    alert("you have to enter a task!!");
  }
  // Clear the input field after creating or updating todo
  inputTodo.value = "";
});
// Delete todo function
const deleteToDo = async (id) => {
  const response = await fetch(url + `/todos/${id}`, {
    method: "DELETE",
  });
  // After deleting, fetch and append the updated list
  getToDOs();
};
let currentTodoId;
todoContainer.addEventListener("click", function (e) {
  const id = e.target.closest("i").dataset.id;

  if (e.target.classList.contains("delete-todo")) {
    // Handle delete button click
    const isOk = confirm("Are you sure?");
    if (isOk) {
      deleteToDo(id);
    }
  } else if (e.target.classList.contains("edit-todo")) {
    // Handle edit button click
    const todo = document.querySelector(`li[data-id="${id}"] p`).textContent;
    inputTodo.value = todo;
    currentTodoId = id;
  }
});
// Toggle line-through style when checkbox is clicked
TodoListElements.addEventListener("change", (e) => {
  if (
    e.target.tagName === "INPUT" &&
    e.target.classList.contains("input-check")
  ) {
    const listItem = e.target.closest("li");
    listItem.classList.toggle("completed-task");
  }
});

// ... (your existing code) ...

// Hide buttons function
const hideButtons = () => {
  document.querySelectorAll(".todo-list-icon").forEach((icon) => {
    icon.style.display = "none";
  });
};

// Event listener for mouseover and mouseout using event delegation
TodoListElements.addEventListener("mouseover", (e) => {
  const listItem = e.target.closest("li");
  if (listItem) {
    hideButtons();
    const buttons = listItem.querySelector(".todo-list-icon");
    buttons.style.display = "flex";
  }
});

TodoListElements.addEventListener("mouseout", (e) => {
  const listItem = e.target.closest("li");
  if (listItem) {
    hideButtons();
  }
});

// Initial fetch of todos
getToDOs();
