import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    const array = [
        {step: step1, nav: '/login', name: 'Sign In'},
        {step: step2, nav: '/shipping', name: 'Shipping'},
        {step: step3, nav: '/payment', name: 'Payment'},
        {step: step4, nav: '/placeorder', name: 'Place Order'}
    ]
  return (
    <Nav className='justify-content-center mb-4'>
        {array.map((phase) => {
            const {step, nav, name} = phase
            return(
                <Nav.Item key={name}>
                    {{step} ? (
                    <LinkContainer to={nav}>
                        <Nav.Link>{name}</Nav.Link>
                    </LinkContainer>
                ): (
                    <Nav.Link disabled>{name}</Nav.Link>)}
                </Nav.Item>
            )
        })}
        
    </Nav>
  )
}

export default CheckoutSteps