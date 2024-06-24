import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { API } from '../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const products = [
    { id: 1, itemName: 'Item 1', price: 10, weight: 200 },
    { id: 2, itemName: 'Item 2', price: 100, weight: 20 },
    { id: 3, itemName: 'Item 3', price: 30, weight: 300 },
    { id: 4, itemName: 'Item 4', price: 20, weight: 500 },
    { id: 5, itemName: 'Item 5', price: 30, weight: 250 },
    { id: 6, itemName: 'Item 6', price: 40, weight: 10 },
    { id: 7, itemName: 'Item 7', price: 200, weight: 10 },
    { id: 8, itemName: 'Item 8', price: 120, weight: 500 },
    { id: 9, itemName: 'Item 9', price: 130, weight: 790 },
    { id: 10, itemName: 'Item 10', price: 20, weight: 100 },
    { id: 11, itemName: 'Item 11', price: 10, weight: 340 },
    { id: 12, itemName: 'Item 12', price: 4, weight: 800 },
    { id: 13, itemName: 'Item 13', price: 5, weight: 200 },
    { id: 14, itemName: 'Item 14', price: 240, weight: 20 },
    { id: 15, itemName: 'Item 15', price: 123, weight: 700 },
    { id: 16, itemName: 'Item 16', price: 245, weight: 10 },
    { id: 17, itemName: 'Item 17', price: 230, weight: 20 },
    { id: 18, itemName: 'Item 18', price: 110, weight: 200 },
    { id: 19, itemName: 'Item 19', price: 45, weight: 200 },
    { id: 20, itemName: 'Item 20', price: 67, weight: 20 },
    { id: 21, itemName: 'Item 21', price: 88, weight: 300 },
    { id: 22, itemName: 'Item 22', price: 10, weight: 500 },
    { id: 23, itemName: 'Item 23', price: 17, weight: 250 },
    { id: 24, itemName: 'Item 24', price: 19, weight: 10 },
    { id: 25, itemName: 'Item 25', price: 89, weight: 10 },
    { id: 26, itemName: 'Item 26', price: 45, weight: 500 },
    { id: 27, itemName: 'Item 27', price: 99, weight: 790 },
    { id: 28, itemName: 'Item 28', price: 125, weight: 100 },
    { id: 29, itemName: 'Item 29', price: 198, weight: 340 },
    { id: 30, itemName: 'Item 30', price: 220, weight: 800 },
    { id: 31, itemName: 'Item 31', price: 249, weight: 200 },
    { id: 32, itemName: 'Item 32', price: 230, weight: 20 },
    { id: 33, itemName: 'Item 33', price: 190, weight: 700 },
    { id: 34, itemName: 'Item 34', price: 45, weight: 10 },
    { id: 35, itemName: 'Item 35', price: 12, weight: 20 },
    { id: 36, itemName: 'Item 36', price: 5, weight: 200 },
    { id: 37, itemName: 'Item 37', price: 2, weight: 200 },
    { id: 38, itemName: 'Item 38', price: 90, weight: 20 },
    { id: 39, itemName: 'Item 39', price: 12, weight: 300 },
    { id: 40, itemName: 'Item 40', price: 167, weight: 500 },
    { id: 41, itemName: 'Item 41', price: 12, weight: 250 },
    { id: 42, itemName: 'Item 42', price: 8, weight: 10 },
    { id: 43, itemName: 'Item 43', price: 2, weight: 10 },
    { id: 44, itemName: 'Item 44', price: 9, weight: 500 },
    { id: 45, itemName: 'Item 45', price: 210, weight: 790 },
    { id: 46, itemName: 'Item 46', price: 167, weight: 100 },
    { id: 47, itemName: 'Item 47', price: 23, weight: 340 },
    { id: 48, itemName: 'Item 48', price: 190, weight: 800 },
    { id: 49, itemName: 'Item 49', price: 199, weight: 200 },
    { id: 50, itemName: 'Item 50', price: 12, weight: 20 }
];

