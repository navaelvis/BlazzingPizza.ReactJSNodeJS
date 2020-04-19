import React from 'react';

class AddressEditor extends React.Component {
    constructor(props) {
        super(props);

        this.ValidateField = this.ValidateField.bind(this);

        this.state = {
            address: {
                name: '',
                line1: '',
                line2: '',
                city: '',
                region: '',
                postalCode: ''
            },
            errorFor: {}
        }
    }

    address = {
        name: '',
        line1: '',
        line2: '',
        city: '',
        region: '',
        postalCode: ''
    }

    isValid = {
        name: false,
        line1: false,
        city: false,
        region: false,
        postalCode: false
    }

    errorFor = {
        name: '',
        line1: '',
        city: '',
        region: '',
        postalCode: ''
    }

    errorMsgs = {
        name: 'Quien recibirá la orden?',
        line1: 'Donde recibirán la orden?',
        city: 'La ciudad debe ser especificada.',
        region: 'El estado debe ser especificado.',
        postalCode: 'El código postal debe ser especificado.'
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-field">
                    <label>Nombre:</label>
                    <div>
                        <input className="form-control" type="text" name="name" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.name}</span>
                    </div>
                </div>
                <div className="form-field">
                    <label>Línea 1:</label>
                    <div>
                        <input className="form-control" type="text" name="line1" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.line1}</span>
                    </div>
                </div>
                <div className="form-field">
                    <label>Línea 2:</label>
                    <div>
                        <input className="form-control" type="text" name="line2" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.line2}</span>
                    </div>
                </div>
                <div className="form-field">
                    <label>Ciudad:</label>
                    <div>
                        <input className="form-control" type="text" name="city" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.city}</span>
                    </div>
                </div>
                <div className="form-field">
                    <label>Estado:</label>
                    <div>
                        <input className="form-control" type="text" name="region" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.region}</span>
                    </div>
                </div>
                <div className="form-field">
                    <label>Código postal:</label>
                    <div>
                        <input className="form-control" type="text" name="postalCode" onChange={this.ValidateField} />
                        <span className="validation-message" >{this.errorFor.postalCode}</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    async ValidateField(event) {
        var field = event.target.name;
        var value = event.target.value;

        if(value === '') {
            this.errorFor[field] = this.errorMsgs[field];
            this.isValid[field] = false;
        } else {
            this.errorFor[field] = '';
            this.isValid[field] = true;
        }

        this.address[field] = value;

        await this.setState({
            address: this.address,
            errorFor: this.errorFor
        });

        this.ValidateForm();
    }

    ValidateForm() {
        var error = Object.keys(this.isValid).filter(key => this.isValid[key] === false);

        this.props.onAddessValid(this.state.address, error.length === 0);
    }
}

export default AddressEditor;