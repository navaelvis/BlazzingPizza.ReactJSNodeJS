import React from 'react';
import Axios from 'axios';
import '../../css/site.css';
import '../../css/bootstrap.min.css';
import Order from '../../code/order';
import Utilities from '../../code/utilities';

class MyOrders extends React.Component {
    constructor() {
        super();

        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:1337/orders')
        .then((response) => {
            this.setState({
                orders: response.data
            });
        });
    }

    render() {
        let orders;
        if(this.state.orders.length === 0) {
            orders = 
                <div>
                    <h2>No se ha realizado alguna orden</h2>
                    <a className="btn btn-success" href="/">Ordena alguna pizza</a>
                </div>;
        } else {
            orders = 
                <div className="list-group orders-list" >
                    {
                        this.state.orders.map((item, i) => {
                            var orderTotal = 0;
                            item.order.pizzas.map((pizza) => {
                                orderTotal += Order.GetPizzaTotalPrice(Order.BuildPizza(pizza.special, pizza.size, pizza.toppings));
                                return null;
                            });

                            var orderDetailLink = "/myOrders/" + item.order.orderId;
                            var optionsForDataFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                            return (
                                <div key={i} className="list-group-item" >
                                    <div className="col">
                                        <h5>{Order.GetFormattedDate(item.order.createdTime).toLocaleString("es-VE", optionsForDataFormat)}</h5>
                                        Pizzas:
                                        <strong> {item.order.pizzas.length} </strong>
                                        Precio total:
                                        <strong> ${Utilities.ApllyCurrencyFormat(orderTotal)}</strong>
                                    </div>
                                    <div className="col" >
                                        Estatus: <strong>Aqu&iacute; ir&aacute; el estado de la orden</strong>
                                    </div>
                                    <div className="col text-right" >
                                        <a href={orderDetailLink} className="btn btn-success">
                                            Rastrear &gt;
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
        }

        return (
            <React.Fragment>
                <div className="main" >
                    {orders}
                </div>
            </React.Fragment>
        );
    }
}

export default MyOrders;