import * as React from 'react';
import { useEffect } from 'react';
import { Container, Image, Row, Col, Badge, Card, Jumbotron } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { Order } from './Interfaces/EmeraldTypes';
import cat from './cat.jpg';
import background from './congruent_pentagon.png';

const sectionStyle = {
  backgroundImage: `url(${background})`,
};

function Orders() {
  const [orders, ordersSet] = React.useState<Order[]>([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Abooth8503/emeraldbakery/master/orders.json')
      .then((resp) => resp.json())
      .then((tds: Order[]) => {
        console.log('orders', tds);
        ordersSet(tds);
      });
  }, []);

  if (orders.length === 0) {
    return <div>Orders not ready.</div>;
  }

  console.log(orders[0].name, orders.length);
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
          const mapAddress = `${order.address} ${order.city},${order.state}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          // console.log('addr', mapAddress, addressToUse);
          return (
            <Card key={order.id} style={{ marginBottom: '3px', padding: '5px' }}>
              <Row>
                <Col style={{ maxWidth: '108px' }}>
                  <Image src={cat} rounded />
                </Col>
                <Col>
                  <Card.Title>{order.name}</Card.Title>
                  <Card.Text>
                    {order.quantity} {order.description}
                  </Card.Text>
                  <Card.Text style={{ fontSize: 'medium' }}>
                    <a href={addressToUse}>{mapAddress}</a>
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          );
        })}
      </FlipMove>
    </Container>
  );
}

export default Orders;
