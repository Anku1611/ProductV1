import React, { Component } from 'react';

export default class Product extends Component {
    static displayName = "New Product";

    constructor(props) {
        super(props);
        this.collection = [
            { Text: 'Select', Value: 'Select' },
            { Text: 'Laptop', Value: 'Laptop' },
            { Text: 'Keyboard', Value: 'Keyboard' },
            { Text: 'Paper', Value: 'Paper' }
        ];
        this.state = { Customer: '', Product: '', Price: '' };
    }

    getSelectOptions = (collection) => {
        if (!collection || collection.length <= 0) {
            return [];
        }

        return collection.map((element, index) => {
            return (
                <option key={index} value={element.Value} >{element.Text}</option>
            );
        }, this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {


        return (
            <div>
                <h1 id="tabelLabel" >Enter sales order : </h1>
              
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <tr>
                        <td><span>Customer Name :</span></td>
                        <td><input type="text" required name="Customer" id="txtCust" onChange={this.handleChange}></input></td>
                    </tr>
                    <tr > <td><span>Product :</span></td>
                        <td><select name="Product" onChange={this.handleChange}>
                            {
                                this.getSelectOptions(this.collection)
                            }
                        </select></td>
                    </tr>
                    <tr> <td><span>Price :</span></td>
                        <td> <input type="number" required name="Price" id="txtPrice" min="0" max="1000000" onChange={this.handleChange}></input></td>
                    </tr>
                    <tr>
                        <td>
                            <input className="button" id="btns" type="submit" value="Post" name="btnSend" onClick={this.saveCustomerData} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    saveCustomerData = () => {
       
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch('weatherforecast', requestOptions)
            .then(response => response.json())
            .then(window.location.reload(false));
        
    }
}
