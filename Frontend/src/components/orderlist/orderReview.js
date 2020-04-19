import React from 'react';
import Order from '../../code/order';
import Axios from 'axios';
import Utilities from '../../code/utilities';

class OrderReview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pizzas: [],
            toppings: []
        }
    }
    
    componentDidMount() {
        Axios.get('http://localhost:1337/toppings')
            .then((response) => {
                this.setState({
                    toppings: response.data
                })
            });
    }

    static getDerivedStateFromProps(props, state) {
        return {
            pizzas: props.Pizzas
        }
    }

    render() {
        let pizzasPrices = [];
        let totalPrice = 0;

        this.state.pizzas.map((pizza) => {
            var item = {
                id: pizza.id,
                price: Order.GetPizzaTotalPrice(Order.BuildPizza(pizza.special, pizza.size, pizza.toppings))
            }
            pizzasPrices.push(item);
            totalPrice = totalPrice + parseFloat(item.price);

            return null;
        });

        
        if(this.state.pizzas.length > 0 && this.state.toppings.length > 0) {
            return (
                <div className="track-order-details">
                    {this.state.pizzas.map((pizza) => {
                        return (
                            <div key={pizza.id}>
                                <p ><strong>{pizza.size} cm {pizza.special.name} (${Utilities.ApllyCurrencyFormat(pizzasPrices.find((p) => p.id === pizza.id).price)})</strong></p>
                                <ul>
                                    {pizza.toppings.map((topping) => {
                                        let toppingName = this.state.toppings.find((t) => t.id === topping.id).name;
                                        return(
                                            <li key={pizza.id.toString() + topping.id.toString()}>+ {toppingName}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                    <p><strong>precio total: ${totalPrice.toFixed(2)}</strong></p>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default OrderReview;