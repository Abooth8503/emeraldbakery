/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Badge, Jumbotron } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { Order } from './Interfaces/EmeraldTypes';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';
import OrderCard from './Common/OrderCard';

const sectionStyle = {
  marginTop: '5px',
  fontFamily: 'Andika-R',
};

type Props = RouteComponentProps;

function Orders(props: Props): JSX.Element {
  const { orders } = useEmeraldContext();

  if (orders.length === 0) {
    return <div>Orders not ready.</div>;
  }

  return (
    <Container fluid style={sectionStyle}>
      <Row>
        <Col className='text-center'>
          <Jumbotron>
            <h1 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>
              Orders
              <Badge variant='success' style={{ marginLeft: '3px' }}>
                {orders.length}
              </Badge>
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <FlipMove
        typeName='div'
        staggerDurationBy='22'
        duration={500}
        leaveAnimation='elevator'
        enterAnimation='elevator'
        appearAnimation='elevator'
        maintainContainerHeight={true}
        easing='cubic-bezier(0.39, 0.0, 0.45, 1.4)'
        style={{ textAlign: 'left', fontFamily: 'AmaticSC-Regular' }}
      >
        {orders.map((order: Order) => {
          const mapAddress = `${order.Address} ${order.City},${order.State}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          return (
            <OrderCard
              key={order.Id}
              routeComponentProps={props}
              order={order}
              address={addressToUse}
              parent='other'
            />
          );
        })}
      </FlipMove>
    </Container>
  );
}

export default Orders;
