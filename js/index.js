const listContainer = document.querySelector(".todoList");
const todoCreateButton = document.querySelector(".todoInputCreate");
const todoForm = document.querySelector(".todoCreate");
const infoContainer = document.querySelector(".info-container");
let todos = [];
function infoControl(text) {
  let info = document.createElement("div");
  info.setAttribute("class", "info");
  infoContainer.appendChild(info);
  info.style.display = "flex";
  info.innerHTML = text;
  setTimeout(() => {
    info.style.opacity = 1;
  }, 200);
  setTimeout(() => (info.style.opacity = 0), 800);
  setTimeout(() => info.remove(), 1200);
}
function renderTodo(todo, first = false) {
  localStorage.setItem("todos", JSON.stringify(todos));
  let liNode = document.querySelector(`[data-key="${todo.id}"]`);
  if (todo.deleted) {
    liNode.remove();
    infoControl("Deleted from to list");
    if (todos.length === 0) listContainer.innerHTML = "";
    return;
  }
  let liDom = document.createElement("li");
  liDom.setAttribute("data-key", todo.id);
  liDom.className = `todoList-Item ${todo.checked ? "done" : ""}`;
  liDom.innerHTML = `<span class="todoList-Item-content">${todo.text}</span>
    <button class="todoList-Item-delete"><span class="iconify" data-icon="eva:close-outline"></span></button>`;
  if (liNode) {
    listContainer.replaceChild(liDom, liNode);
    let check = todo.checked ? "Completed" : "Incomplete";
    infoControl(check);
  } else {
    if (first) {
      listContainer.prepend(liDom);
    } else {
      listContainer.prepend(liDom);
      infoControl("Added to list");
    }
  }
}
function todoAdd(text) {
  const todo = {
    id: Date.now(),
    checked: false,
    text,
  };
  todos.push(todo);
  renderTodo(todo);
}

function todoRemove(key) {
  let index = todos.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todos[index],
  };
  todos = todos.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}
function todoChecked(key) {
  let index = todos.findIndex((item) => item.id === Number(key));
  todos[index].checked = !todos[index].checked;
  renderTodo(todos[index]);
}

listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("todoList-Item-content"))
    todoChecked(e.target.parentElement.dataset.key);
  if (e.target.classList.contains("todoList-Item-delete"))
    todoRemove(e.target.parentElement.dataset.key);
});

todoForm.addEventListener("submit", (e) => {
  const todoInput = document.querySelector("#todoInput");
  e.preventDefault();
  let text = todoInput.value.trim();
  if (text) {
    todoAdd(text);
    todoInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let ref = localStorage.getItem("todos");
  if (ref) {
    todos = JSON.parse(ref);
    todos.map((x) => {
      renderTodo(x, true);
    });
  }
});
