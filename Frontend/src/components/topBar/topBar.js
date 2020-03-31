import React from 'react';
import '../../css/site.css';
import Logo from '../../images/logo.svg';

class TopBar extends React.Component {
    render() {
        return (
            <div className="top-bar">
                <img className="logo" alt="Logo" src={Logo} />
            </div>
        );
    }
}

export default TopBar;