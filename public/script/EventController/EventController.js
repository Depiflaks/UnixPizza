import { CommandParser } from "../CommandParser/CommandParser.js";
import { Connection } from "../Connection/Connection.js";
import { StateController } from "../StateController/StateController.js";

class EventController {
    constructor(document) {
        this.parser = new CommandParser()
        this.connection = new Connection();
        this.document = document;
        this.state = new StateController();
        document.addEventListener("click", () => {
            const lastInput = document.getElementById("last");
            lastInput.querySelector("input").focus();
        })
        document.addEventListener('keydown', (event) => {this.handleKeyPress(event)});
    }

    saveToStorage({last, input, value}) {
        let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
        data.push(value);
        let lastInd = data.length;
        localStorage.setItem('cmdArr', JSON.stringify(data));
        localStorage.setItem('lastInd', JSON.stringify(lastInd));
        input.readOnly = true;
        last.removeAttribute("id");
    }
    
    pressEnter() {
        const last = this.document.getElementById("last");
        const input = last.querySelector("input");
        const value = input.value;
        this.saveToStorage({last, input, value});
        // парсинг и вверификация команды
        console.log(this.parser.parse(value));

        this.checkCommand(this.parser.parse(value))
        
        this.checkStatement();
    }

    checkCommand(cmd) {
        if (!cmd) {
            this.connection.error("there is an error in the syntax of the command, be more careful");
            return;
        }
        switch (cmd.command) {
            case "ls":
                this.connection.addElement('/add/ls');
                break;
            case "help":
                this.connection.addElement('/add/help');
                break;

        }
    }

    checkStatement() {
        switch (this.state.current()) {
            case null:
                this.connection.addElement('/add/cmdline');
                break;
        
        }
        
    }

    handleKeyPress(event) {
        const key = event.key;
        switch (key) {
            case "Enter":
                this.pressEnter();
                break;
            case "ArrowUp":
                this.pressUp()
                break;
            case "ArrowDown":
                this.pressDown()
                break;
            case "Alt":
                // Решить, дописывать, или нет
                break;
        }
    }
    
    setValue(val) {
        const last = document.getElementById("last");
        const input = last.querySelector("input");
        input.value = val ? val : "";
    }
    
    pressUp() {
        let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
        let ind = localStorage.getItem("lastInd") ? JSON.parse(localStorage.getItem("lastInd")) : 0;
        if (ind > 0) ind -= 1;
        this.setValue(data[ind]);
        localStorage.setItem('lastInd', JSON.stringify(ind));
    }
    
    pressDown() {
        let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
        let ind = localStorage.getItem("lastInd") ? JSON.parse(localStorage.getItem("lastInd")) : 0;
        if (ind < data.length) ind += 1;
        this.setValue(data[ind]);
        localStorage.setItem('lastInd', JSON.stringify(ind));
    }
}

export {EventController}