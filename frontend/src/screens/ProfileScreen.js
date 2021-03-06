import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions'
import Meta from '../components/Meta'



const ProfileScreen = () => {
      const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, navigate, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 1500)
        }
    }

        const profileArray = [
        {id: 'name', label: 'Name', placeholder: 'Enter your name', value: name , func: (e)=> setName(e.target.value)},
        {id: 'email', label: 'Email Address', placeholder: 'Enter your email', value: email, func: (e)=> setEmail(e.target.value)}, 
        {id: 'password', label: 'Password', placeholder: 'Enter your Password', value: password , func: (e)=> setPassword(e.target.value)},
        {id: 'password', label: 'Confirm Password', placeholder: 'Confirm Password', value: confirmPassword , func: (e)=> setConfirmPassword(e.target.value)},
    ]

  return (
    <Row>
        <Meta title='My Profile' />
        <Col md={3}>
            <h2>User Profile</h2>


        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}

        <Form onSubmit={submitHandler}>

        {profileArray.map((field) => {
            const {id, label, placeholder, value, func} = field;
            return (
                <Form.Group controlId={id} key={label} className='mb-4'>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={id} placeholder={placeholder} value={value}
                onChange={func}></Form.Control>
            </Form.Group>
            )
        })}

            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>
            : orders.length <= 0 ? <Message>No orders yet. <Link to='/'>Start Shopping</Link></Message>  : <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}}/>}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: "red"}}/>}</td>
                            <td><LinkContainer to={`/orders/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Details</Button>
                                </LinkContainer></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
        </Col>
    </Row>
  )
}


export default ProfileScreen