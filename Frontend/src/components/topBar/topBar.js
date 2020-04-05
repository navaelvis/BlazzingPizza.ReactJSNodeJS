import React from 'react';
import '../../css/site.css';
import Logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

class TopBar extends React.Component {
    render() {
        return (
            <div className="top-bar">
                <img className="logo" alt="Logo" src={Logo} />
                <NavLink to="/" className="nav-tab" exact >
                    <img src="/images/topbar/pizza-slice.svg" alt="Elegir Pizza" ></img>
                    <div>Elegir Pizza</div>
                </NavLink>
                <NavLink to="/myOrders" className="nav-tab" exact >
                    <img src="/images/topbar/bike.svg" alt="Mis ordenes" ></img>
                    <div>Mis ordenes</div>
                </NavLink>
            </div>
        );
    }
}

export default TopBar;