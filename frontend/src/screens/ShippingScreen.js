import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    const shippingArray = [
        {id: 'address', label: 'Address', placeholder: 'Enter your address', value: address , func: (e)=> setAddress(e.target.value)},
        {id: 'city', label: 'City', placeholder: 'Enter your city', value: city, func: (e)=> setCity(e.target.value)}, 
        {id: 'postalCode', label: 'Postal Code', placeholder: 'Enter your Postal Code', value: postalCode , func: (e)=> setPostalCode(e.target.value)},
        {id: 'country', label: 'Country', placeholder: 'Enter your country', value: country , func: (e)=> setCountry(e.target.value)},
    ]

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>

            {shippingArray.map((input) => {
                const {id, label, placeholder, value, func} = input
                console.log(placeholder)
                return (
                    <Form.Group controlId={id} key={id}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control type='text' placeholder={placeholder} value={value}
                    required onChange={func}></Form.Control>
                    </Form.Group>
                )
            })}
            <Button type='submit' variant='primary'>Continue</Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen