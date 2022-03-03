import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(register(name, email, password))
        }
    }

    const profileArray = [
        {id: 'name', label: 'Name', placeholder: 'Enter your name', value: name , func: (e)=> setName(e.target.value)},
        {id: 'email', label: 'Email Address', placeholder: 'Enter your email', value: email, func: (e)=> setEmail(e.target.value)}, 
        {id: 'password', label: 'Password', placeholder: 'Enter your Password', value: password , func: (e)=> setPassword(e.target.value)},
        {id: 'password', label: 'Confirm Password', placeholder: 'Confirm Password', value: confirmPassword , func: (e)=> setConfirmPassword(e.target.value)},
    ]

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
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
                Reigster
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>

  )
}

export default RegisterScreen