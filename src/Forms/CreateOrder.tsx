import * as React from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';

function CreateOrder() {
  return (
    <Container>
      <Jumbotron style={{ backgroundColor: 'lightgreen', marginTop: '3px' }}>
        <h2 className='text-center'>Create Order</h2>
      </Jumbotron>

      <Form>
        <Form.Group controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter name of order' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='123 Street City, state zipcode' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as='select'>
            <option>Select Order Type</option>
            <option>Erotic</option>
            <option>Cheetah</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Quantity</Form.Label>
          <div>
            <Form.Control
              type='text'
              value={0}
              placeholder='1'
              style={{ width: '50px', display: 'inline' }}
            />
            <Button
              style={{
                display: 'inline',
                marginLeft: '5px',
                verticalAlign: 'top',
                fontWeight: 'bold',
              }}
            >
              +
            </Button>
            <Button
              style={{
                display: 'inline',
                marginLeft: '5px',
                verticalAlign: 'top',
                fontWeight: 'bold',
              }}
            >
              -
            </Button>
          </div>
        </Form.Group>

        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='PrePaid?' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='123 Street City, state zipcode'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Source of Traffic</Form.Label>
          <Form.Control as='select'>
            <option>Select Traffic</option>
            <option>3009 Moms group</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateOrder;
