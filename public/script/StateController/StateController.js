class StateController {
    constructor() {
        this._current = null;
        this.transitions = {
            "loginName": {
                name: "loginName",
                next: "loginPassword",
            },
            "loginPassword": {
                name: "loginPassword",
                next: "loginEnd",
            },
            "loginEnd": {
                name: "loginEnd",
                next: null,
            },
            "registerName": {
                name: "registerName",
                next: "registerEmail",
            },
            "registerEmail": {
                name: "registerEmail",
                next: "registerPassword",
            },
            "registerPassword": {
                name: "registerPassword",
                next: "registerEnd",
            },
            "registerEnd": {
                name: "registerEnd",
                next: null,
            },
            "pizzaName": {
                name: "pizzaName",
                next: "pizzaIngridients",
            },
            "pizzaIngridients": {
                name: "pizzaIngridients",
                next: "pizzaCost",
            },
            "pizzaCost": {
                name: "pizzaCost",
                next: "pizzaEnd",
            },
            "pizzaEnd": {
                name: "pizzaEnd",
                next: null,
            },
            "buyAdress": {
                name: "buyAdress",
                next: "buyPhone",
            },
            "buyPhone": {
                name: "buyPhone",
                next: "buyEnd",
            },
            "buyEnd": {
                name: "buyEnd",
                next: null,
            },
        }

    }

    startLogin() {
        this._current = this.transitions["loginName"];
    }

    startRegistration() {
        this._current = this.transitions["registerName"];
    }

    startAdding() {
        this._current = this.transitions["pizzaName"];
    }

    startBuying() {
        this._current = this.transitions["buyAdress"];
    }

    clean() {
        this._current = null;
    }

    next() {
        if (this.current) this._current = this.transitions[this._current.next]
    }

    current() {
        return (this._current) ? this._current.name : null
    }
}

export { StateController }