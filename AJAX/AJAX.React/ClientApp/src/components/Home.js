import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            model: "",
            products: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`https://localhost:44396/api/product`);
        const dataProducts = await response.json();
        this.setState({ products: dataProducts });
        //console.log(this.state.products);
    }

    async handleSubmit(event) {
        event.preventDefault();
        var formData = new FormData();
        formData.append("productName", this.state.model.productName);
        formData.append("amount", this.state.model.amount);
        formData.append("price", this.state.model.price);
        formData.append("expirationDate", this.state.model.expirationDate);
        await fetch(`https://localhost:44396/api/product`,
            {
                method: 'POST', // or 'PUT'
                body: formData
            }
        );
    }

    handleChange(event) {
        let modelClone = Object.assign({}, this.state.model);
        const name = event.target.props ? event.target.props.name : event.target.name;
        modelClone[name] = event.target.value;
        this.setState({ model: modelClone });
    }

    render() {
        return (
            <div>
                <div className="add-form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Product name:
                        <input name="productName" type="text" value={this.state.model.productName || ''} onChange={this.handleChange} />
                        </label>
                        <label>
                            Amount:
                        <input name="amount" type="number" value={this.state.model.amount || ''} onChange={this.handleChange} />
                        </label>
                        <label>
                            Expiration date:
                        <input name="expirationDate" type="date" value={this.state.model.expirationDate || ''} onChange={this.handleChange} />
                        </label>
                        <label>
                            Price:
                        <input name="price" type="number" value={this.state.model.price || ''} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                <div className="table-component">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Expiration Date</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((product, index) => {
                                return <tr key={index}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.amount}</td>
                                    <td>{product.expirationDate}</td>
                                    <td>{product.price}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
