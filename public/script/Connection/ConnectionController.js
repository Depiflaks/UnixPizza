class ConnectionController {
    constructor() {

    }

    async makeRequest(path, param) {
        let response = fetch(path, {
            method: 'POST',
            headers: {},
            body: param,
        });
        if (await response.ok) {
            const result = (await response).json()
            return result;
        } else {
            console.log(response, "error")
        }
        return false;
    }

    async login({username, password}) {
        const data = {username, password};
        const json_data = JSON.stringify(data);
        await this.makeRequest("/security/login", json_data);
    }

    async register({username, password}) {
        const data = {"user_name": username, "password": password}
        const json_data = JSON.stringify(data);
        console.log(json_data);
        await this.makeRequest("user/new", json_data);
        await this.makeRequest("/security/login", json_data);
    }

    async addNewOrder({phone, adress}) {

    }
    
    async addNewPizza({pizzaCost, pizzaIngridients, pizzaName}) {

    }

    async getPizzaList() {
        const data = await this.makeRequest("pizza/list", []);
        return data;
    }

    async getUserList() {
        const data = await this.makeRequest("user/list", []);
        return data;
    }

    async isLogin() {
        const data = await this.makeRequest("security/is_login", []);
        return data["login"];
    }

    async isAdmin() {
        const data = await this.makeRequest("security/is_admin", []);
        return data["admin"];
    }

    async verifyPizzaName(name) {
        const list = await this.getPizzaList();
        let flag = false;
        for (let pizza of list) {
            flag |= (pizza.pizza_name == name)
        }
        return flag;
    }

    async checkUsername(name) {
        const list = await this.getUserList();
        console.log(list);
        let flag = false;
        if (!list) return flag;
        for (let user of list) {
            flag |= (user.user_name == name)
        }
        return flag;
    }

    async checkPassword(name, password) {
        return true;
    }
}

export { ConnectionController }