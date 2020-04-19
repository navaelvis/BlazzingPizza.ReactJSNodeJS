import React from 'react';
import '../../css/bootstrap.min.css';
import Order from '../../code/order';
import Axios from 'axios';
import OrderReview from './orderReview';
import Map from './map';

class OrderDetail extends React.Component {
    constructor() {
        super();
        
        this.state = {
            order: null
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:1337/orders/' + this.props.match.params.orderId)
            .then((response) => {
                this.setState({
                    order: response.data.order
                })
            });
    }

    render() {
        var formattedDate = '';
        var optionsForDataFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        if(this.state.order !== null) {
            formattedDate = Order.GetFormattedDate(this.state.order.createdTime).toLocaleString("es-VE", optionsForDataFormat);
            return (
                <React.Fragment>
                    <div className="main" >
                        <div className="track-order">
                            <div className="track-order-title">
                                <h2> Pedido realizado { formattedDate } </h2>
                                <p className="ml-auto mb-0">Estatus: <strong>@OrderWithStatus.StatusText</strong></p>
                            </div>
                            <div className="track-order-body">
                                <OrderReview Pizzas={this.state.order.pizzas} />
                                <Map />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return (<p>Cargando...</p>);
        }
    }
}

export default OrderDetail;