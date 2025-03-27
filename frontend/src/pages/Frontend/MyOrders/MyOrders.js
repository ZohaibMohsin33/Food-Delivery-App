import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {

    const [total, setTotal] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/api/myorderdata", { email: localStorage.getItem("userMail") })
            .then((response) => {
                setTotal(response.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const calculateTotalPrice = (order) => {
        return order.reduce((acc, item) => acc + item.price, 0);
    };

    return (
        <div className='container'>
            <div className="row">
                {
                    total.length > 0 ? 
                    total.reverse().map((mini, i) => {
                        return (
                            <div key={i} className="col-md-12 my-3">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Order Date: {mini[0].order_date}</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Size</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    mini.slice(1).map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.size}</td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.price}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <h5>Total Price: {calculateTotalPrice(mini.slice(1))}</h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : 
                    <div>No data found</div>
                }
            </div>
        </div>
    );
}
