import { CommandParser } from "../CommandParser/CommandParser.js";
import { ConnectionView } from "../Connection/ConnectionView.js";
import { ConnectionController } from "../Connection/ConnectionController.js";
import { InputData } from "../InputData/InputData.js";
import { StateController } from "../StateController/StateController.js";
import { StorageController } from "../Storage/StorageController.js";


class EventController {
    constructor(document) {
        this.document = document;
        this.parser = new CommandParser()
        this.view = new ConnectionView();
        this.controller = new ConnectionController();
        this.state = new StateController();
        this.storage = new StorageController();
        this.input = new InputData();
        document.addEventListener("click", () => {
            const lastInput = document.getElementById("last");
            lastInput.querySelector("input").focus();
        })
        document.addEventListener('keydown', (event) => {this.handleKeyPress(event)});
    }

    newElementPrepare({input, last}) {
        input.readOnly = true;
        last.removeAttribute("id");
    }
    
    async pressEnter() {
        const obj = {
            last: this.document.getElementById("last"),
            input: this.document.getElementById("last").querySelector("input"),
            value: this.document.getElementById("last").querySelector("input").value,
        }
        this.newElementPrepare(obj);
        if (!this.state.current()) this.storage.saveCmdToStorage(obj);
            // парсинг и вверификация команды
        if (!this.state.current()) await this.checkCommand(this.parser.parse(obj.value));
        this.checkStatement(obj.value);
    }

    async checkCommand(cmd) {
        if (!cmd) {
            this.view.error("there is an error in the syntax of the command, be more careful");
            return;
        }
        let name, count, cart
        switch (cmd.command) {
            case "add":
                if (!(await this.controller.isLogin())) {
                    this.view.error("You are not logged in as a user");
                    return;
                }
                [name, count] = cmd.args;
                if (!(await this.controller.verifyPizzaName(name))) {
                    this.view.error("there is no pizza with this name in the catalog");
                    return;
                }
                if (count > 12) {
                    this.view.error("the lethal dose of pizzas for a person: 12,5. For the safety of our users lives, we cannot allow you to order more than 12 pizzas at a time");
                    return;
                }
                this.storage.updatePizzaInStorage({pizza: name, count: count})
                this.view.addPizza(name, count);
                break;
            case "login":
                if (await this.controller.isLogin()) {
                    this.view.error("you have already logged in as a user");
                    return;
                }
                this.state.startLogin();
                break;
            case "logout":
                if (!(await this.controller.isLogin())) {
                    this.view.error("before you log out of your account, you must first log in to it");
                    return;
                }
                await this.controller.logout();
                location.reload();
                this.storage.clearStorage();
                break;
            case "register":
                if (await this.controller.isLogin()) {
                    this.view.error("before creating a new account, you need to log out of the current one");
                    return;
                }
                this.state.startRegistration();
                break;
            case "new":
                if (!(await this.controller.isAdmin())) {
                    this.view.error("nice try, but you need to have administrator rights to execute this command");
                    return;
                }
                this.state.startAdding();
                break;
            case "rm":
                if (!(await this.controller.isLogin())) {
                    this.view.error("you are not logged in as a user");
                    return;
                }
                [name] = cmd.args;
                this.storage.removePizzaFromStorage({pizza: name});
                break;
            case "del":
                if (!(await this.controller.isAdmin())) {
                    this.view.error("nice try, but you need to have administrator rights to execute this command");
                    return;
                }
                let [param, id] = cmd.args;
                if (param == '-p') await this.controller.deletePizza({pizzaId: id});
                if (param == '-u') await this.controller.deleteUser({userId: id});
                if (param == '-o') await this.controller.deleteOrder({orderId: id});
                //
                break;
            case "buy":
                if (!(await this.controller.isLogin())) {
                    this.view.error("you are not logged in as a user");
                    return;
                }
                cart = this.storage.getCart();
                if (cart.length === 0) {
                    this.view.error("your cart is empty now");
                    return;
                }
                this.view.addCart(cart, await this.controller.getPizzaList());
                this.state.startBuying();
                break;
            case "cart":
                if (!(await this.controller.isLogin())) {
                    this.view.error("you are not logged in as a user");
                    return;
                }
                cart = this.storage.getCart();
                if (!cart) {
                    this.view.error("your cart is empty now");
                    return;
                }
                this.view.addCart(cart, await this.controller.getPizzaList());
                break;
            case "help":
                this.view.addElement('/add/help');
                break;
            case "ls":
                this.view.addElement('/add/ls');
                break;
            case "uls":
                if (!(await this.controller.isAdmin())) {
                    this.view.error("nice try, but you need to have administrator rights to execute this command");
                    return;
                }
                this.view.addElement('/add/uls');
                break;
            case "ols":
                if (!(await this.controller.isAdmin())) {
                    this.view.error("nice try, but you need to have administrator rights to execute this command");
                    return;
                }
                this.view.addElement('/add/ols');
                break;
        }
    }