export const Home = () => {
    const [orderList, setOrderList] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [packages, setPackage] = useState([])


    useEffect(() => {
        axios.get(`${API}/orderList`)
            .then(res => {
                setOrderList(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    },)


    const handleChange = useCallback((product) => {
        setSelectedItems(prevItems =>
            prevItems.includes(product) ? prevItems.filter(item => item !== product) : [...prevItems, product]
            //set the checked items in selectedItems varaible if they are not present already 
        );

    }, []);

    useEffect(() => {
        const packageItems = (items) => {
            let data = []
            let currentPackage = {
                items: [],
                totalPrice: 0,
                totalWeight: 0
            }

            items.forEach(item => {
                if (currentPackage.totalPrice + item.price <= 250) {  //checks the condition of price if it is less then 250 or not to make the packages
                    currentPackage.items.push(item)
                    currentPackage.totalPrice += item.price
                    currentPackage.totalWeight += item.weight
                } else {
                    data.push(currentPackage)
                    currentPackage = {
                        items: [item],
                        totalPrice: item.price,
                        totalWeight: item.weight
                    }
                }
            })
            if (currentPackage.items.length) {
                data.push(currentPackage)
            }
            return data
        }
        setPackage(packageItems(selectedItems))
        console.log(selectedItems); // this is just to understand the structure of the data

    }, [selectedItems])



    const handleClick = (packages) => {
        console.log(packages)
        let name = []  // i used the array as package contains multiple items.

        packages.items.map(item => (
            name.push(item.itemName)
        ))

        if (packages.totalWeight <= 200) {
            packages.totalPrice += 5

        } else if (packages.totalWeight > 200 && packages.totalWeight <= 500) {
            packages.totalPrice += 10


        } else if (packages.totalWeight > 500 && packages.totalWeight <= 1000) {
            packages.totalPrice += 15

        } else {
            packages.totalPrice += 20

        }

        const orderData = {
            itemName: name,
            price: packages.totalPrice,
            weight: packages.totalWeight

        }
        console.log(orderData)
        try {
            axios.post(`${API}/placeOrder`, orderData)
                .then(response => {
                    console.log(response.data)
                    toast.success('Order placed Successfully')
                    setPackage(prevPackages => prevPackages.filter(packg => packg !== packages));
                    // this line is to remove the data form package once it is placed for order.

                }).catch(err => {
                    toast.error('Failed ')
                    console.log(err)
                }
                )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />

            <div className='container'>
                <div className='orders'>
                    {orderList.length > 0 ? (


                        <h3>Orders</h3>
                    ) : null
                    }
                    <div className='order-list'>

                        {orderList && orderList.map((orders, k) => (


                            <div key={k} className='order-item'>
                                <h4>Package {k + 1}</h4>
                                <hr />

                                <p>Items: {orders.itemName}</p>


                                <p>Total Weight: {orders.weight}g</p>
                                <p>Total Price: ${orders.price}</p>

                            </div>

                        ))


                        }
                    </div>
                </div>
                <div className='selected-list'>
                    <div className='data'>
                        <table className='table table-bordered table-striped'>
                            <tbody>
                                {selectedItems.map((item, i) =>
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td> {item.itemName}</td>
                                        <td>${item.price}</td>
                                        <td>{item.weight}g</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className='package'>
                        {packages.map((packages, i) => (
                            <div className='package-data'>

                                <div key={i}>
                                    <h3>Package {i + 1}</h3>
                                    <ul>
                                        {
                                            packages.items.map((item, j) => (
                                                <li key={j}>
                                                    {item.itemName}

                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <p>Total Weight: {packages.totalWeight}g</p>
                                    <p>Total Price: ${packages.totalPrice}</p>
                                    <p>Courier Price: ${packages.totalWeight <= 200 ? 5 : packages.totalWeight <= 500 ? 10 : packages.totalWeight <= 1000 ? 15 : 20}</p>

                                    <button className='btn btn-success' onClick={() => handleClick(packages)}>Place Order</button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>


                <div className='item-list'>
                    <h3>Item List</h3>
                    <div className='item-data'>
                        <table className='table  table-bordered table-striped'>
                            <thead className=''>
                                <tr className=''>
                                    <th className='col-1'></th>
                                    <th className=''>Item Name</th>
                                    <th className=''>Price</th>
                                    <th className=''>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product =>
                                    <tr key={product.id}>
                                        <td><input type='checkbox' onChange={() => handleChange(product)}
                                            checked={selectedItems.includes(product)} /></td>
                                        <td>{product.itemName}</td>
                                        <td>${product.price}</td>
                                        <td>{product.weight}g</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
