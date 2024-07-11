class ConnectionController {
    constructor() {

    }

    async makeRequest(path, param) {
        let response = await fetch(path, {
            method: 'POST',
            headers: {},
            body: param,
        });
        if (response.ok) {
            const result = response.json();
            return result;
        } else {
            console.log(path, "error")
        }
        return false;
    }

    async logout() {
        await this.makeRequest("/security/logout", []);
    }

    async login({username, password}) {
        const data = {"user_name": username, "password": password};
        const json_data = JSON.stringify(data);
        const login = await this.makeRequest("/security/login", json_data)
        return login["login"];
    }

    async register({username, password, email}) {
        const data = {"user_name": username, "password": password, "email": email}
        const json_data = JSON.stringify(data);
        await this.makeRequest("user/new", json_data);
        await this.makeRequest("security/login", json_data);
    }

    async addNewOrder({phone, adress}, cart) {
        const id = (await this.makeRequest("security/get_id")).id;
        const data = {
            "user_id": id,
            "address": adress,
            "phone": phone,
            "content": ""
        }
        for (let point in cart) {
            data.content += point + ":" + cart[point]+";"
        }
        const json_data = JSON.stringify(data);
        await this.makeRequest("order/create", json_data);
    }
    
    async addNewPizza({pizzaCost, pizzaIngridients, pizzaName}) {
        const data = {
            "pizza_name": pizzaName, 
            "ingridients": pizzaIngridients,
            "cost": pizzaCost,
        }
        const json_data = JSON.stringify(data);

        return await this.makeRequest("pizza/new", json_data)
    }

    async deletePizza({pizzaId}) {
        await this.makeRequest("pizza/delete/" + pizzaId, []);
    }

    async deleteUser({userId}) {
        await this.makeRequest("user/delete/" + userId, []);
    }

    async deleteOrder({orderId}) {
        await this.makeRequest("order/delete/" + orderId, []);
    }

    async getPizzaList() {
        return await this.makeRequest("pizza/list", []);
    }

    async getUserList() {
        return await this.makeRequest("user/list", []);
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
        const data = {
            "user_name": name, 
        }
        const json_data = JSON.stringify(data);
        return (await this.makeRequest("user/check_name", json_data))["user"]
    }
}

export { ConnectionController }