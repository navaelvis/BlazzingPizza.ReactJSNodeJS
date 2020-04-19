import React from 'react';
import Axios from 'axios';
import '../../css/bootstrap.min.css';
import Order from '../../code/order';
import Utilities from '../../code/utilities';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.updateSize = this.updateSize.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.toppingSelected = this.toppingSelected.bind(this);
        this.removeTopping = this.removeTopping.bind(this);

        this.state = {
            pizza: Order.BuildPizza(props.Special, 30, []),
            toppings: [],
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:1337/toppings')
        .then((response) => {
            const items = response.data.sort((a, b) => {
                if (a.name > b.name)
                    return 1;
                else if (a.name < b.name)
                    return -1;
                else
                    return 0;
            });

            this.setState({
                toppings: items
            });
        });
    }

    render() {
        let toppings;
        if (this.state.toppings == null)
        {
            toppings =
                <select className="custom-select" disabled>
                    <option>(Cargando...)</option>
                </select>;
        }
        else if (this.state.pizza.toppings.length >= 6)
        {
            toppings = <div>(máximo alcanzado)</div>;
        }
        else
        {
            toppings =
                <select className="custom-select" defaultValue="-1" onChange={this.toppingSelected} >
                    <option value="-1" disabled >(selecciona)</option>
                    {
                        this.state.toppings.map((topping, i) => {
                            return <option key={i} value={topping.id + '|' + topping.name + '|' + topping.price} >{topping.name} - (${topping.price})</option>;
                        })
                    }
                </select>;
        }
        
        let selectedToppings = this.state.pizza.toppings.map((topping, i) => {
            return (
                <div key={i} className="topping">
                    {topping.name + ' '}
                    <span className="topping-price">
                        {Utilities.ApllyCurrencyFormat(topping.price)}
                    </span>
                    <button value={topping.id} type="button" className="delete-topping" onClick={this.removeTopping} >
                        x
                    </button>
                </div>);
        });      
        
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <div className="dialog-title">
                        <h2>{this.props.Special.name}</h2>
                        {this.props.Special.description}
                    </div>
                    <form className="dialog-body">
                        <div>
                            <label>Tamaño:</label>
                            <input type="range"
                                min={20}
                                max={40}
                                step={2}
                                value={this.state.pizza.size}
                                onChange={this.updateSize}
                                 />
                            <span className="size-label" >
                                {this.state.pizza.size} cm (${Order.GetFormattedPizzaPrice(this.state.pizza)})
                            </span>
                        </div>
                        <div>
                            <label>Complementos adicionales:</label>
                            {toppings}
                        </div>
                        <div className="toppings">
                            {selectedToppings}
                        </div>
                    </form>
                    <div className="dialog-buttons">
                        <button className="btn btn-secondary mr-auto" onClick={this.onCancel} >Cancelar</button>
                        <span className="mr-center">
                            Precio:
                            <span className="price">
                                {Order.GetFormattedPizzaTotalPrice(this.state.pizza)}
                            </span>
                        </span>
                        <button className="btn btn-success ml-auto" onClick={this.onConfirm} >Ordenar ></button>
                    </div>
                </div>
            </div>
        );
    }

    updateSize(event) {
        let pizza = this.state.pizza;
        pizza.size = parseInt(event.target.value);
        this.setState({
            pizza: pizza
        });
    }

    onCancel() {
        this.props.OnCancel();
    }

    onConfirm() {
        this.props.OnConfirm(this.state.pizza);
    }

    toppingSelected(event) {
        var exist = this.state.pizza.toppings.find((topping) => topping.id === parseInt(event.target.value.split('|')[0]));
        if(exist !== undefined)
            return;

        let topping = event.target.value;
        let item = {
            id: parseInt(topping.split('|')[0]),
            name: topping.split('|')[1],
            price: parseFloat(topping.split('|')[2])
        }

        let piz = this.state.pizza;
        piz.toppings = [...this.state.pizza.toppings, item];

        this.setState({
            pizza: piz
        });
    }

    removeTopping(event) {
        let pizza = this.state.pizza;
        pizza.toppings = this.state.pizza.toppings.filter((topping) => {
            return topping.id !== event.target.value;
        });

        this.setState({
            pizza: pizza
        })
    }
}

export default Dialog;