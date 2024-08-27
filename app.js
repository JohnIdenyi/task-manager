const addInput = document.querySelector("#add-item");
const searchInput = document.querySelector("#search");
const items = document.querySelector(".grocery-items");
const addBtn = document.querySelector(".add-btn");
const saveBtn = document.querySelector(".save-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
let taskCount = 0;
let toggle = true;

addBtn.addEventListener("click", addTask);
searchInput.addEventListener("keyup", searchTask);
deleteAllBtn.addEventListener("click", deleteAllTask);
items.addEventListener("click", deleteTask);
items.addEventListener("click", editTask);
items.addEventListener("click", completeTask);

function addTask(e) {
  // e.preventDefault();
  items.children.length < 1 ? (taskCount = 1) : taskCount++;

  const li = document.createElement("li");
  li.className = "item";
  items.appendChild(li);

  const number = document.createElement("span");
  number.appendChild(document.createTextNode(taskCount));
  li.appendChild(number);

  const text = document.createElement("span");
  text.appendChild(document.createTextNode(addInput.value));
  li.appendChild(text);

  // Edit button
  createButton(li, "btn-edit", "fa-solid fa-pen-to-square");

  // Complete button
  createButton(li, "btn-complete", "fa-solid fa-square-check");

  // Delete button
  createButton(li, "btn-delete", "fa-solid fa-trash");

  addInput.value = "";
}

function createButton(li, buttonClass, iconClass) {
  const button = document.createElement("button");
  button.className = buttonClass;
  const icon = document.createElement("i");
  icon.className = iconClass;
  button.appendChild(icon);

  li.appendChild(button);
}

function deleteAllTask() {
  const itemsParent = Array.from(items.children);
  itemsParent.forEach((item) => item.remove());
}

function searchTask(e) {
  const textInput = searchInput.value.toLowerCase();
  const itemsParent = Array.from(items.children);

  itemsParent.forEach((item) => {
    const element = item.children[1];
    if (element.textContent.toLowerCase().includes(textInput)) {
      element.parentElement.style.display = "block";
    } else {
      element.parentElement.style.display = "none";
    }
  });
}

function deleteTask(e) {
  if (e.target.classList.contains("fa-trash")) {
    items.removeChild(e.target.parentElement.parentElement);
  }

  const itemsParent = Array.from(items.children);
  itemsParent.forEach((item, index) => {
    item.children[0].textContent = index + 1;
  });
}

function editTask(e) {
  if (e.target.classList.contains("fa-pen-to-square")) {
    addInput.focus();
    saveBtn.style.display = "block";
    addBtn.style.display = "none";

    const element = e.target.parentElement.previousElementSibling;
    addInput.value = element.textContent;

    saveBtn.onclick = () => {
      element.textContent = addInput.value;

      saveBtn.style.display = "none";
      addBtn.style.display = "block";

      addInput.value = "";
    };
  }
}

function completeTask(e) {
  const element =
    e.target.parentElement.previousElementSibling.previousElementSibling;

  if (e.target.classList.contains("fa-square-check")) {
    if (toggle) {
      underLineTask(element);
      toggle = false;
    } else {
      removeUnderLine(element);
      toggle = true;
    }
  }
}

function underLineTask(element) {
  element.style.textDecoration = "line-through";
  element.style.opacity = "0.5";
}

function removeUnderLine(element) {
  element.style.textDecoration = "none";
  element.style.opacity = "1";
}
