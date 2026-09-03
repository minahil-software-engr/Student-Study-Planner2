let input_name = document.querySelector("#nameInput");
let continuebtn = document.querySelector("#continueBtn");

let welcomeSection = document.querySelector("#welcomeSection");
let dashboard = document.querySelector("#dashboard");
let welcomeArea = document.querySelector(".welcome-area");

let addbtn = document.querySelector("#addBtn");
let taskTitle = document.querySelector("#taskTitle");
let taskSubject = document.querySelector("#taskSubject");
let taskStatus = document.querySelector("#taskStatus");

let taskList = document.querySelector("#taskList");
let emptyTasKMessage = document.querySelector("#emptyTaskMessage");

let taskfilter = document.querySelector(".task-filters");
let navRight = document.querySelector(".right-nav");
let menuBtn = document.querySelector("#menuBtn");


let information_card = document.querySelector("#studyTips .information-card");
let paragraphInfo = document.querySelector(".paragraph-info");
let readingModeButton = document.querySelector("#readingModeBtn");
let aboutBtn = document.querySelector("#aboutbtn");

let ul = document.createElement("ul");
taskList.appendChild(ul);

let lower_case_name = "";
let input_list = [];
let tips_key = "";
let readingMode = false;

function paragraphCounting() {
    if (!information_card || !paragraphInfo) {
        return;
    }
    let paragraphCount = paragraphInfo.querySelector("span");
    
    if (!paragraphCount) {
        paragraphCount = document.createElement("span");
        paragraphInfo.appendChild(paragraphCount);
    }

    paragraphCount.textContent = information_card.querySelectorAll("p").length;
}

continuebtn.addEventListener("click", () => {
    lower_case_name = input_name.value.trim().replace(/\s+/g, "").toLowerCase();

    if (lower_case_name === "" || !/^[a-zA-Z]+$/.test(lower_case_name)) {
        alert("Please enter your name");
        return;
    }

    welcomeArea.innerHTML = "";

    let welcomeUser = document.createElement("h1");
    welcomeUser.classList.add("welcome-user");
    welcomeUser.textContent = `Welcome ${lower_case_name}`;

    welcomeArea.appendChild(welcomeUser);

    welcomeSection.classList.add("hidden");
    dashboard.classList.remove("hidden");

    input_list = JSON.parse(localStorage.getItem(lower_case_name)) || [];

    renderList();

    tips_key = "study_tips_" + lower_case_name;

   let saved_tips = localStorage.getItem(tips_key);
   if (saved_tips) {
    information_card.innerHTML = saved_tips;
} else {
    information_card.innerHTML = `
        <p contenteditable="true">Create a realistic study schedule and divide large topics into smaller and manageable sections.</p>
        <p contenteditable="true">Take short breaks during long study sessions. Short breaks can help you maintain your concentration and avoid mental fatigue.</p>
        <p contenteditable="true">Review difficult topics regularly instead of waiting until the day before an exam.</p>
        <p contenteditable="true">Practice what you learn by solving problems, writing code, and building small projects.</p>
        <p contenteditable="true">Keep track of your progress and celebrate small achievements to stay motivated.</p>
    `;
}
paragraphCounting();
input_name.value = "";

});

function controlEmptyMessage() {
    if (input_list.length === 0) {
        emptyTasKMessage.classList.remove("hidden");
    } else {
        emptyTasKMessage.classList.add("hidden");
    }
}

function renderList() {
    ul.innerHTML = "";

    input_list.forEach((task, index) => {
        let li = document.createElement("li");
        li.dataset.status = task.status;

        let taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        let title = document.createElement("strong");
        title.textContent = `𝙏𝙖𝙨𝙠 𝙏𝙞𝙩𝙡𝙚: ${task.title}`;

        let subject = document.createElement("strong");
        subject.textContent = `𝙏𝙖𝙨𝙠 𝙎𝙪𝙗𝙟𝙚𝙘𝙩: ${task.subject}`;

        let status = document.createElement("strong");
        status.textContent = `𝙏𝙖𝙨𝙠 𝙎𝙩𝙖𝙩𝙪𝙨: ${task.status}`;

        taskInfo.appendChild(title);
        taskInfo.appendChild(subject);
        taskInfo.appendChild(status);

        let menuBtn = document.createElement("button");
        menuBtn.classList.add("menu-btn");
        menuBtn.textContent = "⋮";
        menuBtn.type = "button";
        menuBtn.dataset.index = index;

        let menu = document.createElement("div");
        menu.classList.add("task-menu", "hidden");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";
        editBtn.type = "button";
        editBtn.dataset.index = index;

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.dataset.index = index;

        menu.appendChild(editBtn);
        menu.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(menuBtn);
        li.appendChild(menu);

        ul.appendChild(li);
    });

    controlEmptyMessage();
}

addbtn.addEventListener("click", () => {
    let title = taskTitle.value.trim();
    let subject = taskSubject.value.trim();
    let status = taskStatus.value;

    if (title === "" || subject === "") {
        alert("Please enter all credentials");
        return;
    }

    let task = {
        title: title,
        subject: subject,
        status: status
    };

    input_list.push(task);

    localStorage.setItem(
        lower_case_name,
        JSON.stringify(input_list)
    );

    renderList();

    taskTitle.value = "";
    taskSubject.value = "";
    taskStatus.value = "pending";
});

