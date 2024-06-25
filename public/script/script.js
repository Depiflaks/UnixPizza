function handleKeyPress(event) {
    const key = event.key;
    switch (key) {
        case "Enter":
            pressEnter();
            break;
        case "ArrowUp":
            pressUp()
            break;
        case "ArrowDown":
            pressDown()
            break;
        case "Alt":
            console.log(4)
            break;
    }
}

function setValue(val) {
    const last = document.getElementById("last");
    const input = last.querySelector("input");
    input.value = val ? val : "";
}

function pressUp() {
    let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
    let ind = localStorage.getItem("lastInd") ? JSON.parse(localStorage.getItem("lastInd")) : 0;
    if (ind > 0) ind -= 1;
    setValue(data[ind]);
    localStorage.setItem('lastInd', JSON.stringify(ind));
}

function pressDown() {
    let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
    let ind = localStorage.getItem("lastInd") ? JSON.parse(localStorage.getItem("lastInd")) : 0;
    if (ind < data.length) ind += 1;
    setValue(data[ind]);
    localStorage.setItem('lastInd', JSON.stringify(ind));
}

function pressEnter() {
    const last = document.getElementById("last");
    const input = last.querySelector("input");
    let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
    data.push(input.value);
    console.log(data);
    let lastInd = data.length;
    localStorage.setItem('cmdArr', JSON.stringify(data));
    localStorage.setItem('lastInd', JSON.stringify(lastInd));
    input.readOnly = true;
    last.removeAttribute("id");
    // парсинг и вверификация команды
    printText("command printed") // заглушка

    addElement('/add/cmdline');
}

function nextLine() {

}

function addElement(path, param=[]) {
    fetch(path, {
        method: 'POST',
        headers: {},
        body: param,
    })
    .then(response => response.text())
    .then(data => {
        document.querySelector(".terminal-body").insertAdjacentHTML('beforeend', data);
        if (path == "/add/cmdline") document.getElementById("last").querySelector("input").focus();
    })
    .catch(error => console.error('Ошибка при добавлении блока:', error));
    window.scrollTo(0, document.body.scrollHeight);
}

function printText(text) {
    const data = {
        text: text,
    }
    const json_data = JSON.stringify(data);

    addElement("/add/text", json_data);
}

addElement('/add/tip');
//addElement('/add/help');
//addElement('/add/ls');
addElement('/add/cmdline');

document.addEventListener("click", () => {
    const lastInput = document.getElementById("last");
    lastInput.querySelector("input").focus();
})
document.addEventListener('keydown', handleKeyPress);