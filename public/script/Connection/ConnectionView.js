class ConnectionView {
    constructor() {
        this.addElement('/add/tip');
        this.addElement('/add/cmdline');
        //this.inputLine("aboba?", false)
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
            if (path == "/add/cmdline" || path == "/add/input_line") document.getElementById("last").querySelector("input").focus();
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

    addPizza(name, count) {
        const data = {
            name: name,
            count: count
        }
        const json_data = JSON.stringify(data);

        this.addElement("/add/add_complete", json_data);
    }

    printCart(data) {
        const json_data = JSON.stringify(data);
        this.addElement("/add/cart", json_data);
    }

    inputLine(text, password=true) {
        const data = {
            text: text,
            pass: password
        }
        const json_data = JSON.stringify(data);
    
        this.addElement("/add/input_line", json_data);
    }

    error(text) {
        const data = {
            text: text,
        }
        const json_data = JSON.stringify(data);
    
        this.addElement("/add/error", json_data);
    }

    logOut() {
        console.log("alright!");
    }
}

export {ConnectionView}