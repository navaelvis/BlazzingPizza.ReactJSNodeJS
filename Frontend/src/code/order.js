import Axios from 'axios';
import Utilities from './utilities';

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
        return Utilities.ApllyCurrencyFormat((pizza.size / pizza.defaultSize) * pizza.special.basePrice);
    },

    GetFormattedPizzaTotalPrice: function (pizza) {
        return Utilities.ApllyCurrencyFormat(this.GetPizzaTotalPrice(pizza));
    },

    GetFormattedOrderTotalPrice: function (pizzas) {
        var totalOrder = 0;
        pizzas.map((pizza) => {
            totalOrder += this.GetPizzaTotalPrice(pizza);
            return null;
        })
        return Utilities.ApllyCurrencyFormat(totalOrder);
    },

    GetPizzaTotalPrice: function (pizza) {
        var totalToppings = 0;
        pizza.toppings.map((topping) => {
            totalToppings += topping.price;
            return null;
        });
        return ((pizza.size / pizza.defaultSize) * pizza.special.basePrice) + totalToppings;
    },

    async PlaceOrder(userId, pizzas, address) {
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
            }),
            address: address
        };

        var resp = await Axios.post('http://localhost:1337/orders', order);
        
        return resp.data;
    },

    GetFormattedDate: function (createdTime) {
        var dateTimeString = createdTime.split(/[-T:.Z]/);
        return new Date(dateTimeString[0], dateTimeString[1] - 1, dateTimeString[2], dateTimeString[3], dateTimeString[4], dateTimeString[5], dateTimeString[6]);
    }
}

export default Order;