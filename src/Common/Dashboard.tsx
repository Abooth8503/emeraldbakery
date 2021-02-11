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
        <Col>
          <Link to='/orders'>
            <Button variant='outline-primary'>Orders</Button>
          </Link>
        </Col>
        <Col>
          <Button variant='outline-primary'>Calendar</Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Button variant='outline-primary'>Create</Button>
        </Col>
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
        <Col>
          <Button variant='outline-primary'>Order Types</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
