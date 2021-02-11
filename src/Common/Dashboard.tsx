import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container fluid>
      <Row className='justify-content-md-center'>
        <Col>
          <h1>Welcome Ariel!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='primary'>Orders</Button>
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
          <h2>Admin</h2>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Button variant='primary'>Order Types</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
