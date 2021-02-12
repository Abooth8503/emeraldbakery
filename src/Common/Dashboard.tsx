import * as React from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import background from '../congruent_pentagon.png';

const sectionStyle = {
  backgroundImage: `url(${background})`,
};

function Dashboard() {
  return (
    <Container fluid style={sectionStyle}>
      <Row className='justify-content-center h-100' style={{ marginTop: '5px' }}>
        <Col>
          <Jumbotron style={{ backgroundColor: 'lightgreen' }}>
            <h2 className='text-center'>Welcome Ariel!</h2>
          </Jumbotron>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col className='text-center'>
          <Link to='/orders'>
            <Button variant='light'>Orders</Button>
          </Link>
        </Col>
        <Col>
          <Link to='/calendar'>
            <Button variant='light'>Calendar</Button>
          </Link>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col className='text-center'>
          <Link to='/create'>
            <Button variant='light'>Create</Button>
          </Link>
        </Col>
        <Col className='text-center'></Col>
      </Row>
      <br></br>
      <br></br>
      <hr></hr>
      <Row>
        <Col>
          <Jumbotron style={{ backgroundColor: 'lightgreen' }}>
            <h3 className='text-center'>Admin</h3>
          </Jumbotron>
        </Col>
      </Row>
      <br></br>
      <Row className='justify-content-md-center'>
        <Col className='text-center'>
          <Button variant='light'>Order Types</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
