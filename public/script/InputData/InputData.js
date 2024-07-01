class InputData {
    constructor() {
        this.clear();
    }

    clear() {
        this.data = {
            username: "",
            password: "",
            email: "",
            pizzaName: "",
            pizzaIngridients: "",
            pizzaCost: 0,
            adress: "",
            phone: "",
        }
    }
}

export {InputData};