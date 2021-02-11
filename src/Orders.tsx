import * as React from 'react';
import { useEffect } from 'react';
import { Container, ListGroup, Image, Row, Col, Badge, Card } from 'react-bootstrap';
import { Order } from './Interfaces/EmeraldTypes';
import cat from './cat.jpg';
import background from './congruent_pentagon.png';
// import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

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
          <h1>
            Orders<Badge variant='success'>{orders.length}</Badge>
          </h1>
        </Col>
      </Row>
      {/* <ListGroup> */}
      {orders.map((order: Order) => {
        return (
          // <ListGroup.Item action key={order.id}>
          <Card key={order.id}>
            <Row>
              <Col style={{ maxWidth: '108px' }}>
                <Image src={cat} rounded />
              </Col>
              <Col>
                <Card.Title>{order.name}</Card.Title>
                <Card.Text>
                  {order.quantity} {order.description}
                </Card.Text>
              </Col>
            </Row>
          </Card>
          // </ListGroup.Item>
        );
      })}
      {/* </ListGroup> */}
    </Container>
  );
}

export default Orders;
