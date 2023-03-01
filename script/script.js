"use strict";
function reloadPage() { window.location.reload(); }
const list = document.querySelector("#task-list");
const form = document.querySelector("#myForm");
const input = document.querySelector("#new-task");
let tasks = loadTasks();
tasks.forEach(addTask);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == null || (input === null || input === void 0 ? void 0 : input.value) == '')
        return;
    let newTask = {
        title: input.value,
        completed: true,
        createdAt: new Date()
    };
    tasks.push(newTask);
    addTask(newTask);
    input.value = '';
    saveTask();
});
function addTask(task) {
    const item = document.createElement("li");
    // Label
    const labelParent = document.createElement("div");
    const labelChild = document.createElement("input");
    labelChild.type = "text";
    labelChild.value = task.title;
    labelChild.setAttribute("class", "task-title");
    labelChild.setAttribute("readonly", "readonly");
    labelParent.setAttribute("id", "label");
    labelParent.append(labelChild);
    // Edit & Delete Buttons
    const modifyParent = document.createElement("div");
    modifyParent.setAttribute("id", "modify-parent");
    const edit = document.createElement("button");
    edit.append("Edit");
    const del = document.createElement("button");
    del.append("Delete");
    edit.setAttribute("id", "edit");
    edit.setAttribute("class", "button");
    del.setAttribute("id", "delete");
    del.setAttribute("class", "button");
    modifyParent.append(edit, del);
    // edit.setAttribute("id", "edit")
    item.append(labelParent, modifyParent);
    item.setAttribute("id", "task-list-item");
    list === null || list === void 0 ? void 0 : list.append(item);
    //Edit Function
    edit.addEventListener('click', () => {
        if (edit.innerText == "Edit") {
            labelChild.removeAttribute("readonly");
            labelChild.focus();
            edit.innerText = "Save";
        }
        else {
            console.log("save");
            labelChild.setAttribute("readonly", "readonly");
            edit.innerText = "Edit";
            task.title = labelChild.value;
            saveTask();
        }
    });
    del.addEventListener('click', () => {
        item.remove();
        console.log(labelChild.value);
        tasks = removeTask(labelChild.value);
        saveTask();
    });
}
function loadTasks() {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
function saveTask() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function removeTask(bye) {
    let newList = [];
    for (var i = 0; i < tasks.length; i++)
        if (tasks[i].title != bye)
            newList.push(tasks[i]);
    return newList;
}
