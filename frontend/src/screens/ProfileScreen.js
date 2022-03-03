import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


const ProfileScreen = () => {
      const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
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
        <Col md={3}>
            <h2>User Profile</h2>


        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {/* {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>

        {profileArray.map((field) => {
            const {id, label, placeholder, value, func} = field;
            return (
                <Form.Group controlId={id} key={label}>
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
        </Col>
    </Row>
  )
}


export default ProfileScreen