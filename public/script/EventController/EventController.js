import { verify } from "crypto";
import { CommandParser } from "../CommandParser/CommandParser.js";
import { Connection } from "../Connection/Connection.js";
import { StateController } from "../StateController/StateController.js";

class EventController {
    constructor(document) {
        this.document = document;
        this.parser = new CommandParser()
        this.connection = new Connection();
        console.log(123);
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
        if (!this.state.current()) this.checkCommand(this.parser.parse(value))
        
        this.checkStatement(value);
    }

    checkCommand(cmd) {
        if (!cmd) {
            this.connection.error("there is an error in the syntax of the command, be more careful");
            return;
        }
        if (this.parser.isInfo(cmd.command) && (this.parser.isAdmin(cmd.command) && this.connection.isAdmin || !this.parser.isAdmin(cmd.command))) {
            this.connection.addElement('/add/' + cmd.command);
            return;
        }
        switch (cmd.command) {
            case "add":
                const [name, count] = cmd.args;
                if (!this.connection.verifyPizzaName(name)) {
                    this.connection.error("there is no pizza with this name in the catalog");
                    return;
                }
                if (count > 12) {
                    this.connection.error("the lethal dose of pizzas for a person: 12,5; For the safety of our users' lives, we cannot allow you to order more than 12 pizzas at a time");
                    return;
                }
                this.connection.printText("pizza " + name + " in the amount of " + count + " pieces has been successfully added to your cart");
                break;
        }
    }

    checkStatement(value) {
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