    async checkStatement(value) {
        if (value == "exit") this.state.clean();
        switch (this.state.current()) {
            case null:
                this.input.clear();
                this.view.addElement('/add/cmdline');
                break;
            case "loginName":
                this.view.inputLine("username");
                this.state.next();
                break;
            case "loginPassword":
                if (!(await this.controller.checkUsername(value))) {
                    this.view.error("there is no user with that username. Use register to create new account or exit to cansel logination");
                    this.view.inputLine("username");
                    return
                }
                this.input.data.username = value;
                this.state.next();
                this.view.inputLine("password", false);
                break
            case "loginEnd":
                this.input.data.password = value;
                if (!((await this.controller.checkUsername(this.input.data.username)) && (await this.controller.login(this.input.data)))) {
                    this.view.error("invalid password. Use register to create new account or exit to cansel logination");
                    this.view.inputLine("password", false);
                    return
                }
                this.state.next();
                this.view.printText("welcome, " + this.input.data.username);
                this.input.clear();
                this.view.addElement('/add/cmdline');
                break;
            case "registerName":
                this.view.inputLine("username");
                this.state.next();
                break;
            case "registerEmail":
                if (await this.controller.checkUsername(value)) {
                    this.view.error("this username is already occupied");
                    this.view.inputLine("username");
                    return
                }
                if (value == "") {
                    this.view.error("this field cannot be empty");
                    this.view.inputLine("username");
                    return
                }
                this.input.data.username = value;
                this.view.inputLine("email");
                this.state.next();
                break;
            case "registerPassword":
                if (value == "") {
                    this.view.error("this field cannot be empty");
                    this.view.inputLine("email");
                    return
                }
                this.input.data.email = value;
                this.state.next();
                this.view.inputLine("password", false);
                break;
            case "registerEnd":
                if (value == "") {
                    this.view.error("this field cannot be empty");
                    this.view.inputLine("email");
                    return
                }
                this.input.data.password = value;
                this.state.next();
                await this.controller.register(this.input.data);
                this.input.clear();
                this.view.addElement('/add/cmdline');
                break;
            case "pizzaName":
                this.view.inputLine("name");
                this.state.next();
                break;
            case "pizzaIngridients":
                this.input.data.pizzaName = value;
                this.view.inputLine("ingridients");
                this.state.next();
                break;
            case "pizzaCost":
                this.input.data.pizzaIngridients = value;
                this.view.inputLine("cost");
                this.state.next();
                break;
            case "pizzaEnd":
                this.input.data.pizzaCost = value;
                this.state.next();
                await this.controller.addNewPizza(this.input.data);
                this.input.clear();
                this.view.addElement('/add/cmdline');
                break;
            case "buyAdress":
                this.view.inputLine("address");
                this.state.next();
                break;
            case "buyPhone":
                this.input.data.adress = value;
                this.view.inputLine("phone");
                this.state.next();
                break;
            case "buyEnd":
                this.input.data.phone = value;
                this.state.next();
                let cart = this.storage.getCart();
                await this.controller.addNewOrder(this.input.data, cart);
                this.input.clear();
                this.view.printText("your order has been queued. We'll call you back.");
                this.view.addElement('/add/cmdline');
                break;
        }
    }

    async handleKeyPress(event) {
        const key = event.key;
        switch (key) {
            case "Enter":
                await this.pressEnter();
                break;
            case "ArrowUp":
                this.pressUp()
                break;
            case "ArrowDown":
                this.pressDown()
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