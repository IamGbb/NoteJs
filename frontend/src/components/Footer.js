import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <Container className='text-center py-3' style={{color:'white'}}>
        Copyright &copy; Gilad BB
      </Container>
    </footer>
  )
}

export default Footer