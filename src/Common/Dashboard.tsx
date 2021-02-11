import * as React from 'react';
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container fluid>
      <Row className='justify-content-center' style={{ marginTop: '5px' }}>
        <Col>
          <Jumbotron>
            <h2 className='text-center'>Welcome Ariel!</h2>
          </Jumbotron>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Link to='/orders'>
            <Button variant='primary'>Orders</Button>
          </Link>
        </Col>
        <Col>
          <Button variant='primary'>Calendar</Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Button>Create</Button>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <hr></hr>
      <Row>
        <Col>
          <Jumbotron>
            <h3 className='text-center'>Admin</h3>
          </Jumbotron>
        </Col>
      </Row>
      <br></br>
      <Row className='justify-content-md-center'>
        <Col>
          <Button variant='primary'>Order Types</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
