import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Badge, Card, Jumbotron } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { Order } from './Interfaces/EmeraldTypes';
import background from './congruent_pentagon.png';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';
import OrderCard from './Common/OrderCard';

const sectionStyle = {
  backgroundImage: `url(${background})`,
};

type Props = RouteComponentProps;

function Orders(props: Props) {
  const { orders } = useEmeraldContext();

  if (orders.length === 0) {
    return <div>Orders not ready.</div>;
  }

  console.log(orders[0].Name, orders.length);
  return (
    <Container fluid style={sectionStyle}>
      <Row>
        <Col className='text-center'>
          <Jumbotron>
            <h1>
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
        style={{ textAlign: 'left' }}
      >
        {orders.map((order: Order) => {
          const mapAddress = `${order.Address} ${order.City},${order.State}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          console.log('order', order);
          return (
            <OrderCard
              key={order.Id}
              routeComponentProps={props}
              order={order}
              address={addressToUse}
            />
          );
        })}
      </FlipMove>
    </Container>
  );
}

export default Orders;
