import React from 'react';
import '../../css/site.css';
import Order from '../../code/order';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.onRemovePizza = this.onRemovePizza.bind(this);
        this.placeOrder = this.placeOrder.bind(this);

        this.state = {
            pizzas: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {pizzas: props.Pizzas };
    }

    render () {
        let cart;
        let total = 0;
        let placeOrderButton;
        if(this.state.pizzas.length === 0) {
            placeOrderButton = <a href="/#" className="btn btn-warning" >Ordenar ></a>
        } else {
            placeOrderButton = <a href="/#" className="btn btn-warning" onClick={this.placeOrder} >Ordenar ></a>
        }
        
        if(this.state.pizzas.length > 0) {
            cart =
                <div className="order-contents">
                    <h2>Tu orden</h2>
                    {this.state.pizzas.map((pizza, i) => {
                        total += Order.GetTotalPrice(pizza);
                        return (
                            <div key={i} className="cart-item">
                                <a href='/#' className="delete-item" title={pizza.id} onClick={this.onRemovePizza} >x</a>
                                <div className="title">{pizza.size} cm {pizza.special.name}</div>
                                <ul>
                                    {
                                        pizza.toppings.map((topping) => {
                                            return <li key={topping.id} >+ {topping.name}</li>
                                        })
                                    }
                                </ul>
                                <div className="item-price">
                                    {Order.GetFormattedPizzaPrice(pizza)}
                                </div>
                            </div>
                        );
                    })}
                </div>;
        } else {
            cart =
                <div className="empty-cart" >
                    Selecciona una pizza
                    <br />
                    para empezar
                </div>;
        }

        return (
            <div className="sidebar" >
                {cart}
                <div className="order-total" >
                    Total:
                    <span className="total-price">{(this.state.pizzas.length > 0 ? Order.GetTotalFormated(total) : '')}</span>
                    {placeOrderButton}
                </div>
            </div>
        );
    }

    onRemovePizza(event) {
        this.props.OnRemovePizza(event.target.title);
    }

    placeOrder(event) {
        this.props.PlaceOrder();
    }
}

export default SideBar;