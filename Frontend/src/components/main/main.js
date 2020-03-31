import React from 'react';
import '../../css/site.css';
import SpecialsContainer from './specialsContainer';
import Dialog from '../templated/dialog';
import SideBar from './sidebar';
import Order from '../../code/order';

class Main extends React.Component {
    constructor() {
        super();

        this.ShowConfigureDialog = this.ShowConfigureDialog.bind(this);
        this.OnCancel = this.OnCancel.bind(this);
        this.OnConfirm = this.OnConfirm.bind(this);
        this.OnRemovePizza = this.OnRemovePizza.bind(this);
        this.PlaceOrder = this.PlaceOrder.bind(this);

        this.state = {
            special: null,
            pizzas: [],
            showingConfigurePizza: false
        }
    }

    render() {
        let sideBar;
        let dialog;
        
        if(this.state.pizzas.length > 0)
            sideBar = <SideBar Pizzas={this.state.pizzas} OnRemovePizza={this.OnRemovePizza} PlaceOrder={this.PlaceOrder} />;
        else
            sideBar = <SideBar Pizzas={[]} />;

        if(this.state.showingConfigurePizza)
            dialog = <Dialog Special={this.state.special} OnCancel={this.OnCancel} OnConfirm={this.OnConfirm} />;

        return (
            <React.Fragment>
                <div className="main">
                    <SpecialsContainer onSpecialSelected={this.ShowConfigureDialog} />
                </div>
                {sideBar}
                {dialog}
            </React.Fragment>
        );
    }

    ShowConfigureDialog(special) {
        this.setState({
            special: special,
            showingConfigurePizza: true
        });
    }

    OnCancel() {
        this.setState({
            special: null,
            showingConfigurePizza: false
        });
    }

    OnConfirm(pizza) {
        if(this.state.pizzas.length > 0)
            pizza.id = this.state.pizzas[this.state.pizzas.length - 1].id  + 1;

        this.setState({
            special: null,
            showingConfigurePizza: false,
            pizzas: [...this.state.pizzas, pizza]
        });
    }

    OnRemovePizza(id) {
        let pizzas = this.state.pizzas.filter((pizza) => {
            return pizza.id - id !== 0;
        });

        this.setState({
            pizzas: pizzas
        })
    }

    async PlaceOrder() {
        var resp = Order.PlaceOrder(1, this.state.pizzas);

        if(resp) {
            this.setState({
                special: null,
                pizzas: [],
                showingConfigurePizza: false
            });
        } else {
            console.log(resp);
        }
    }
}

export default Main;