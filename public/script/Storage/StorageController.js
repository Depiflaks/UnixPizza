class StorageController {
    constructor() {
        
    }

    saveCmdToStorage({value}) {
        let data = localStorage.getItem("cmdArr") ? JSON.parse(localStorage.getItem("cmdArr")) : [];
        data.push(value);
        let lastInd = data.length;
        localStorage.setItem('cmdArr', JSON.stringify(data));
        localStorage.setItem('lastInd', JSON.stringify(lastInd));
    }

    updatePizzaInStorage({pizza, count}) {
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        if (cart[pizza]) {
            cart[pizza] += parseInt(count);
        } else {
            cart[pizza] = parseInt(count);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    removePizzaFromStorage({pizza}) {
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        delete cart[pizza];
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCart() {
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;
        return cart;
    }

    clearStorage() {
        localStorage.setItem('cart', JSON.stringify({}));
        localStorage.setItem('cmdArr', JSON.stringify([]));
        localStorage.setItem('lastInd', JSON.stringify(0));
    }
}

export {StorageController}