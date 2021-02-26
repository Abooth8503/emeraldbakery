import * as React from 'react';
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
import { RouteComponentProps } from 'react-router-dom';
import { useEmeraldContext, formatDate } from './Interfaces/EmeraldTypes';
import OrderTypeImage from './images/Erotic1.jpg';
import './css/orderDetail.css';

function OrderDetail(props: RouteComponentProps<number>): JSX.Element {
  const { orders } = useEmeraldContext();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function editOrder(id: number): void {
    props.history.push(`/create`, id);
  }

  function handleShowDialog(): void {
    setIsOpen(!isOpen);
  }

  if (orders.length < 1) {
    return <div>Loading...</div>;
  }

  const filteredOrderProp = orders.filter((order) => order.Id === props.location.state);
  let orderImageUrl = filteredOrderProp[0].ImageUrl;
  if (orderImageUrl === 'NONE' || orderImageUrl === undefined || orderImageUrl === '') {
    orderImageUrl =
      'https://emeraldorderfunctionstor.blob.core.windows.net/emeraldbakery/defaultOrderImage_min.png';
  }
  return (
    <React.Fragment>
      <Container className='text-center' style={{ marginTop: '5px' }}>
        <Jumbotron style={{ backgroundColor: 'white' }}>
          <h2 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>
            Order Detail
          </h2>
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
                  <Button onClick={() => editOrder(order.Id)}>Edit</Button>
                </Card>
              );
            })}
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <Image src={orderImageUrl} thumbnail onClick={handleShowDialog} />
          </Col>
          {isOpen && (
            <dialog
              className='dialog'
              style={{ position: 'absolute' }}
              open
              onClick={handleShowDialog}
            >
              <img
                className='image'
                src={OrderTypeImage}
                onClick={handleShowDialog}
                alt='no image'
              />
            </dialog>
          )}
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
                        {formatDate(order.OrderDate, true, true)}
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
                      <b style={{ marginRight: '5px' }}>Address:</b>{' '}
                      <span className='text-right' style={{ fontSize: 'small' }}>
                        <a href={addressToUse}>{mapAddress}</a>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b style={{ marginRight: '5px' }}>Created By:</b>{' '}
                      <span className='text-right' style={{ fontSize: 'small' }}>
                        {order.CreatedBy}
                      </span>
                    </ListGroup.Item>
                  </React.Fragment>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default OrderDetail;
