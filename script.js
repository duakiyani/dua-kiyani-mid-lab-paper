const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterSubject = document.getElementById("filterSubject");
const sortBtn = document.getElementById("sortBtn");

let tasks = [];

const displayTasks = (taskArray) => {
    taskList.innerHTML = "";

    taskArray.forEach(({ name, subject, dueDate }) => {
        taskList.innerHTML += `
        <tr>
            <td>${name}</td>
            <td>${subject}</td>
            <td>${dueDate}</td>
        </tr>
        `;
    });
};

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = {
        name: document.getElementById("taskName").value,
        subject: document.getElementById("subject").value,
        dueDate: document.getElementById("dueDate").value
    };

    tasks.push(task);
    displayTasks(tasks);
    taskForm.reset();
});

filterSubject.addEventListener("change", () => {
    const selected = filterSubject.value;

    const filtered = selected === "All"
        ? tasks
        : tasks.filter(task => task.subject === selected);

    displayTasks(filtered);
});

sortBtn.addEventListener("click", () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    displayTasks(tasks);
});

fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
.then(response => response.json())
.then(data => {
    const apiData = document.getElementById("apiData");

    data.forEach(item => {
        apiData.innerHTML += `<li>${item.title}</li>`;
    });
});