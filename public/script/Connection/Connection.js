class Connection {
    constructor() {

    }

    addElement(path, param=[]) {
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

    printText(text) {
        const data = {
            text: text,
        }
        const json_data = JSON.stringify(data);
    
        this.addElement("/add/text", json_data);
    }

    error(text) {
        const data = {
            text: text,
        }
        const json_data = JSON.stringify(data);
    
        this.addElement("/add/error", json_data);
    }

    isLogin() {
        return true;
    }

    isAdmin() {
        return true;
    }
}

export {Connection}