ul.addEventListener("click", (event) => {

    if (event.target.classList.contains("menu-btn")) {

        let li = event.target.closest("li");
        let menu = li.querySelector(".task-menu");

        document.querySelectorAll(".task-menu").forEach(currentMenu => {
            if (currentMenu !== menu) {
                currentMenu.classList.add("hidden");
            }
        });

        menu.classList.toggle("hidden");
    }

    else if (event.target.classList.contains("delete")) {

        let index = Number(event.target.dataset.index);

        input_list.splice(index, 1);

        localStorage.setItem(
            lower_case_name,
            JSON.stringify(input_list)
        );

        renderList();
    }

    else if (event.target.classList.contains("edit")) {

        let index = Number(event.target.dataset.index);

        let li = event.target.closest("li");
        let taskInfo = li.querySelector(".task-info");

        let editTitle = document.createElement("input");
        editTitle.classList.add("edit-title");
        editTitle.type = "text";
        editTitle.value = input_list[index].title;

        let editSubject = document.createElement("input");
        editSubject.classList.add("edit-subject");
        editSubject.type = "text";
        editSubject.value = input_list[index].subject;

        let editSelect = document.createElement("select");
        editSelect.classList.add("edit-select");

        let editPending = document.createElement("option");
        editPending.value = "pending";
        editPending.textContent = "Pending";

        let editCompleted = document.createElement("option");
        editCompleted.value = "completed";
        editCompleted.textContent = "Completed";

        editSelect.appendChild(editPending);
        editSelect.appendChild(editCompleted);

        editSelect.value = input_list[index].status;

        taskInfo.innerHTML = "";

        taskInfo.appendChild(editTitle);
        taskInfo.appendChild(editSubject);
        taskInfo.appendChild(editSelect);

        let menu = li.querySelector(".task-menu");
        menu.classList.add("hidden");

        event.target.textContent = "Save";
        event.target.classList.remove("edit");
        event.target.classList.add("save");
    }

    else if (event.target.classList.contains("save")) {

        let index = Number(event.target.dataset.index);

        let li = event.target.closest("li");

        let editTitle = li.querySelector(".edit-title");
        let editSubject = li.querySelector(".edit-subject");
        let editSelect = li.querySelector(".edit-select");

        if (
            editTitle.value.trim() === "" ||
            editSubject.value.trim() === ""
        ) {
            alert("Please enter all credentials");
            return;
        }

        input_list[index] = {
            title: editTitle.value.trim(),
            subject: editSubject.value.trim(),
            status: editSelect.value
        };

        localStorage.setItem(
            lower_case_name,
            JSON.stringify(input_list)
        );

        renderList();
    }
});

taskfilter.addEventListener("click", (event) => {

    if (!event.target.classList.contains("filter-btn")) {
        return;
    }

    let buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");

    let filter = event.target.dataset.filter;

    let tasks = ul.querySelectorAll("li");

    tasks.forEach(task => {

        if (filter === "all") {
            task.classList.remove("hidden");
        }

        else if (task.dataset.status === filter) {
            task.classList.remove("hidden");
        }

        else {
            task.classList.add("hidden");
        }
    });
});

menuBtn.addEventListener("click", () => {
    navRight.classList.toggle("show");
});

navRight.addEventListener("click", (event) => {

    if (!event.target.classList.contains("nav-btn")) {
        return;
    }

    let navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");

    let contents = document.querySelectorAll(".content-section");

    contents.forEach(content => {
        content.classList.add("hidden");
    });

    let contentId = event.target.dataset.content;

    let selectedContent = document.getElementById(contentId);

    selectedContent.classList.remove("hidden");

    navRight.classList.remove("show");
});

information_card.addEventListener("input", () => {

    if (tips_key !== "") {
        localStorage.setItem(
            tips_key,
            information_card.innerHTML
        );
    }

    paragraphCounting();
});

information_card.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        let newParagraph = document.createElement("p");

        newParagraph.contentEditable = true;
        newParagraph.textContent = "";

        information_card.appendChild(newParagraph);

        newParagraph.focus();

        paragraphCounting();
    }
});

readingModeButton.addEventListener("click", () => {

    let paragraphs = information_card.querySelectorAll("p");

    readingMode = !readingMode;

    paragraphs.forEach(p => {

        if (readingMode) {
            p.style.color = "blue";
        }

        else {
            p.style.color = "";
        }
    });

    if (readingMode) {
        readingModeButton.textContent = "Disable Reading Mode";
    }

    else {
        readingModeButton.textContent = "Enable Reading Mode";
    }
});

aboutBtn.addEventListener("click", () => {

    let contents = document.querySelectorAll(".content-section");

    contents.forEach(content => {
        content.classList.add("hidden");
    });

    document.querySelector("#about").classList.remove("hidden");

    navRight.classList.remove("show");
});

paragraphCounting();

let logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click",()=>{
    dashboard.classList.add("hidden");
    welcomeSection.classList.remove("hidden");
});