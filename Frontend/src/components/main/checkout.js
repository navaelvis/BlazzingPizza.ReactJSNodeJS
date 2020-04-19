import React from 'react';
import { Redirect } from 'react-router-dom';
import OrderReview from '../orderlist/orderReview';
import AddressEditor from '../templated/addressEditor';
import Order from '../../code/order';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.formIsValid = this.formIsValid.bind(this);
        this.placeOrder = this.placeOrder.bind(this);

        this.state = {
            orderId: 0,
            pizzas: [],
            toppings: [],
            address: {},
            isValid: false
        }
    }

    static getDerivedStateFromProps (props, state) {
        return {
            pizzas: props.Pizzas,
            toppings: props.Toppings
        }
    }

    render () {
        if(this.state.orderId > 0) {
            var path = "/myOrders/" + this.state.orderId;
            return <Redirect to={path} />
        }

        var submitOrderButton;
        if(this.state.isValid)
            submitOrderButton = <button className="checkout-button btn-warning" onClick={this.placeOrder} >
                                    Aceptar la orden
                                </button>;
        else
            submitOrderButton = <button className="checkout-button btn-warning" title="Rellene los campos requeridos en el formulario." disabled>
                                    Aceptar la orden
                                </button>;

        return (
            <div className="main" >
                <div className="checkout-cols">
                    <div className="checkout-order-details">
                        <h4>Revisar la orden</h4>
                        <OrderReview Pizzas={this.state.pizzas} />
                    </div>
                    <div>
                        <h4>Enviar a...</h4>
                        <AddressEditor onAddessValid={this.formIsValid} />
                    </div>
                </div>
                {submitOrderButton}
            </div>
        )
    }

    formIsValid(address, isValid) {
        this.setState({
            address: address,
            isValid: isValid
        })
    }

    async placeOrder(event) {
        var resp = await Order.PlaceOrder(1, this.state.pizzas, this.state.address);
        
        if(isNaN(resp)) {
            console.log(resp);
            event.preventDefault();
        } else {
            this.setState({
                orderId: resp
            })
        }
    }
}

export default Checkout;