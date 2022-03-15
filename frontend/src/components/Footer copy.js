import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start">
    <Container>
        <Row>
            <Col className='text-center py-3'>
                <p style={{color:'white'}}>Copyright &copy; Gilad BB</p>
            </Col>
        </Row>
    </Container>
    </footer>
  )
}

export default Footer