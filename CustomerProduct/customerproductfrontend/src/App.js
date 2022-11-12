import React, { Component } from 'react';


export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { products: [], groupedData: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderCustomerProduct(products) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.customer}</td>
                        <td>{product.product}</td>
                        <td>{product.price}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderCustomerProductWithMinMax(groupedData) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map(product => <tr key={product.id}>
                        <td>{product.product}</td>
                        <td>{product.minPrice}</td>
                        <td>{product.maxPrice}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... </em></p>
            : App.renderCustomerProduct(this.state.products);
    

        return (
            <div>
                <h1 id="tabelLabel" >Customer product</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                {App.renderCustomerProductWithMinMax(this.state.groupedData) }
            </div>
        );
    }

    async populateWeatherData() {
       
        const response = await fetch('weatherforecast');
        const data = await response.json();
        const groupedData = [];
        data.map((element, index) => {
            if (!groupedData.some(x => x.product == element.product)) {
                element.minPrice = element.price;
                element.maxPrice = element.price;
                groupedData.push(element);
            }
            else {
                const product = groupedData.find(x => x.product == element.product);
                if (product.minPrice > element.price) {
                    product.minPrice = element.price;
                }
                if (product.maxPrice < element.price) {
                    product.maxPrice = element.price;
                }
            }
        })
        this.setState({ products: data, groupedData: groupedData, loading: false });
    }
}
