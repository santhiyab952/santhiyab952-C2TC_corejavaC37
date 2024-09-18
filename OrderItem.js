import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderItem = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [newOrderItem, setNewOrderItem] = useState({
        orderItemId: '',
        orderId: '',
        productId: '',
        quantity: '',
        unitprice: ''
    });

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/OrderItem');
            setOrderItems(response.data);
        } catch (error) {
            console.error('Error fetching order items', error);
        }
    };

    const handleChange = (e) => {
        setNewOrderItem({ ...newOrderItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/OrderItem', newOrderItem);
            setOrderItems([...orderItems, response.data]);
            setNewOrderItem({
                orderItemId: '',
                orderId: '',
                productId: '',
                quantity: '',
                unitprice: ''
            });
        } catch (error) {
            console.error('Error adding new order item', error);
        }
    };

    const deleteOrderItem = async (OrderItemId) => {
        try {
            await axios.delete(`http://localhost:8080/OrderItem/${OrderItemId}`);
            setOrderItems(orderItems.filter(item => item.orderItemId !== OrderItemId));
        } catch (error) {
            console.error('Error deleting order item', error);
        }
    };

    const editOrderItem = (item) => {
        setNewOrderItem(item);
    };


    return (
        <div >
            <button id="btn">Order Items</button>
            <form onSubmit={handleSubmit} className='change'>
                <input
                    type="text"
                    name="orderItemId"
                    placeholder="Order Item ID"
                    value={newOrderItem.orderItemId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="orderId"
                    placeholder="Order ID"
                    value={newOrderItem.orderId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="productId"
                    placeholder="Product ID"
                    value={newOrderItem.productId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newOrderItem.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="unitprice"
                    placeholder="Unit price"
                    value={newOrderItem.unitprice}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{newOrderItem.orderItemid ? 'Update Order Item' : 'Add Order Item'}</button>
            </form>

            {orderItems.length === 0 ? (
                <p className="no-data">No order items available.</p>
            ): (
                <table border="5" >
                    <thead >
                        <tr >
                            <th classname="action" > Order Item ID</th>
                            <th >Order ID</th>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody  className='tablebody'>
                        
                        {orderItems.map(item => (
                            
                            <tr  key={item.orderItemId}>
                                <td className='data'>{item.orderItemId}</td>
                                <td className='data'>{item.orderId}</td>
                                <td className='data'>{item.productId}</td> 
                                <td className='data'>{item.quantity}</td>
                                <td className='data'>{item.unitprice}</td>
                               
                                <td className='data'>
                                    <button onClick={() => editOrderItem(item)}>Edit  🖍</button>
                                    <button className="btn" onClick={() => deleteOrderItem(item.orderItemId)}>Delete  🗑️</button>
                                    
                                </td>
                                
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
                
            )}
        </div>
    );
};

export default OrderItem;
