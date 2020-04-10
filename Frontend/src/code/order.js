import Axios from 'axios';

const Order = {
    BuildPizza: function (special, size, toppings) {
        return (
            {
                id: 0,
                special: special,
                specialId: special.id,
                size: size,
                toppings: toppings,
                defaultSize: 30,
                minimumSize: 20,
                maximumSize: 40,
                incrementSize: 2
            }
        );
    },

    GetFormattedPizzaPrice: function (pizza) {
        return this.GetTotalFormated((pizza.size / pizza.defaultSize) * pizza.special.basePrice);
    },

    GetTotalPrice: function (pizza) {
        return (pizza.size / pizza.defaultSize) * pizza.special.basePrice;
    },

    GetTotalFormated: function (total) {
        return parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },

    async PlaceOrder(userId, pizzas) {
        var order = {
            userId: userId,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            pizzas: pizzas.map((pizza) => {
                var item = {
                    specialId: pizza.specialId,
                    size: pizza.size,
                    toppings: pizza.toppings.map((topping) => {
                        return {
                            toppingId: topping.id
                        }
                    })
                };
                return item;
            })
        };

        var resp = await Axios.post('http://localhost:1337/orders', order);

        return resp;
    },

    GetFormattedDate: function (createdTime) {
        var dateTimeString = createdTime.split(/[-T:.Z]/);
        return new Date(dateTimeString[0], dateTimeString[1] - 1, dateTimeString[2], dateTimeString[3], dateTimeString[4], dateTimeString[5], dateTimeString[6]);
    }
}

export default Order;