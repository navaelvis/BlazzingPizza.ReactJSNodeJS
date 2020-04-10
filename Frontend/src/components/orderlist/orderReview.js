import React from 'react';
import Order from '../../code/order';

class OrderReview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pizzas: [],
            toppings: []
        }
    }
    
    static getDerivedStateFromProps(props, state) {
        return {
            pizzas: props.Pizzas,
            toppings: props.Toppings
        }
    }

    render() {
        let pizzasPrices = [];
        let totalPrice = 0;

        this.state.pizzas.map((pizza) => {
            var item = {
                id: pizza.id,
                price: Order.GetFormattedPizzaPrice(Order.BuildPizza(pizza.special, pizza.size, pizza.toppings))
            }
            pizzasPrices.push(item);
            totalPrice = totalPrice + parseFloat(item.price);

            return null;
        });

        return (
            <div className="track-order-details">
                {this.state.pizzas.map((pizza) => {
                    return (
                        <div key={pizza.id}>
                            <p ><strong>{pizza.size} cm {pizza.special.name} (${pizzasPrices.find((p) => p.id === pizza.id).price})</strong></p>
                            <ul>
                                {pizza.toppings.map((topping) => {
                                    let toppingName = this.state.toppings.find((t) => t.id === topping.toppingId).name;
                                    return(
                                        <li key={pizza.id.toString() + toppingName}>+ {toppingName}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    );
                })}
                <p><strong>precio total: ${totalPrice.toFixed(2)}</strong></p>
            </div>
        )
    }
}

export default OrderReview;