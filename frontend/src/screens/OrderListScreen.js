import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions'
import Meta from '../components/Meta'

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
    } else {
        navigate('/login')
    }

    }, [dispatch, navigate, userInfo])

    return (
        <>
        <Meta title='Admin | Orders' />
            <h1>Orders</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>DATE CREATED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {orders.map(order => (
                           <tr key={order._id}>
                               <td>{order._id}</td>
                               <td>{order.user.name}</td>
                               <td>${order.totalPrice}</td>
                               <td>{order.isPaid ? 
                               (<i className='fas fa-check' style={{color: 'green'}}/>
                               ) : (
                               <i className='fas fa-times' style={{color: 'red'}}/>)} 
                               </td>
                               <td>{order.isDelivered ? 
                               (<i className='fas fa-check' style={{color: 'green'}}/>
                               ) : (
                               <i className='fas fa-times' style={{color: 'red'}}/>)} 
                               </td>
                               <td>{order.createdAt.slice(0,10)}</td>
                               <td>
                                   <LinkContainer to={`/orders/${order._id}`}>
                                   <Button variant='light' className='btn-sm'>
                                       Details
                                   </Button>
                                   </LinkContainer>
                                   
                                </td>
                           </tr>
                       ))} 
                    </tbody>
                </Table>
            )    
        }
        </>
    )
}


export default OrderListScreen