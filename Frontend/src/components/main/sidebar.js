import React from 'react';
import Order from '../../code/order';
import OrderContext from '../../contextAPI/context';

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

    static contextType = OrderContext;

    render () {
        let cart;
        let placeOrderButton;
        if(this.state.pizzas.length === 0) {
            placeOrderButton = <a href="/#" className="btn btn-warning" >Ordenar ></a>
        } else {
            placeOrderButton = <a href="/#" className="btn btn-warning" onClick={this.props.Checkout} >Ordenar ></a>
        }
        
        if(this.state.pizzas.length > 0) {
            cart =
                <div className="order-contents">
                    <h2>Tu orden</h2>
                    {this.state.pizzas.map((pizza, i) => {
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
                                    {Order.GetFormattedPizzaTotalPrice(pizza)}
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
                    <span className="total-price">{(this.state.pizzas.length > 0 ? Order.GetFormattedOrderTotalPrice(this.state.pizzas) : '')}</span>
                    {placeOrderButton}
                </div>
            </div>
        );
    }

    onRemovePizza(event) {
        this.props.OnRemovePizza(event.target.title);
    }

    placeOrder(event) {
        this.context.pizzasChanged(this.state.pizzas);
    }
}

export default SideBar;