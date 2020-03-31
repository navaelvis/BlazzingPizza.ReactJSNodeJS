import React from 'react';
import Axios from 'axios';
import '../../css/site.css';

class SpecialsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            specials: [],
            showingDialogConfigurePizza: false
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:1337/specials')
        .then((response) => {
            this.setState({
                specials: response.data.sort((a, b) => {
                    if (a.basePrice > b.basePrice)
                        return -1;
                    else if (a.basePrice < b.basePrice)
                        return 1;
                    else {
                        if (a.name < b.name)
                            return -1;
                        else if (a.name > b.name)
                            return 1;
                        else
                            return 0;
                    }
                })
            })
        });
    }

    render() {
        return (
            <ul className="pizza-cards">
                {
                    this.state.specials.map((special) => {
                        return (
                            <li key={special.id} style={{backgroundImage: `url('${special.imageUrl}')` }} onClick={() => this.SpecialSelected(special)} >
                                <div className="pizza-info" >
                                    <span className="title" >{special.name}</span>  
                                    {special.description}
                                    <span className="price" >
                                        {special.basePrice}
                                    </span>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    SpecialSelected(special) {
        this.props.onSpecialSelected(special);
    }
}

export default SpecialsContainer;