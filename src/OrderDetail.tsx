import * as React from 'react';
import { useEffect } from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
} from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { useEmeraldContext, formatDate } from './Interfaces/EmeraldTypes';
import OrderTypeImage from './images/Erotic1.jpg';

function OrderDetail(props: RouteComponentProps<number>): JSX.Element {
  const { orders, fetchOrders } = useEmeraldContext();

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log('props for orderDetail', props.location.state, orders);
  if (orders.length < 1) {
    return <div>Loading...</div>;
  }
  const filteredOrderProp = orders.filter((order) => order.Id === props.location.state);
  console.log('filteredOrderProp', filteredOrderProp);
  return (
    <React.Fragment>
      <Container className='text-center' style={{ marginTop: '5px' }}>
        <Jumbotron style={{ backgroundColor: 'white' }}>
          <h2>Order Detail</h2>
        </Jumbotron>
        <Row>
          <Col>
            {filteredOrderProp.map((order) => {
              return (
                <Card
                  className='d-flex align-items-center justify-content-center'
                  key={order.Id}
                  style={{
                    height: '233px',
                    marginTop: '5px',
                  }}
                >
                  <Card.Header style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                    {`${order.Name}'s Order`}
                  </Card.Header>
                  <Card.Text>Order Type: {order.OrderType}</Card.Text>
                  <Card.Text>Quantity: {order.Quantity}</Card.Text>
                  <Button>Edit</Button>
                </Card>
              );
            })}
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <Image src={OrderTypeImage} thumbnail />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup style={{ marginTop: '5px' }}>
              {filteredOrderProp.map((order) => {
                const mapAddress = `${order.Address} ${order.City},${order.State}`;
                const encodedAddress = encodeURI(mapAddress);
                const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                return (
                  <React.Fragment key={order.Id}>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b>Date Created:</b>{' '}
                      <span style={{ marginLeft: '6px' }}>
                        {formatDate(order.OrderDate, false, true)}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b>Delivery Date:</b>{' '}
                      <span style={{ marginLeft: '5px', marginRight: '5px' }}>
                        {formatDate(order.DeliveryDate, false, true)}
                      </span>
                      <b>TO</b>
                      <span style={{ marginLeft: '5px' }}>
                        {formatDate(order.DeliveryDateEnd, false, true)}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b>Description:</b>{' '}
                      <span style={{ marginLeft: '5px' }}>{order.Description}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b>Address:</b>{' '}
                      <span>
                        <a href={addressToUse}>{mapAddress}</a>
                      </span>
                    </ListGroup.Item>
                  </React.Fragment>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}

export default OrderDetail;
